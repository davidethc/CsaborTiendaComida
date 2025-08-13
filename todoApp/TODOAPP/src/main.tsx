import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TaskView from './ui/pages/TaskView.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TaskView />
  </StrictMode>,
)
