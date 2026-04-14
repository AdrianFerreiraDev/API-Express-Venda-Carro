import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Car from "./Car.js"

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado com o MONGODB");
    } catch (error) {
        console.log("Erro:", error);
    }
}

connectDB();

app.post("/cars", async (req, res) => {
    try {
        const newCar = await Car.create(req.body);
        res.json(newCar)
    } catch (error) {
        req.json({ error: error.message })
    }
})

app.get("/cars", async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.get("/cars/:id", async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        res.json(car);
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.put("/cars/:id", async (req, res) => {
    try {
        const updateCar = await Car.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        const updatedCar = await Car.findById(req.params.id);
        res.json(updatedCar);
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.delete("/cars/:id", async (req, res) => {
    try {
        const deleteCar = await Car.findByIdAndDelete(req.params.id,);
        res.json(deleteCar);
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.get("/cars/brand/:brand", async (req, res) => {
    try {
        const car = await Car.findOne({ brand: req.params.brand });
        res.json(car);
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.get("/cars/search/available", async (req, res) => {
    try {
        const availableCars = await Car.find({ available: true });
        res.json(availableCars);
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.patch("/cars/:id/availability", async (req, res) => {
    try {
        const updateCar = await Car.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        res.json(updateCar)
    } catch (error) {
        res.json({error: error.message});
    }
})

app.get("/cars/price/:min/:max", async (req, res) => {
    try {
        const cars = await Car.find(
            { price: {$gte: req.params.min, $lte: req.params.max} }
        )

        res.json(cars);
    } catch (error) {
        res.json({ error: error.message})
    }
})

app.get("/cars/plate/:plate", async (req, res) => {
    try {
        const car = await Car.findOne({ plate: req.params.plate });
        res.json(car);
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.get("/cars/available/count", async (req, res) => {
    try {
        const availableCarsCount = await Car.countDocuments({ available: true });
        res.json(availableCarsCount);
    } catch (error) {
        res.json({ error: error.message });
    }
})


app.listen(PORT, () => {
    console.log("O servidor está rodando na porta:", PORT);
})