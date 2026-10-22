# HAJUN website

A copy of https://hajun.lovable.app/: a one-page site for HAJUN, an Arabian perfume house in Dammam.

It is a single self-contained file, `index.html` (plain HTML, CSS and a little JavaScript, with no build step). It is separate from the KILF festival site in this repo and is not part of its build.

## Preview

Open `index.html` in a browser, or serve the folder:

```bash
npx serve hajun
```

## Deploy

Upload `index.html` to any static host (Netlify Drop, Vercel, GitHub Pages, cPanel). On Vercel or Netlify, set the project's root directory to `hajun/` and leave the build command empty.

## Edit

- **Fragrances:** the `products` list near the bottom of `index.html` (name, tagline, size, image, notes).
- **Contact details:** the contact strip and footer (address, email, phone) and the WhatsApp link (`wa.me/966575202794`).
- **Colours and fonts:** the `:root` variables at the top of the `<style>` block.

## Notes

- Images are still loaded from `hajun.lovable.app`. If that Lovable site is taken down they will break, so download them into this folder and update the paths before moving off Lovable.
- The العربية button only switches the page to right-to-left. The text stays in English until Arabic copy is added.
