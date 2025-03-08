const mongoose = require("mongoose");   
const { boolean, required } = require("yargs");
const { Schema } = mongoose;    


const RepoSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    description:{
        type: String,
        // required: true,
    },
    content:[
        {
            type: String,
        }
    ],
    visibility:{
        type: Boolean,
        default: "public",
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    issue:[
        {
            type: Schema.Types.ObjectId,
            ref: "Issue",
        },
    ],

});

const Repository=mongoose.model("Repository",RepoSchema);
module.exports=Repository;