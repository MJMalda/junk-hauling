# 🚛 Rochester, NY Junk Hauling Website

Welcome to your clean, professional, modular website for your two-brother junk hauling business in Rochester, NY!

This site is built with a **Zero-Build, Single-Config architecture**: you can edit your company name, phone, email, prices, photos, and copy in one file (`config.js`) and publish directly to **GitHub Pages** (100% free).

---

## 📸 What's New in this Professional Redesign

1. **Clean Dropdown Item Estimator**:
   - Replaced cluttered item grids with a clean dropdown menu: choose an item, click **"+ Add Item"**, and see an itemized list with `+` / `-` adjustments and one-click removal.
2. **Simplified Access Modifiers**:
   - Clean toggles for Stairs (1 flight, 2+ flights) and Tight Hallways / Sharp Corners.
3. **Authentic Photography & Trust Elements**:
   - **Hero Action Shot**: High-resolution image of the two brothers in uniform carrying furniture to their clean hauling truck.
   - **"Meet the Brothers" Portraits**: Authentic portraits of Brother 1 and Brother 2 in matching navy work shirts side-by-side.

---

## 📁 Project Structure

```
JunkHauling/
├── config.js               ⭐ THE ONLY FILE YOU NEED TO EDIT
├── index.html              # Main webpage structure & SEO
├── css/
│   └── styles.css          # Clean, modern styling & responsive layouts
├── js/
│   ├── quote-calculator.js # Dropdown auto-quote calculator engine
│   ├── form-handler.js     # Photo dropzone & email submission handler
│   └── main.js             # Injects data and photos from config.js
├── assets/
│   └── images/             # Profile photos & action moving shot
│       ├── brother1.jpg
│       ├── brother2.jpg
│       └── action_shot.jpg
└── README.md               # This guide
```

---

## ⚡ How to Edit Company Name, Phone, Prices & Photos

Open **`config.js`** in any text editor:

1. **Company Name**: Change `"Rochester Haul Bros"` to your chosen name.
2. **Phone & SMS**: Update `phone`, `phoneRaw`, and `smsNumber`.
3. **Email**: Update `email` to your business email.
4. **Your Real Photos**:
   - Place your real smartphone/camera photos inside `assets/images/`.
   - Update the file names in `config.js` (e.g. `brother1.image: "assets/images/your_photo.jpg"`).
5. **Brother Names & Story**: Update `aboutUs.brother1.name`, `aboutUs.brother2.name`, and the story text.
6. **Prices & Items**: Add or edit items inside `itemCatalog` to adjust base prices.

Save `config.js` and refresh your browser — **everything updates immediately!**

---

## 📧 How to Receive Quotes & Photos in Your Email (Free)

1. Go to [https://web3forms.com](https://web3forms.com).
2. Enter your business email address and click **"Create Access Key"**.
3. Copy your free access key from your email.
4. Open `config.js` and paste it under `web3formsAccessKey`:
   ```javascript
   web3formsAccessKey: "YOUR_PASTED_ACCESS_KEY_HERE",
   ```
5. Done! Submissions with photos and itemized calculator estimates will go straight to your inbox.

---

## 🚀 How to Publish on GitHub Pages (Free)

1. Create a free repository on [GitHub](https://github.com) (e.g., `junk-hauling-rochester`).
2. Upload all the files and folders from this project into your GitHub repository.
3. Go to **Settings** $\rightarrow$ **Pages** (in the left sidebar).
4. Under **"Branch"**, choose `main` (or `master`) and folder `/ (root)`, then click **Save**.
5. Your live website URL will be ready in ~1 minute!
