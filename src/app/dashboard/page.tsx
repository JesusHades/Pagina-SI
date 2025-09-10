"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  nombre: string;
  email: string;
  role: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include", // importante para enviar cookies
        });

        if (res.status === 401) {
          router.push("/login"); // no autorizado → login
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

  if (loading) {
    return <p className="p-8">Cargando...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Dashboard de Usuario</h1>
      {user ? (
        <div className="mt-4">
          <p>
            <span className="font-semibold">Nombre:</span> {user.nombre}
          </p>
          <p>
            <span className="font-semibold">Correo:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Rol:</span> {user.role}
          </p>
        </div>
      ) : (
        <p>No se pudo cargar la información del usuario.</p>
      )}
    </div>
  );
}