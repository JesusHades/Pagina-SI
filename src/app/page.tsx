export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-yellow-100">
      <section className="text-center max-w-2xl p-6">
        <h1 className="text-5xl font-extrabold text-pink-800 drop-shadow-sm">
          Talleres Creativos MX
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Un espacio para explorar tu creatividad con talleres de{" "}
          <span className="font-semibold text-pink-600">arte</span> y{" "}
          <span className="font-semibold text-yellow-600">manualidades</span>.
        </p>
        <p className="mt-4 text-lg text-gray-700">
          Hecho por{" "}
          <span className="font-semibold text-blue-600 drop-shadow-sm">Jesus Osvaldo Manriquez Gonzalez</span>.
        </p>

        <div className="mt-6 flex gap-4 justify-center">
          <a
            href="/registro"
            className="px-6 py-3 rounded-2xl bg-pink-600 text-white font-semibold hover:bg-pink-700 transition"
          >
            Registrarse
          </a>
          <a
            href="/login"
            className="px-6 py-3 rounded-2xl bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition"
          >
            Iniciar sesión
          </a>
        </div>
      </section>
    </main>
  );
}
