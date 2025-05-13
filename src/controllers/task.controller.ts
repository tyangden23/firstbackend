import { Request, Response } from 'express'
import { handleError,isValidObjectId } from '../utils/vaildatirs';
import { ITask } from '../types/task';
import Task from '../models/task.model'

// Get all task
export const getTask = async (_req: Request, res: Response): Promise<void> => {
  try {
        // Use lean() for better performance when you don't
        // need full mongoose documents

    const task = await Task.find().lean()
    res.status(200).json(task)
  } catch (error) {
    handleError(res, error)
  }
}

// Get task by ID
export const getTaskById = async ( req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id, res)) return
    const task = await Task.findById(id).lean()
    if (!task) {
      res.status(400).json({ message: 'Task not found' })
      return
    }
    res.status(200).json(task) 
}catch (error) {
    handleError(res, error)
  }
}

// Create new task
export const createTask = async (
  req: Request<{}, {}, ITask>,  
  res: Response
): Promise<void> => {
  try {
    const { title, description, duedate, completed } = req.body
    if (!title  ) {
      res.status(400).json({ message: 'Missing required fields' }) 
      return
    }

    const existingTask = await Task.findOne({ title }).lean()
    if (existingTask) {
      res.status(400).json({ message: 'Title already exists' })
      return
    }

    const task = new Task({ title, description, duedate, completed })
    const savedTask = await task.save()
    const { _id, title: taskTitle, description: taskDescription, duedate:taskDuedate, completed:taskCompleted } = savedTask
    res.status(201).json({ _id, title: taskTitle, description: taskDescription,  duedate:taskDuedate, completed:taskCompleted})
  } catch (error) {
    handleError(res, error)
  }
}

// Update task
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { title, description, duedate, completed } = req.body
    if (!isValidObjectId(id, res)) return

    if (!title && !description && !duedate && !completed ) {
      res.status(400).json({ message: 'No update fields provided' })
      return
    }

        //Build update object dynamically
    const updateData: Partial<ITask> = {}
    if (title) updateData.title = title
    if (description) updateData.description = description
    if (duedate) updateData.duedate = duedate
    if (completed) updateData.completed = completed
        

    const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .lean()

    if (!updatedTask) {
      res.status(404).json({ message: 'Task not found' })
      return
    }

    res.status(200).json(updatedTask)
  } catch (error) {
    handleError(res, error)
  }
}

    //Delete task
    export const deleteTask = async (req: Request , res: Response): Promise<void> => {
  try {
    const { id } = req.params 
    if (!isValidObjectId(id, res)) return

    const deletedTask = await Task.findByIdAndDelete(id).lean()
    if (!deletedTask) {
      res.status(400).json({ message: 'Task not found' })
      return
    }

    res.status(200).json({ message: 'Task deleted successfully' })
  } catch (error) {
    handleError(res, error)
  }
}