# Wrap It Up Graphix + Tints

Website for **Wrap It Up Graphix + Tints**, a Massachusetts shop for vehicle wraps,
window tinting, signage, apparel printing and more.

Built as a fast, static, multi-page site. No build step required.

## Stack

- Plain HTML, one shared `styles.css`, one shared `main.js`
- [Archivo](https://fonts.google.com/specimen/Archivo) + [Manrope](https://fonts.google.com/specimen/Manrope) (display / body), with [Pacifico](https://fonts.google.com/specimen/Pacifico) as a script accent
- [Phosphor Icons](https://phosphoricons.com/) via CDN
- Dark theme, electric-cyan accent pulled from the logo

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| Vehicle Wraps | `wraps.html` |
| Window Tinting | `tints.html` |
| Signage & Decals | `signage-decals.html` |
| Apparel Printing | `apparel-printing.html` |
| Stickers | `stickers.html` |
| Graphic Design | `graphic-design.html` |
| Branding | `branding.html` |
| Websites | `websites.html` |
| Our Company | `our-company.html` |
| Contact | `contact.html` |

## Running locally

It's a static site, so any web server works:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly works too, but serving over HTTP is recommended
so the JS-rendered galleries load correctly.

## Features

- Responsive across desktop, tablet and mobile
- Sticky nav with a Services dropdown and a mobile drawer
- Lightbox galleries (keyboard + click navigation)
- Scroll-reveal animations that respect `prefers-reduced-motion`
- Accessible contact form with client-side validation
