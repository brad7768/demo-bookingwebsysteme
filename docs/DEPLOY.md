# Deploy & URLs

## Next.js booking app (source of truth)

| Environment | URL |
|-------------|-----|
| **Local** | [http://localhost:3000](http://localhost:3000) |
| **Netlify** | Set `NEXT_PUBLIC_APP_URL` to your site URL (example: `https://lumiere-studio-demo.netlify.app`) |

### Netlify

1. Import this repo in Netlify.
2. Build command and plugin are in `netlify.toml` (`@netlify/plugin-nextjs`).
3. In **Site configuration → Environment variables**, add:
   - `NEXT_PUBLIC_APP_URL` = your Netlify URL (no trailing slash).

Local dev does not need the variable; the app uses `http://localhost:3000` when unset.

## Higgsfield marketing site (scroll-scrub)

| Item | Value |
|------|--------|
| **website_id** | `34e7e384-1e63-484d-8b21-32cf4d35fbac` |
| **Live URL** | [https://lumiere-studio-book-demo.higgsfield.app](https://lumiere-studio-book-demo.higgsfield.app) |
| **Subdomain** | `lumiere-studio-book-demo` |
| **Booking CTA** | `https://lumiere-studio-demo.netlify.app` (change in Higgsfield `app/src/scroll-scrub-scenes.ts` if your Netlify URL differs) |
| **Admin CTA** | `https://lumiere-studio-demo.netlify.app/dashboard` |

The animated site is a **sister** experience: book and manage appointments on the Next/Netlify app.
