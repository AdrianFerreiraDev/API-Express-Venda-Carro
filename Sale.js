import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema(
    {
       userId: String,
       carId: String,
       value: Number,
       paymentMethod: String,
       saleDate: String,
       status: String
    },
    {collection: "users"}
);

export default mongoose.model("Sale", SaleSchema);