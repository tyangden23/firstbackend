import 
{ Router } from 'express'
import { createUser, deleteUser, getUser, getUserById, updateUser } from '../controllers/user.controller'

const router = Router()

//Create new user
router.post('/', createUser)

// GEt all users
router.get('/', getUser)

// Get user by id 
router.get ('/:id',getUserById)

// Update user
router.patch('/:id',updateUser)

// Delete user
router.delete('/:id',deleteUser)




export default router