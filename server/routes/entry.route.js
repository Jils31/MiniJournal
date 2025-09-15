import express from "express"
import isAuth  from '../middleware/isAuth.js'
import { postEntry, getEntry, updateEntry, deleteEntry } from "../controllers/entry.controllers.js"

const entryRouter = express.Router()

entryRouter.post('/post', isAuth, postEntry)
entryRouter.get('/get', isAuth, getEntry)
entryRouter.patch('/update/:id', isAuth, updateEntry)
entryRouter.delete('/delete/:id', isAuth, deleteEntry)

export default entryRouter