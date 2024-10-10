import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    text:{
        type:String,
        require:true
    },
    completed:{
        type:Boolean,
        require:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // referencing User model by its idtyp
        require:true,
    }
})


const Todo=mongoose.model('Todo',todoSchema);

export default Todo;