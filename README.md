# Intelligent Virtual Operations & Revolutionary Automation — Landing Page

Ye ek **static website** hai (sirf HTML/CSS/JS). Koi backend, API, database ya build step **nahi** hai. Isliye Vercel pe deploy karna sab se simple case hai.

## Project Structure

```
project/
├── index.html      # Poori site (HTML + CSS + JS sab isi file mein hai)
├── vercel.json     # Vercel config (clean URLs)
└── README.md       # Ye file
```

> Note: File ka naam `preview.html` se `index.html` kar diya gaya hai — Vercel (aur har static host) by default `index.html` ko root page ke tor pe serve karta hai.

## External Dependencies (CDN)

Site GSAP animation library CDN se load karti hai:
- `gsap.min.js`
- `ScrollTrigger.min.js`

Internet chalne pe ye automatically load ho jayengi, koi npm install ki zaroorat nahi.

---

## 🚀 Vercel Pe Deploy Karne Ke Tareeqe

### Method 1: Vercel CLI (sab se fast, terminal se)

```bash
# 1. Vercel CLI install karo (agar pehle se nahi hai)
npm install -g vercel

# 2. Project folder mein jao
cd project

# 3. Login karo
vercel login

# 4. Deploy karo
vercel

# 5. Production pe deploy karne ke liye
vercel --prod
```

CLI aapse kuch sawal poochega (project name, scope waghera) — bas Enter dabate jao defaults ke liye. Deploy hone ke baad wo aapko live URL de dega, e.g. `https://your-project.vercel.app`.

### Method 2: GitHub se (recommended — auto-deploy on push)

1. Is `project` folder ko GitHub repo bana lo:
   ```bash
   cd project
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. [vercel.com](https://vercel.com) pe jao → **Sign up / Login** (GitHub se login karo).
3. **"Add New Project"** → apna GitHub repo select karo.
4. Framework Preset: **"Other"** ya **"Static"** select karega Vercel khud-ba-khud (kyunke koi framework nahi hai).
5. Build Command: **khali chhod do** (empty).
6. Output Directory: **khali chhod do** (root `/` hi use hoga).
7. **Deploy** dabao.

Bas! Har baar jab aap `main` branch pe push karoge, Vercel automatically redeploy kar dega.

### Method 3: Drag & Drop (sab se aasan, no git/CLI)

1. [vercel.com/new](https://vercel.com/new) pe jao.
2. Login karo.
3. Neeche scroll karke **drag-and-drop area** dhoondo.
4. `project` folder (jisme `index.html` hai) ko wahan drag-drop kar do.
5. Deploy ho jayega automatically.

---

## Local Testing (Deploy se pehle check karne ke liye)

```bash
cd project
python3 -m http.server 8000
# Browser mein kholo: http://localhost:8000
```

ya

```bash
npx serve .
```

---

## Custom Domain Add Karna

Deploy hone ke baad:
1. Vercel Dashboard → apna project → **Settings** → **Domains**.
2. Apna domain type karo aur instructions follow karo (DNS records add karna hoga apne domain registrar pe).

---

## Notes

- Ye site fully static hai — koi environment variables, API keys ya server-side code involved nahi hai.
- Agar future mein koi backend/API (form submission, chatbot backend waghera) add karni ho, to Vercel **Serverless Functions** (`/api` folder) use kar sakte hain — filhal is site mein wo zaroorat nahi hai.
