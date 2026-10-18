# 🚛 Junk Removal Brothers Website

Welcome to your clean, professional, modular website for **Junk Removal Brothers** in Rochester, NY!

This site is built with a **Zero-Build, Single-Config architecture**: you can edit your company name, phone, email, prices, photos, and copy in one file (`config.js`) and publish directly to **GitHub Pages** (100% free).

---

## 📸 Highlights

1. **Streamlined Instant Price Estimator**:
   - One-tap quick-add chips for the most common items plus an instant-add dropdown menu and compact access-factor pills.
   - Pre-fills a direct text message with the customer's selected items and estimated range.
2. **Text-First Lead Capture**:
   - Prominent **Text Photos** buttons in the header, hero, price estimator, quote form, and mobile bar (`205-205-7572`).
3. **Authentic Photography & Trust Elements**:
   - **Hero Action Shot**: High-resolution image of the two brothers in uniform carrying furniture to their clean removal truck.
   - **"Meet the Brothers" Portraits**: Authentic portraits of Brother 1 and Brother 2 in matching navy work shirts side-by-side.

---

## 📁 Project Structure

```
junk-removal/
├── config.js               ⭐ THE ONLY FILE YOU NEED TO EDIT
├── index.html              # Main webpage structure & SEO
├── css/
│   └── styles.css          # Clean, modern styling & responsive layouts
├── js/
│   ├── quote-calculator.js # Instant quote calculator engine
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

1. **Company Name**: Edit `company.name` (`"Junk Removal Brothers"`).
2. **Phone & SMS**: Update `phone`, `phoneRaw`, and `smsNumber` (`"205-205-7572"` / `"2052057572"`).
3. **Email**: Update `company.email` and `form.destinationEmail` (`"RocJunkRemoval@proton.me"`).
4. **Your Real Photos**:
   - Place your real smartphone/camera photos inside `assets/images/`.
   - Update the file names in `config.js` (e.g. `brother1.image: "assets/images/your_photo.jpg"`).
5. **Brother Names & Story**: Update `aboutUs.brother1.name`, `aboutUs.brother2.name`, and the story text.
6. **Prices & Items**: Add or edit items inside `itemCatalog` to adjust base prices.

Save `config.js` and refresh your browser — **everything updates immediately!**

---

## 📧 How to Change the Email Where Quotes Get Sent

This website uses **[FormSubmit.co](https://formsubmit.co)** (100% free, supports photo attachments, no account required):

1. Open `config.js` and update two fields to your desired email address:
   - `company.email` (line 25) — displayed on the website
   - `form.destinationEmail` (line 198) — where quote form submissions and photos are sent
2. **Important One-Time Activation Step**:
   - The very first time a quote is submitted to a new email address on your live site, FormSubmit will send an **"Activate Form"** confirmation email to that inbox (`RocJunkRemoval@proton.me`).
   - Click **"Activate Form"** inside that email once (check Spam/Promotions just in case).
   - FormSubmit will also give you an optional random string (hash) in that email — you can either keep your regular email in `form.destinationEmail` or paste that hash string if you want to hide the raw email address from the form code.

---

## 🚀 How to Publish on GitHub Pages (Free)

1. Create a free repository on [GitHub](https://github.com) (e.g., `junk-removal-bros`).
2. Upload all the files and folders from this project into your GitHub repository.
3. Go to **Settings** $\rightarrow$ **Pages** (in the left sidebar).
4. Under **"Branch"**, choose `main` (or `master`) and folder `/ (root)`, then click **Save**.
5. Your live website URL will be ready in ~1 minute!
