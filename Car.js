import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
    {
        model: String,
        plate: String,
        brand: String,
        year: Number,
        color: String,
        price: Number,
        available: Boolean
    },
    {collection: "cars"}
);

export default mongoose.model("Car", CarSchema);