import { Router } from 'express'
import {createTask,deleteTask,getTaskById,getTask,updateTask} from '../controllers/task.controller'

const router = Router()

// Get all tasks
router.get('/', getTask)

// Get task by ID
router.get('/:id', getTaskById)

// Create new task
router.post('/', createTask)

// Update task
router.patch('/:id', updateTask)

// Delete task
router.delete('/:id', deleteTask)



export default router
