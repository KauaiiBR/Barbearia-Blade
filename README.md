# 💈 BLADE & CO. — Barbearia (MVP)

Site de barbearia com tema **preto e branco**, animações elegantes e 3 páginas:

- **/** — Página inicial (hero, sobre, serviços, depoimentos, contato)
- **/agendamento** — Fluxo de agendamento em 3 passos (serviço → data/hora → dados)
- **/admin** — Painel do dono da barbearia com todos os agendamentos, filtros e estatísticas

Stack: **Next.js 15 (App Router) + Tailwind CSS + Framer Motion + MongoDB**.

---

## 🚀 Rodar localmente

```bash
# 1. Instalar dependências
yarn install

# 2. Copiar e ajustar variáveis de ambiente
cp .env.example .env
# edite .env com sua MONGO_URL (ex: mongodb://localhost:27017 ou MongoDB Atlas)

# 3. Rodar em dev
yarn dev
# abra http://localhost:3000
```

---

## 🗂️ Estrutura

```
app/
├── layout.js               # Layout global + fontes (Playfair, Bebas, Inter)
├── globals.css             # Estilos + animações (barber pole, marquee, grain)
├── page.js                 # Home
├── agendamento/page.js     # Formulário de agendamento
├── admin/page.js           # Dashboard do dono
└── api/[[...path]]/route.js  # API (GET/POST/DELETE /appointments)
```

---

## 🔌 API

Base: `/api`

| Método | Rota                     | Descrição                          |
|--------|--------------------------|-------------------------------------|
| GET    | `/api/appointments`      | Lista todos os agendamentos         |
| POST   | `/api/appointments`      | Cria agendamento                    |
| DELETE | `/api/appointments/:id`  | Cancela agendamento                 |

**Payload POST:**
```json
{
  "service": "corte" | "barba" | "combo" | "pigmentacao",
  "date": "2025-12-20",
  "time": "10:00",
  "name": "João Silva",
  "phone": "(11) 99999-9999"
}
```

---

## 🌐 Deploy

### Frontend — Netlify
1. Suba o repositório no GitHub.
2. Netlify → New site from Git → build command `yarn build` → publish `.next`.
3. Instale o plugin oficial **@netlify/plugin-nextjs**.
4. Env vars: `MONGO_URL`, `DB_NAME`, `NEXT_PUBLIC_BASE_URL`.

### Backend — Render
> Este projeto é **full-stack Next.js** — a API já vive dentro do próprio app.  
> Se quiser separar o backend em Render, extraia a lógica de `app/api/[[...path]]/route.js` em um servidor Express/Fastify e aponte o frontend para `NEXT_PUBLIC_API_URL`.

### 🗄️ Migrar para Supabase (opcional)

Crie a tabela `appointments` no Supabase:

```sql
create table appointments (
  id uuid primary key default gen_random_uuid(),
  service text not null,
  date date not null,
  time text not null,
  name text not null,
  phone text not null,
  status text default 'confirmed',
  created_at timestamp with time zone default now(),
  unique (date, time)
);

-- Habilitar RLS (opcional para admin público)
alter table appointments enable row level security;

-- Policy pública de leitura/escrita (ajuste para produção!)
create policy "public access" on appointments for all using (true) with check (true);
```

Depois, substitua o `MongoClient` em `app/api/[[...path]]/route.js` pelo cliente Supabase:

```bash
yarn add @supabase/supabase-js
```

```js
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
// use supabase.from('appointments').select()/insert()/delete()
```

---

## 🎨 Design

- Paleta: preto (#000) e branco (#fff) puros — sem cinzas fortes.
- Tipografia: `Playfair Display` (títulos), `Bebas Neue` (labels), `Inter` (corpo).
- Animações: Framer Motion (entrada, hover) + CSS (marquee, barber pole, grão).

Feito com precisão. ✂️
