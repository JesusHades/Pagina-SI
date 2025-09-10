import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Conexión a la BD
    const client = await clientPromise;
    const db = client.db("talleresdb");
    const users = db.collection("users");

    // Buscar usuario por email
    const user = await users.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    // Verificar contraseña
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ message: "Contraseña incorrecta" }, { status: 401 });
    }

    // Generar JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      message: "Inicio de sesión exitoso",
      token,
    });
  } catch (error) {
    console.error("Error login:", error);
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}