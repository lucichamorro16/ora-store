"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import Logo from "../components/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/admin/dashboard");
    });
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("Email o contraseña incorrectos.");
      return;
    }
    router.replace("/admin/dashboard");
  }

  return (
    <div className="min-h-screen bg-parchment star-field-bg flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Logo size={90} className="mb-4" />
          <h1 className="font-display font-light text-ink text-2xl tracking-wide">Panel administrador</h1>
          <p className="font-body text-ink/50 text-xs mt-1">Ora Store</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-body text-[11px] uppercase tracking-wide text-ink/60 block mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-ink/20 rounded-lg px-4 py-2.5 text-ink font-body text-sm focus:outline-none focus:border-ink"
            />
          </div>
          <div>
            <label className="font-body text-[11px] uppercase tracking-wide text-ink/60 block mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-ink/20 rounded-lg px-4 py-2.5 text-ink font-body text-sm focus:outline-none focus:border-ink"
            />
          </div>

          {error && <p className="font-body text-ember text-xs">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full py-3 rounded-full disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <a
          href="/"
          className="font-body text-ink/40 text-xs mt-6 block text-center hover:text-ink/70"
        >
          ← Volver a la tienda
        </a>
      </div>
    </div>
  );
}
