import mongoose from "mongoose";

//created user schema
const userSchema = new mongoose.Schema(
    {
        email:{
            type : String,
            require : true,
            unique : true,
        },
        fullName : {
            type : String,
            require : true,
        },
        password : {
            type : String,
            require : true,
            minlength : 6,
        },
        profilePic : {
            type : String,
            default : "",
        },
    },
    {timestamps : true}
);

//creating user model dependent on schema
const user = mongoose.model("User", userSchema);

export default user;