"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "user") {
      router.push("/login");
      return;
    }
  }, [router]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Dashboard de Usuario</h1>
      <p>Bienvenido a tu panel de talleres.</p>
    </div>
  );
}