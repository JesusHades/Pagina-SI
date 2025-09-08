import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Talleres Creativos MX",
  description: "Plataforma de talleres de arte y manualidades",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans bg-gray-50 text-gray-900">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-pink-600">
            TalleresMX
          </Link>
          <nav className="space-x-4">
            <Link href="/registro" className="hover:text-pink-500">
              Registro
            </Link>
            <Link href="/login" className="hover:text-pink-500">
              Login
            </Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
