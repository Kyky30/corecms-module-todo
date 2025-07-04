import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function getTasks(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const completed = searchParams.get('completed')
    const priority = searchParams.get('priority')

    const where: any = {}
    if (completed !== null) where.completed = completed === 'true'
    if (priority) where.priority = priority

    const tasks = await db.todoTask.findMany({
      where,
      orderBy: [
        { completed: 'asc' },
        { priority: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json({ success: true, data: tasks })
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

export async function createTask(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, priority, dueDate } = body

    if (!title) {
      return NextResponse.json(
        { success: false, error: 'Le titre est requis' },
        { status: 400 }
      )
    }

    const task = await db.todoTask.create({
      data: {
        title,
        description,
        priority: priority || 'MEDIUM',
        dueDate: dueDate ? new Date(dueDate) : null
      }
    })

    return NextResponse.json({ success: true, data: task })
  } catch (error) {
    console.error('Erreur lors de la création de la tâche:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

export async function updateTask(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID requis' },
        { status: 400 }
      )
    }

    const task = await db.todoTask.update({
      where: { id },
      data: updates
    })

    return NextResponse.json({ success: true, data: task })
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

export async function deleteTask(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID requis' },
        { status: 400 }
      )
    }

    await db.todoTask.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

export async function getStats(request: NextRequest) {
  try {
    const [totalTasks, completedTasks] = await Promise.all([
      db.todoTask.count(),
      db.todoTask.count({ where: { completed: true } })
    ])

    const pendingTasks = totalTasks - completedTasks
    
    const overdueTasks = await db.todoTask.count({
      where: {
        completed: false,
        dueDate: {
          lt: new Date()
        }
      }
    })

    const stats = {
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks
    }

    return NextResponse.json({ success: true, data: stats })
  } catch (error) {
    console.error('Erreur lors de la récupération des stats:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    )
  }
} 