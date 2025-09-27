import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function DELETE(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return NextResponse.json({ message: "Token faltante" }, { status: 401 });
  }

  const token = authHeader.replace("Bearer ", "");
  const secret = process.env.JWT_SECRET as string;

  let decoded: JwtPayload;
  try {
    decoded = jwt.verify(token, secret) as JwtPayload;
  } catch {
    return NextResponse.json({ message: "Token inválido o expirado" }, { status: 401 });
  }

  if (decoded.role !== "admin") {
    return NextResponse.json({ message: "Acceso denegado" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json({ message: "ID de usuario faltante" }, { status: 400 });
  }

  if (!ObjectId.isValid(userId)) {
    return NextResponse.json({ message: "ID de usuario inválido" }, { status: 400 });
  }

  //------- impedir que un admin se elimine a sí mismo-----
  if (decoded.id && decoded.id.toString() === userId) {
    return NextResponse.json(
      { message: "No puedes eliminar tu propio usuario" },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("talleresdb");
    const users = db.collection("users");

    const result = await users.deleteOne({ _id: new ObjectId(userId) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error DELETE /admin/delete:", error);
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  }
}
