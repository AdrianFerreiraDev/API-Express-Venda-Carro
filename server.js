import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Car from "./Car.js"
import User from "./User.js"
import Sale from "./Sale.js"

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
            { available: req.body.available },
            { new: true }
        )
        res.json(updateCar)
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.get("/cars/price/:min/:max", async (req, res) => {
    try {
        const cars = await Car.find(
            { price: { $gte: req.params.min, $lte: req.params.max } }
        )

        res.json(cars);
    } catch (error) {
        res.json({ error: error.message })
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


app.post("/users", async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.put("/users/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        res.json(updatedUser);
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.delete("/users/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.json(deletedUser);
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.get("/users/email/:email", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        res.json(user);
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.get("/users/search/count", async (req, res) => {
    try {
        const usersCount = await User.countDocuments();
        res.json(usersCount);
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.patch("/users/:id/name", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true }
        );
        res.json(updatedUser);
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.get("/users/exists/:email", async (req, res) => {
    try {
        let user = await User.exists({ email: req.params.email });
        if(user) {
            user = true;
        }
        res.json(user);
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.get("/users/search/:name", async (req, res) => {
    try {
        const user = await User.findOne({ name: req.params.name });
        res.json(user);
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.delete("/users", async (req, res) => {
    try {
        const deletedUsers = await User.deleteMany({});
        res.json(deletedUsers);
    } catch (error) {
        res.json({ error: error.message });
    }
})



app.post("/sales", async (req, res) => {
    try {
        const newSale = await Sale.create(req.body);
        let updateCarAvailability = await Car.findByIdAndUpdate(
            newSale.carId,
            { available: false }
        );
        res.json(newSale);
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.get("/sales", async (req, res) => {
    try {
        const sales = await Sale.find();
        res.json(sales);
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.get("/sales/:id", async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id);
        res.json(sale);
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.put("/sales/:id", async (req, res) => {
    try {
        const updatedSale = await Sale.findByIdAndUpdate(
            req.params.id,
            req.body
        )

        res.json(updatedSale);
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.delete("/sales/:id", async (req, res) => {
    try {
        const deletedSale = await Sale.findByIdAndDelete(req.params.id);
        res.json(deletedSale);
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.get("/sales/user/:userId", async (req, res) => {
    try {
        const userSales = await Sale.find({ userId: req.params.userId });
        res.json(userSales);
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.get("/sales/car/:carId", async (req, res) => {
    try {
        const carSales = await Sale.find({ carId: req.params.carId });
        res.json(carSales);
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.patch("/sales/:id/status", async (req, res) => {
    try {
        const updatedSale = await Sale.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status }
        )
        res.json(updatedSale)
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.get("/sales/value/:min/:max", async (req, res) => {
    try {
        const sales = await Sale.find(
            { value: { $gte: req.params.min, $lte: req.params.max } }
        )

        res.json(sales);
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.get("/sales/date/:date", async (req, res) => {
    try {
        const sales = await Sale.find({ saleDate: req.params.date });
        res.json(sales)
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.get("/sales/search/count", async (req, res) => {
    try {
        const salesCount = await Sale.countDocuments();
        res.json(salesCount);
    } catch (error) {
        res.json({ error: error.message })
    }
})




app.listen(PORT, () => {
    console.log("O servidor está rodando na porta:", PORT);
})