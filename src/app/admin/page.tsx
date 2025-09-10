"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserRole } from "@/lib/auth";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const role = getUserRole();
    if (role !== "admin") {
      router.push("/login"); // Redirige si no es admin
    }
  }, [router]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Panel de Administración</h1>
      <p>Solo accesible para usuarios con rol admin.</p>
    </div>
  );
}