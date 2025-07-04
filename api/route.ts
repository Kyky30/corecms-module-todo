// Routes API pour le module Todo
// Ces routes utilisent les handlers du module

import { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask,
  getStats 
} from '@/modules/todo/backend/handlers'

export const GET = getTasks
export const POST = createTask
export const PUT = updateTask
export const DELETE = deleteTask 