import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
       name: String,
       email: String,
       telephone: Number,
       password: String,
       age: Number  
    },
    {collection: "users"}
);

export default mongoose.model("User", UserSchema);