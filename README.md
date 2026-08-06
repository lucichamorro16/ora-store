# Ora Store — E-commerce de perfumes árabes

Next.js 14 (App Router) + Tailwind + Supabase. Carrito con checkout por
WhatsApp (+54 9 362 436-8290) y panel de administración para cargar stock.

## 1. Instalar dependencias

```bash
npm install
```

## 2. Configurar Supabase

### 2.1 Crear la tabla de productos

En el **SQL Editor** de tu proyecto Supabase, correr:

```sql
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric not null,
  stock int not null default 0,
  category text,
  images text[] not null default '{}',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table products enable row level security;

-- cualquiera puede ver los productos activos (tienda pública)
create policy "Productos activos son públicos"
  on products for select
  using (active = true);

-- solo usuarios autenticados (el admin) pueden ver todo, insertar, editar y borrar
create policy "Admin puede ver todo"
  on products for select
  to authenticated
  using (true);

create policy "Admin puede insertar"
  on products for insert
  to authenticated
  with check (true);

create policy "Admin puede actualizar"
  on products for update
  to authenticated
  using (true);

create policy "Admin puede borrar"
  on products for delete
  to authenticated
  using (true);
```

> **Si ya habías creado la tabla con `image_url text` (una sola imagen):**
> ```sql
> alter table products add column if not exists images text[] not null default '{}';
> update products set images = array[image_url] where image_url is not null;
> alter table products drop column image_url;
> ```

### 2.2 Crear el bucket de imágenes

En **Storage**, crear un bucket público llamado `products`.

Luego, en el SQL Editor, dar permisos:

```sql
create policy "Lectura pública de imágenes de productos"
  on storage.objects for select
  using (bucket_id = 'products');

create policy "Admin puede subir imágenes"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'products');

create policy "Admin puede borrar imágenes"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'products');
```

### 2.3 Crear tu usuario admin

En **Authentication → Users → Add user**, crear un usuario con tu email y
una contraseña. Con ese email/contraseña vas a entrar en `/admin`.

> No hace falta pantalla de "registro": el acceso al panel se controla
> creando usuarios manualmente desde Supabase. Así solo vos (o quien vos
> decidas) puede entrar a cargar stock.

### 2.4 Obtener las variables de entorno

En **Project Settings → API** copiás:
- `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Creá un archivo `.env.local` (copiá `.env.local.example`) y completá esos
dos valores.

## 3. Correr en local

```bash
npm run dev
```

Abrí `http://localhost:3000` para la tienda y `http://localhost:3000/admin`
para el panel.

## 4. Deploy en Vercel

1. Subí este proyecto a un repo de GitHub.
2. En Vercel, importá el repo (con la cuenta que ya tenés vinculada al
   dominio de nic.ar).
3. En **Environment Variables**, cargá `NEXT_PUBLIC_SUPABASE_URL` y
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Deploy.
5. En **Settings → Domains**, agregá tu dominio de nic.ar y seguí las
   instrucciones para apuntar el DNS (Vercel te va a pedir un registro A o
   CNAME).

## 5. Cómo funciona el checkout

El carrito se guarda en el navegador (localStorage), no en Supabase — así
cada visitante tiene su propio carrito sin necesidad de login. Al tocar
**"Finalizar por WhatsApp"**, se arma un mensaje con el detalle del pedido y
el total, y se abre WhatsApp para coordinar el pago con
**+54 9 362 436-8290**. El stock y el descuento de stock post-venta se
maneja manualmente desde el panel de admin (editás la cantidad después de
cada venta).

## 6. Estructura del proyecto

```
app/
  layout.js            → tipografías + CartProvider
  page.js               → home: hero + catálogo (trae productos de Supabase)
  globals.css            → paleta, tipografía, motivo de estrella
  lib/
    supabaseClient.js
    cartContext.js       → estado del carrito + link de WhatsApp
  components/
    Header.js, Hero.js, ProductCard.js, ProductGrid.js,
    CartDrawer.js, Footer.js
  admin/
    page.js               → login (Supabase Auth)
    dashboard/page.js     → alta, edición, borrado de stock + subida de imágenes
public/
  logo.png               → logo de Ora Store
```

## 7. Paleta y diseño

- Negro `#0f0f0f` como base, hueso/marfil `#f3ede0` para texto principal.
- Tonos hueso apagado (`#cdc4ae`) y hueso claro (`#f8f4ea`) como acentos —
  paleta estrictamente blanco / negro / hueso, sin colores.
- Tipografía de display: **Cormorant Garamond** (serif fina y delicada, en
  peso liviano). Texto: **Jost** en peso liviano (300).
- El logo se muestra siempre dentro de un medallón circular (fondo hueso,
  borde fino) para que se vea prolijo en cualquier tamaño.
- El motivo de estrella de cinco puntas retoma el logo de Ora Store y se
  usa como firma visual (fondo del hero, separadores de sección).
- Crédito de autoría — "Sitio creado por Lautaro Yudi" — al pie de la
  página.
