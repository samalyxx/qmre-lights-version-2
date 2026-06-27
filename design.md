# QMRE Lights — Design System

This document captures the visual design of the revamped homepage (`index.html`) so every other page (`category.html`, `product.html`, etc.) can be brought in line with the same look and feel.

The aesthetic is **luxury, dark, editorial** — black backgrounds, gold accents, serif display headings, and generous whitespace.

---

## 1. Tech & Setup

These are loaded in the `<head>` and must be present on every page that uses this system.

```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
```

- **Tailwind CSS** (CDN) — primary styling utility layer.
- **Bootstrap 5.3** — used only for modals (cart / payment) and form controls.
- **Font Awesome 6.4** — icons (`fas`, `fab`).
- **styles.css** — project-specific custom CSS (e.g. `.transition-custom`, `.whatsapp-float`, `.homepage-modal`).

### Tailwind config (must match on every page)

```js
tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          gold:  '#d4af37',
          dark:  '#1a1a1a',
          card:  '#242424',
          muted: '#a0a0a0'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans:  ['Montserrat', 'sans-serif'],
      }
    }
  }
}
```

---

## 2. Color Palette

| Token | Hex | Usage |
|---|---|---|
| `brand-gold` | `#d4af37` | Accents, headings, CTAs, active states, icons |
| `brand-dark` | `#1a1a1a` | Primary page background |
| `brand-card` | `#242424` | Card / panel backgrounds |
| `brand-muted` | `#a0a0a0` | Muted text |
| Section alt bg | `#141414` | Alternating darker section background |
| White | `#ffffff` | Primary body text, secondary borders (`white/5`, `white/10`) |
| Gray scale | `gray-300` / `gray-400` / `gray-600` / `gray-700` / `gray-800` | Body copy, borders, inactive tabs |
| Overlay | `black/50`, `black/60` | Image overlays for text legibility |

Body default: `bg-brand-dark text-white`.

---

## 3. Typography

- **Display / headings:** `font-serif` (Playfair Display), almost always in `text-brand-gold`.
- **Body / UI / nav:** `font-sans` (Montserrat).
- **Nav & buttons:** `uppercase` + `tracking-wider` / `tracking-widest`.

| Element | Classes |
|---|---|
| Hero H1 | `text-4xl sm:text-5xl md:text-7xl font-serif font-bold leading-tight uppercase` |
| Section H2 | `text-4xl font-serif text-brand-gold` (centered: `text-center`) |
| Card H3 | `font-serif text-lg text-brand-gold` |
| Feature H4 | `text-xl font-serif text-brand-gold` |
| Body copy | `text-sm text-gray-400` / `text-lg text-gray-300` |
| Footer headings | `text-white font-bold uppercase tracking-widest` |

---

## 4. Layout

- **Container:** `max-w-7xl mx-auto px-6` — used for every section's inner wrapper.
- **Vertical rhythm:** sections use `py-20` (standard) or `py-24` (feature sections like "Why Choose Us" / Testimonials).
- **Section separators:** `border-t border-white/10` (or `border-white/5`).
- **Alternating backgrounds:** main sections `bg-brand-dark`; emphasis sections `bg-[#141414]`.

---

## 5. Components

### Header (sticky)
```
sticky top-0 z-50 bg-brand-dark/95 border-b border-white/10 backdrop-blur-sm
```
- Logo: gold SVG bulb icon + `QMRE` (white) `Lights` (gold), serif uppercase.
- Desktop nav: `hidden lg:flex`, uppercase, hover → `text-brand-gold`, with a Categories dropdown (`group` / `group-hover`).
- Icons: search, cart (with gold count badge), mobile hamburger (`lg:hidden`).
- Mobile nav: toggled `#mobileNav`, stacked links.

### Buttons / CTAs
- **Primary:** `px-8 py-3 bg-brand-gold text-brand-dark font-bold uppercase tracking-widest hover:bg-white transition-custom`
- **Outline:** `px-8 py-3 border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-custom`
- **Gold outline:** `border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-custom`

### Pills (category filters)
- Active: `rounded-full bg-brand-gold text-brand-dark font-semibold text-sm uppercase`
- Inactive: `rounded-full border border-gray-600 hover:border-brand-gold transition-custom text-sm uppercase`

### Tab group (Trending / Sector)
- Wrapper: `flex border border-gray-700 rounded overflow-hidden`
- Active tab: `bg-gray-800 text-brand-gold font-semibold text-xs uppercase`
- Inactive tab: `text-gray-400 hover:bg-gray-800 transition-custom text-xs uppercase`

### Cards
- **Category card:** `bg-brand-card border border-white/5 p-4 text-center hover:border-brand-gold transition-custom`, square image `aspect-square object-cover`.
- **Image-overlay card (sectors):** `relative h-[400px] md:h-[500px] group overflow-hidden border border-white/10`, image `object-cover group-hover:scale-110 transition-transform duration-500`, dark overlay `bg-black/60` holding centered text + CTA.
- **Feature item:** circular gold-bordered icon `w-20 h-20 border border-brand-gold rounded-full`, serif gold heading, muted body.
- **Testimonial:** `bg-brand-card p-10 pt-16 border border-white/5`, overlapping avatar `rounded-full border-4 border-brand-dark`, gold star row.

### Footer
- `bg-brand-dark pt-20 pb-10 border-t border-white/5`, 4-column grid (`md:grid-cols-4`).
- Columns: Quick Links, Categories, Company Info (with social circles), Newsletter.
- Social buttons: `w-10 h-10 rounded-full border border-gray-600 hover:border-brand-gold hover:text-brand-gold`.
- Bottom bar: trust badges + copyright, `text-xs uppercase tracking-widest text-gray-400`.

### Modals (Bootstrap)
- Use class `homepage-modal` on `.modal-content`.
- `btn-close-white` for the close button, `btn-gold` for primary actions (defined in `styles.css`).

### WhatsApp float
- `.whatsapp-float` fixed button with `.whatsapp-btn` and `fab fa-whatsapp` icon.

---

## 6. Interaction / Motion

- Standard transition utility: **`transition-custom`** (defined in `styles.css`) applied to all hover targets.
- Image zoom on hover: `group-hover:scale-110 transition-transform duration-500`.
- Customer logos: `grayscale hover:grayscale-0` + `opacity-60 hover:opacity-100`.
- Hover color shift convention: text → `text-brand-gold`; gold buttons → `bg-white`.

---

## 7. Conventions to Carry Over

When updating other pages to match `index.html`:

1. Keep the same `<head>` setup + identical Tailwind config block.
2. Wrap content in `max-w-7xl mx-auto px-6`.
3. Reuse the exact header and footer markup for consistency.
4. Headings = serif gold; body = sans gray; CTAs = gold/outline as above.
5. Apply `transition-custom` to every interactive element.
6. Use `data-purpose="..."` attributes on major sections (matches existing pattern, e.g. `hero-banner`, `features`, `footer`).
