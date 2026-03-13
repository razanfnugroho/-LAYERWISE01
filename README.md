# 🌊 Sistem Peringatan Dini Banjir - PKM 2025

Website sistem peringatan dini banjir menggunakan metode Layerwise berbasis OpenWeather OneCall API 3.0.

## 🚀 Deploy ke Railway dengan GitHub

### Langkah 1: Push ke GitHub

#### A. Buat Repository Baru di GitHub
1. Buka [github.com](https://github.com) dan login
2. Klik tombol **"New"** atau **"+"** → **"New repository"**
3. Isi nama repository: `flood-warning-system` (atau nama lain)
4. Pilih **Public** atau **Private**
5. **JANGAN** centang "Add a README file"
6. Klik **"Create repository"**

#### B. Upload Project ke GitHub

**Pilihan 1: Upload via GitHub Web (Paling Mudah)**
1. Di halaman repository yang baru dibuat, klik **"uploading an existing file"**
2. Drag & drop **SEMUA FILE** dari folder project ini
3. Scroll ke bawah, klik **"Commit changes"**
4. Tunggu upload selesai ✅

**Pilihan 2: Via Git (Perlu Terminal)**
```bash
# Buka terminal di folder project ini, lalu jalankan:
git init
git add .
git commit -m "Initial commit - Flood Warning System"
git branch -M main
git remote add origin https://github.com/USERNAME/flood-warning-system.git
git push -u origin main
```
*(Ganti `USERNAME` dengan username GitHub kamu)*

---

### Langkah 2: Deploy ke Railway

#### A. Buat Akun Railway
1. Buka [railway.app](https://railway.app)
2. Klik **"Start a New Project"** atau **"Login"**
3. Login dengan **GitHub** (klik "Login with GitHub")
4. Authorize Railway untuk akses GitHub kamu

#### B. Deploy Project
1. Setelah login, klik **"New Project"**
2. Pilih **"Deploy from GitHub repo"**
3. Pilih repository **flood-warning-system** (yang baru kamu buat)
4. Railway akan otomatis detect Vite project ✅
5. Tunggu build selesai (2-5 menit)

#### C. Dapatkan URL Public
1. Setelah build selesai, klik project kamu
2. Klik tab **"Settings"**
3. Scroll ke **"Networking"** atau **"Domains"**
4. Klik **"Generate Domain"**
5. Railway akan kasih URL seperti: `https://flood-warning-system-production.up.railway.app`
6. **Selesai!** Website kamu sudah online 🎉

---

## 📝 Catatan Penting

### Build Configuration (Sudah Auto-Detect)
Railway akan otomatis jalankan:
- **Build Command**: `npm run build`
- **Start Command**: `npm run preview`
- **Port**: Auto-detect dari Vite (biasanya 3000)

### Jika Ada Error
Cek di Railway Dashboard → Logs → Lihat error messagenya. Biasanya:
- **"Module not found"**: Cek `package.json` dependencies
- **"Build failed"**: Cek Tailwind config
- **Port issues**: Sudah di-handle di `vite.config.js`

---

## 🔄 Update Website (Setelah Edit Kode)

### Via GitHub Web:
1. Buka repository di GitHub
2. Klik file yang mau di-edit (misal: `src/App.jsx`)
3. Klik icon pensil ✏️ (Edit)
4. Edit kode, scroll bawah, klik **"Commit changes"**
5. Railway otomatis detect changes dan **auto-deploy ulang** 🔄

### Via Git Terminal:
```bash
git add .
git commit -m "Update: pesan perubahan"
git push
```
Railway otomatis re-deploy dalam 1-2 menit! ⚡

---

## 🛠️ Development Lokal (Opsional)

Jika mau test di komputer kamu sebelum push:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build production
npm run build
```

Buka browser: `http://localhost:5173`

---

## 📦 Struktur Project

```
flood-warning-system/
├── src/
│   ├── App.jsx          # Main component (Flood Warning System)
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind CSS
├── index.html           # HTML entry
├── package.json         # Dependencies
├── vite.config.js       # Vite config (Railway-ready)
├── tailwind.config.js   # Tailwind config
└── README.md            # This file
```

---

## 🎨 Tech Stack

- **React 18** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Railway** - Hosting Platform

---

## 📊 Fitur

✅ Real-time clock (WIB & UTC)  
✅ Flood risk calculation (Layerwise method)  
✅ 4 weather parameters monitoring  
✅ 24-hour rainfall prediction chart  
✅ BMKG-inspired clean design  
✅ Responsive layout  
✅ Ready for OpenWeather API integration  

---

## 🔗 Links

- **Railway Dashboard**: [railway.app/dashboard](https://railway.app/dashboard)
- **GitHub Repo**: `https://github.com/USERNAME/flood-warning-system`
- **Live Website**: Akan muncul setelah deploy ✨

---

## 📞 Support

Jika ada masalah:
1. Cek Railway Logs
2. Cek GitHub Actions (jika ada)
3. Pastikan semua file sudah ke-upload

---

**Dibuat untuk PKM 2025 - Universitas Lambung Mangkurat** 🎓
