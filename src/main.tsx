import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './fonts.css';
import './index.css';
import { inEditor, startEditor } from './content';

// Only inside RMD's website editor; for visitors it does nothing.
startEditor();

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Most pages arrive already drawn (scripts/page-heads.ts): the site takes them
// over as they are. Where the drawing differs from what the site shows now (an
// edit made in RMD since the build), React draws that part again by itself.
// RMD's editor and the plain shell (blog articles, a page not found) start fresh.
if (root.hasChildNodes() && !inEditor) hydrateRoot(root, app, { onRecoverableError: () => {} });
else createRoot(root).render(app);
