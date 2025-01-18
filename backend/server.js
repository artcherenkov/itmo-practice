require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Подключение к MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};
connectDB();

// Простая модель для глоссария
const GlossarySchema = new mongoose.Schema({
    term: {type: String, required: true},
    definition: {type: String, required: true},
    references: [String],
    relations: [{
        target: {type: mongoose.Schema.Types.ObjectId, ref: "Glossary"}, // ID связанного термина
        relationType: {type: String}, // Тип связи
    },],
});
const Glossary = mongoose.model("Glossary", GlossarySchema);

// CRUD API
app.get("/api/terms", async (req, res) => {
    try {
        const terms = await Glossary.find().populate("relations.target", "term definition");
        res.json(terms);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


app.post("/api/terms", async (req, res) => {
    const {term, definition, references, relations} = req.body;

    try {
        const newTerm = new Glossary({
            term, definition, references, relations: relations || [], // Поддержка связей
        });

        await newTerm.save();
        res.status(201).json(newTerm);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});


app.put("/api/terms/:id", async (req, res) => {
    const {relations} = req.body;

    try {
        // Найдите и обновите термин с учетом новых связей
        const updatedTerm = await Glossary.findByIdAndUpdate(req.params.id, {$set: {relations}}, {new: true});

        res.json(updatedTerm);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error.message});
    }
});

app.delete("/api/terms/:id", async (req, res) => {
    await Glossary.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
