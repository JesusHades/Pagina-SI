"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/types/user";
import { logout } from "@/lib/auth";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar info del admin
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        const data = await res.json();

        if (data.user.role !== "admin") {
          router.push("/dashboard");
          return;
        }

        setUser(data.user as User);
      } catch (error) {
        console.error("Error cargando usuario:", error);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  // Cargar lista de usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUsers(data.users);
        }
      } catch (error) {
        console.error("Error cargando usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Cambiar rol de un usuario
  const toggleRole = async (userId: string, currentRole: "user" | "admin") => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("/api/admin/rol", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          newRole: currentRole === "admin" ? "user" : "admin",
        }),
      });

      if (res.ok) {
        // Actualizar la lista localmente
        setUsers((prev) =>
          prev.map((u) =>
            u._id === userId
              ? { ...u, role: currentRole === "admin" ? "user" : "admin" }
              : u
          )
        );
      }
    } catch (error) {
      console.error("Error cambiando rol:", error);
    }
  };

  // Eliminar usuario
  const deleteUser = async (userId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!confirm("¿Seguro que quieres eliminar este usuario?")) return;

    try {
      const res = await fetch(`/api/admin/delete?id=${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        // Quitar de la lista sin recargar
        setUsers((prev) => prev.filter((u) => u._id !== userId));
      } else {
        const data = await res.json();
        alert(data.message || "Error al eliminar usuario");
      }
    } catch (error) {
      console.error("Error eliminando usuario:", error);
    }
  };

  if (loading) return <p className="p-8">Cargando...</p>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </div>

      {user && (
        <div className="mt-4 mb-6">
          <p>
            <strong>Admin:</strong> {user.nombre}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Rol:</strong> {user.role}
          </p>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">Usuarios registrados</h2>
      <table className="w-full border border-gray-300 rounded">
        <thead>
          <tr className="bg-black text-white">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Rol</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="p-2 border">{u.nombre}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.role}</td>
              <td className="p-2 border">
                <button
                  onClick={() => toggleRole(u._id, u.role)}
                  className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 mr-2"
                >
                  Cambiar rol
                </button>
                <button
                  onClick={() => deleteUser(u._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
