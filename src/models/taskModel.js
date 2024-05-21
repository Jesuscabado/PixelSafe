import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    description: String,
    users:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'users'
        }
    ],
    status: {
        type:String,
        enum: ["ToDo","Doing","Done"],
        default: "ToDo"
    },
    project:{
        type: mongoose.Schema.ObjectId,
            ref: 'projects',
            required: true
    }
})

const taskModel = mongoose.model("tasks",taskSchema);

export default taskModel;