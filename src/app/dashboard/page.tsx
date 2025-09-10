"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login"); // Redirige si no hay sesión
    }
  }, [router]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Dashboard de Usuario</h1>
      <p>Bienvenido a tu panel de talleres.</p>
    </div>
  );
}