import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PlannerPage } from './pages/PlannerPage';

const root = document.getElementById('root');
if (!root) throw new Error('#root not found');

createRoot(root).render(
  <StrictMode>
    <PlannerPage />
  </StrictMode>,
);
