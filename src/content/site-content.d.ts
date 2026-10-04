// The published website content from RMD, fetched when the site is built (see vite.config.ts).
declare module 'virtual:site-content' {
  const content: { version: number | null; values: Record<string, string> };
  export default content;
}
