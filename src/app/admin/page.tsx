"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/types/user";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null); //sin any
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Panel de Administración</h1>
      {user && (
        <div className="mt-4">
          <p><strong>Admin:</strong> {user.nombre}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.role}</p>
        </div>
      )}
    </div>
  );
}