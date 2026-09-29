/**
 * Public URL of the Next.js booking app.
 * - Local: http://localhost:3000
 * - Netlify: set NEXT_PUBLIC_APP_URL in site env (or rely on Netlify URL at build time)
 */
export function getAppOrigin() {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  const netlify = process.env.URL?.replace(/\/$/, "");
  if (netlify && !netlify.includes("localhost")) return netlify;
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "http://localhost:3000";
}

export function appPath(path: string) {
  const base = getAppOrigin();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

/** Default production target when configuring the Higgsfield marketing site. */
export const NETLIFY_APP_URL_HINT = "https://lumiere-studio-demo.netlify.app";
