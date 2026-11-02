import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { AppRoutes } from './App';

/**
 * A page drawn as HTML at build time (scripts/page-heads.ts), so Google, link
 * previews and site audits read its headings, words and links without running
 * the site's code. Waits for the page's own code (the lazy pages) to load.
 */
export async function render(path: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={path}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  );
  let html = '';
  for await (const chunk of prelude) html += chunk;
  return html;
}
