"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "../../lib/supabaseClient";
import { resizeImage } from "../../lib/imageResize";

const MAX_IMAGES = 3;

const EMPTY_FORM = {
  id: null,
  name: "",
  description: "",
  price: "",
  stock: "",
  category: "",
  images: [], // URLs ya subidas (al editar un producto existente)
  active: true,
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [newFiles, setNewFiles] = useState([]); // File[] pendientes de subir
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/admin");
        return;
      }
      setCheckingAuth(false);
    });
  }, [router]);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setProducts(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!checkingAuth) loadProducts();
  }, [checkingAuth, loadProducts]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin");
  }

  function startEdit(product) {
    setForm({
      id: product.id,
      name: product.name ?? "",
      description: product.description ?? "",
      price: product.price ?? "",
      stock: product.stock ?? "",
      category: product.category ?? "",
      images: product.images ?? [],
      active: product.active,
    });
    setNewFiles([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setNewFiles([]);
  }

  const totalImageCount = form.images.length + newFiles.length;
  const slotsLeft = MAX_IMAGES - totalImageCount;

  const [processingImages, setProcessingImages] = useState(false);

  async function handleFilesSelected(e) {
    const picked = Array.from(e.target.files ?? []);
    if (picked.length === 0) return;
    e.target.value = ""; // permite volver a elegir el mismo archivo si lo saca y lo agrega de nuevo

    const toProcess = picked.slice(0, MAX_IMAGES - form.images.length - newFiles.length);
    setProcessingImages(true);
    try {
      const resized = await Promise.all(
        toProcess.map((file) =>
          resizeImage(file).catch(() => file) // si falla el ajuste, usa el archivo original igual
        )
      );
      setNewFiles((prev) => [...prev, ...resized].slice(0, MAX_IMAGES - form.images.length));
    } finally {
      setProcessingImages(false);
    }
  }

  function removeExistingImage(url) {
    setForm((f) => ({ ...f, images: f.images.filter((u) => u !== url) }));
  }

  function removeNewFile(index) {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setFeedback("");

    try {
      const uploadedUrls = [];
      for (const file of newFiles) {
        const ext = file.name.split(".").pop();
        const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(path, file, { cacheControl: "3600", upsert: false });
        if (uploadError) throw uploadError;
        const { data: publicUrlData } = supabase.storage.from("products").getPublicUrl(path);
        uploadedUrls.push(publicUrlData.publicUrl);
      }

      const finalImages = [...form.images, ...uploadedUrls].slice(0, MAX_IMAGES);

      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category || null,
        images: finalImages,
        active: form.active,
      };

      if (form.id) {
        const { error } = await supabase.from("products").update(payload).eq("id", form.id);
        if (error) throw error;
        setFeedback("Producto actualizado.");
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
        setFeedback("Producto creado.");
      }

      resetForm();
      loadProducts();
    } catch (err) {
      console.error(err);
      setFeedback("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("¿Eliminar este producto? Esta acción no se puede deshacer.")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) loadProducts();
  }

  async function toggleActive(product) {
    await supabase
      .from("products")
      .update({ active: !product.active })
      .eq("id", product.id);
    loadProducts();
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center">
        <p className="font-body text-ink/60 text-sm">Verificando acceso...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment">
      <header className="border-b border-ink/10 sticky top-0 bg-parchment/95 backdrop-blur z-10">
        <div className="mx-auto max-w-5xl px-5 md:px-8 h-16 flex items-center justify-between">
          <h1 className="font-display text-ink text-lg">Ora Store — Stock</h1>
          <div className="flex items-center gap-4">
            <a href="/" className="font-body text-ink/50 text-xs hover:text-ink">
              Ver tienda
            </a>
            <button
              onClick={handleLogout}
              className="font-body text-xs text-ember hover:text-red-400 uppercase tracking-wide"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 md:px-8 py-10">
        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-ink/10 rounded-xl p-6 mb-10 space-y-4"
        >
          <h2 className="font-display text-ink text-lg mb-2">
            {form.id ? "Editar producto" : "Nuevo producto"}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-body text-[11px] uppercase tracking-wide text-ink/60 block mb-1.5">
                Nombre
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-parchment border border-ink/20 rounded-lg px-3 py-2 text-ink font-body text-sm focus:outline-none focus:border-ink"
              />
            </div>
            <div>
              <label className="font-body text-[11px] uppercase tracking-wide text-ink/60 block mb-1.5">
                Categoría
              </label>
              <input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Hombre / Mujer / Unisex"
                className="w-full bg-parchment border border-ink/20 rounded-lg px-3 py-2 text-ink font-body text-sm focus:outline-none focus:border-ink"
              />
            </div>
            <div>
              <label className="font-body text-[11px] uppercase tracking-wide text-ink/60 block mb-1.5">
                Precio
              </label>
              <input
                required
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full bg-parchment border border-ink/20 rounded-lg px-3 py-2 text-ink font-body text-sm focus:outline-none focus:border-ink"
              />
            </div>
            <div>
              <label className="font-body text-[11px] uppercase tracking-wide text-ink/60 block mb-1.5">
                Stock
              </label>
              <input
                required
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full bg-parchment border border-ink/20 rounded-lg px-3 py-2 text-ink font-body text-sm focus:outline-none focus:border-ink"
              />
            </div>
          </div>

          <div>
            <label className="font-body text-[11px] uppercase tracking-wide text-ink/60 block mb-1.5">
              Descripción
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-parchment border border-ink/20 rounded-lg px-3 py-2 text-ink font-body text-sm focus:outline-none focus:border-ink"
            />
          </div>

          <div>
            <label className="font-body text-[11px] uppercase tracking-wide text-ink/60 block mb-1.5">
              Fotos del producto ({totalImageCount}/{MAX_IMAGES})
            </label>
            <p className="font-body text-ink/40 text-[11px] mb-2">
              Se ajustan y comprimen solas al elegirlas, no hace falta editarlas antes.
            </p>

            {(form.images.length > 0 || newFiles.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-3">
                {form.images.map((url) => (
                  <div key={url} className="relative w-16 h-16 rounded-lg overflow-hidden border border-ink/15">
                    <Image src={url} alt="" fill unoptimized className="object-cover" />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(url)}
                      aria-label="Quitar foto"
                      className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-ink/70 text-parchment text-[10px] leading-none flex items-center justify-center"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                {newFiles.map((file, i) => (
                  <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-ink/15">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={URL.createObjectURL(file)}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewFile(i)}
                      aria-label="Quitar foto"
                      className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-ink/70 text-parchment text-[10px] leading-none flex items-center justify-center"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}

            {slotsLeft > 0 ? (
              <>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFilesSelected}
                  disabled={processingImages}
                  className="font-body text-ink/60 text-xs disabled:opacity-50"
                />
                {processingImages && (
                  <p className="font-body text-ink/40 text-[11px] mt-1">Ajustando fotos...</p>
                )}
              </>
            ) : (
              <p className="font-body text-ink/40 text-xs">
                Ya cargaste el máximo de {MAX_IMAGES} fotos. Sacá alguna para agregar otra.
              </p>
            )}
          </div>

          <label className="flex items-center gap-2 font-body text-xs text-ink/70">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
            />
            Visible en la tienda
          </label>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="btn-gold px-6 py-2.5 rounded-full disabled:opacity-50"
            >
              {saving ? "Guardando..." : form.id ? "Guardar cambios" : "Crear producto"}
            </button>
            {form.id && (
              <button
                type="button"
                onClick={resetForm}
                className="font-body text-xs text-ink/50 hover:text-ink uppercase tracking-wide"
              >
                Cancelar edición
              </button>
            )}
            {feedback && <span className="font-body text-xs text-ink/70 ml-auto">{feedback}</span>}
          </div>
        </form>

        {/* Listado */}
        <h2 className="font-display text-ink text-lg mb-4">Productos cargados</h2>
        {loading ? (
          <p className="font-body text-ink/50 text-sm">Cargando...</p>
        ) : products.length === 0 ? (
          <p className="font-body text-ink/50 text-sm">Todavía no cargaste productos.</p>
        ) : (
          <div className="space-y-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-4 bg-white border border-ink/10 rounded-lg p-3"
              >
                <div className="relative w-12 h-12 rounded-md overflow-hidden bg-parchment flex-shrink-0">
                  {p.images?.[0] && <Image src={p.images[0]} alt="" fill unoptimized className="object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-ink text-sm truncate">{p.name}</p>
                  <p className="font-body text-ink/40 text-xs">
                    ${Number(p.price).toLocaleString("es-AR")} · Stock: {p.stock}
                    {p.images?.length > 1 && ` · ${p.images.length} fotos`}
                    {!p.active && " · Oculto"}
                  </p>
                </div>
                <button
                  onClick={() => toggleActive(p)}
                  className="font-body text-[11px] uppercase tracking-wide text-ink/50 hover:text-ink px-2"
                >
                  {p.active ? "Ocultar" : "Publicar"}
                </button>
                <button
                  onClick={() => startEdit(p)}
                  className="font-body text-[11px] uppercase tracking-wide text-gold/80 hover:text-gold px-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="font-body text-[11px] uppercase tracking-wide text-ember hover:text-red-400 px-2"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
