import mongoose, {Schema} from "mongoose"
import {ITask, } from '../types/task'


const taskSchema: Schema = new Schema ({
    title: {
        type: String,
        required:true,
        trim: true,
    },

    description : {
        type: String,
        trim: true,
    },

    duedate: {
         type: Date,

    },

    complete: {
         type: Boolean,
         default: false,
    },
})

export default mongoose.model<ITask>('Task', taskSchema);