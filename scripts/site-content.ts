import type { Plugin } from 'vite';

// The published website content from RMD (BUILD_PLAN A16 in RMD), baked into
// the site when it's built. A build can't go ahead without it: if RMD can't
// be reached, the build stops and the live site stays as it was. While
// developing, the site shows its starting wording unless RMD_CONTENT_URL is set.

const LIVE = 'https://winicrmzmcgfwrrynoxd.supabase.co/functions/v1/website-content';
const ID = 'virtual:site-content';
const KEY = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/;

type Content = { version: number | null; values: Record<string, string> };

async function fetchContent(url: string): Promise<Content> {
  const response = await fetch(url, { signal: AbortSignal.timeout(20_000) });
  if (!response.ok) throw new Error(`RMD answered ${response.status}`);
  const body = (await response.json()) as { version?: unknown; values?: unknown };
  const values: Record<string, string> = {};
  if (body.values && typeof body.values === 'object') {
    for (const [k, v] of Object.entries(body.values)) if (KEY.test(k) && typeof v === 'string' && v.length <= 5000) values[k] = v;
  }
  return { version: typeof body.version === 'number' ? body.version : null, values };
}

export function siteContent(command: 'build' | 'serve', env: Record<string, string>): Plugin {
  let content: Content = { version: null, values: {} };
  return {
    name: 'site-content',
    async buildStart() {
      const url = env.RMD_CONTENT_URL || (command === 'build' ? LIVE : '');
      if (!url) return;
      try {
        content = await fetchContent(url);
        this.info(`website content from RMD: version ${content.version ?? 'none'}, ${Object.keys(content.values).length} pieces`);
      } catch (error) {
        const message = `Couldn't fetch the website content from RMD (${url}): ${error instanceof Error ? error.message : error}`;
        if (command === 'build') this.error(message);
        this.warn(`${message}. Showing the starting wording.`);
      }
    },
    resolveId(id) {
      if (id === ID) return `\0${ID}`;
    },
    load(id) {
      if (id === `\0${ID}`) return `export default ${JSON.stringify(content)};`;
    },
    generateBundle() {
      // RMD checks this after publishing, to say when the change is live.
      if (command === 'build') this.emitFile({ type: 'asset', fileName: 'content-version.json', source: JSON.stringify({ version: content.version }) });
    },
  };
}
