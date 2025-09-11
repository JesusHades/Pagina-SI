"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/types/user";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          router.push("/login");
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error cargando usuario:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return <p className="p-8">Cargando...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Dashboard de Usuario</h1>
      {user ? (
        <>
          <p className="mt-2">Bienvenido: {user.nombre}</p>
          <p className="mt-1 text-gray-600">Rol: {user.role}</p>
        </>
      ) : (
        <p>No se pudieron cargar los datos del usuario.</p>
      )}
    </div>
  );
}