import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DispatchPage } from './DispatchPage';

const root = document.getElementById('root');
if (!root) throw new Error('#root not found');

createRoot(root).render(
  <StrictMode>
    <DispatchPage />
  </StrictMode>,
);
