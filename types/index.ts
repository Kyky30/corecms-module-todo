// Types pour le module Todo

export interface TodoTask {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  dueDate?: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface TodoStats {
  totalTasks: number
  completedTasks: number
  pendingTasks: number
  overdueTasks: number
}

export interface CreateTodoTaskData {
  title: string
  description?: string
  priority?: 'LOW' | 'MEDIUM' | 'HIGH'
  dueDate?: Date
} 