require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors())

const initialData = [
    {
        "_id": "1",
        "term": "Программное обеспечение",
        "definition": "Центральный термин, объединяющий все элементы разработки программ.",
        "relations": [
            {
                "target": {
                    "_id": "2",
                    "term": "Frontend",
                    "definition": "Часть приложения, взаимодействующая с пользователем."
                },
                "relationType": "включает"
            },
            {
                "target": {
                    "_id": "3",
                    "term": "Backend",
                    "definition": "Часть приложения, отвечающая за серверную логику."
                },
                "relationType": "включает"
            },
            {
                "target": {
                    "_id": "4",
                    "term": "DevOps",
                    "definition": "Практика автоматизации разработки, тестирования и развертывания ПО."
                },
                "relationType": "связан с"
            }
        ]
    },
    {
        "_id": "2",
        "term": "Frontend",
        "definition": "Часть приложения, взаимодействующая с пользователем.",
        "relations": [
            {
                "target": {
                    "_id": "5",
                    "term": "React",
                    "definition": "JavaScript-библиотека для создания пользовательских интерфейсов."
                },
                "relationType": "использует"
            },
            {
                "target": {
                    "_id": "14",
                    "term": "Testing Library",
                    "definition": "Инструмент для тестирования пользовательских интерфейсов."
                },
                "relationType": "тестируется с"
            }
        ]
    },
    {
        "_id": "3",
        "term": "Backend",
        "definition": "Часть приложения, отвечающая за серверную логику.",
        "relations": [
            {
                "target": {
                    "_id": "7",
                    "term": "Node.js",
                    "definition": "Среда выполнения JavaScript для серверной разработки."
                },
                "relationType": "использует"
            },
            {
                "target": {
                    "_id": "9",
                    "term": "Database",
                    "definition": "Хранилище данных для приложения."
                },
                "relationType": "взаимодействует с"
            }
        ]
    },
    {
        "_id": "4",
        "term": "DevOps",
        "definition": "Практика автоматизации разработки, тестирования и развертывания ПО.",
        "relations": [
            {
                "target": {
                    "_id": "10",
                    "term": "Docker",
                    "definition": "Инструмент для создания и управления контейнерами."
                },
                "relationType": "использует"
            },
            {
                "target": {
                    "_id": "11",
                    "term": "Kubernetes",
                    "definition": "Система оркестрации контейнеров."
                },
                "relationType": "работает с"
            },
            {
                "target": {
                    "_id": "15",
                    "term": "CI/CD",
                    "definition": "Автоматизация интеграции и доставки."
                },
                "relationType": "связана с"
            }
        ]
    },
    {
        "_id": "5",
        "term": "React",
        "definition": "JavaScript-библиотека для создания пользовательских интерфейсов.",
        "relations": [
            {
                "target": {
                    "_id": "6",
                    "term": "CSS",
                    "definition": "Язык для описания стилей элементов на веб-странице."
                },
                "relationType": "связан с"
            },
            {
                "target": {
                    "_id": "7",
                    "term": "Node.js",
                    "definition": "Среда выполнения JavaScript для серверной разработки."
                },
                "relationType": "работает с"
            }
        ]
    },
    {
        "_id": "6",
        "term": "CSS",
        "definition": "Язык для описания стилей элементов на веб-странице.",
        "relations": []
    },
    {
        "_id": "7",
        "term": "Node.js",
        "definition": "Среда выполнения JavaScript для серверной разработки.",
        "relations": [
            {
                "target": {
                    "_id": "12",
                    "term": "Deno",
                    "definition": "Современный рантайм для JavaScript и TypeScript."
                },
                "relationType": "альтернатива"
            },
            {
                "target": {
                    "_id": "13",
                    "term": "Bun",
                    "definition": "Быстрый рантайм для JavaScript с поддержкой встроенного пакетного менеджера."
                },
                "relationType": "альтернатива"
            }
        ]
    },
    {
        "_id": "8",
        "term": "Express",
        "definition": "Фреймворк для создания серверных приложений.",
        "relations": []
    },
    {
        "_id": "9",
        "term": "Database",
        "definition": "Хранилище данных для приложения.",
        "relations": [
            {
                "target": {
                    "_id": "16",
                    "term": "Unit Tests",
                    "definition": "Модульное тестирование баз данных."
                },
                "relationType": "тестируется с"
            }
        ]
    },
    {
        "_id": "10",
        "term": "Docker",
        "definition": "Инструмент для создания и управления контейнерами.",
        "relations": [
            {
                "target": {
                    "_id": "11",
                    "term": "Kubernetes",
                    "definition": "Система оркестрации контейнеров."
                },
                "relationType": "работает с"
            }
        ]
    },
    {
        "_id": "11",
        "term": "Kubernetes",
        "definition": "Система оркестрации контейнеров.",
        "relations": []
    },
    {
        "_id": "12",
        "term": "Deno",
        "definition": "Современный рантайм для JavaScript и TypeScript.",
        "relations": []
    },
    {
        "_id": "13",
        "term": "Bun",
        "definition": "Быстрый рантайм для JavaScript с поддержкой встроенного пакетного менеджера.",
        "relations": []
    },
    {
        "_id": "14",
        "term": "Testing Library",
        "definition": "Инструмент для тестирования пользовательских интерфейсов.",
        "relations": []
    },
    {
        "_id": "15",
        "term": "CI/CD",
        "definition": "Автоматизация интеграции и доставки.",
        "relations": []
    },
    {
        "_id": "16",
        "term": "Unit Tests",
        "definition": "Модульное тестирование баз данных.",
        "relations": []
    }
]


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

// Очистка базы данных
app.delete("/api/clear", async (req, res) => {
    try {
        await Glossary.deleteMany({});
        res.status(200).json({ message: "База данных успешно очищена" });
    } catch (error) {
        console.error("Ошибка при очистке базы данных:", error.message);
        res.status(500).json({ message: "Ошибка при очистке базы данных", error: error.message });
    }
});

app.post("/api/seed", async (req, res) => {
    try {
        // Очистка базы данных перед добавлением новых данных
        await Glossary.deleteMany({});

        // Добавляем термины с обработкой связей
        const terms = await Promise.all(
            initialData.map(async (item) => {
                const term = new Glossary({
                    term: item.term,
                    definition: item.definition,
                    references: [],
                    relations: [] // Связи добавляются отдельно
                });
                return await term.save();
            })
        );

        // Обновляем связи между терминами
        for (const item of initialData) {
            const sourceTerm = terms.find((t) => t.term === item.term);
            for (const relation of item.relations) {
                const targetTerm = terms.find((t) => t.term === relation.target.term);
                if (targetTerm) {
                    sourceTerm.relations.push({
                        target: targetTerm._id,
                        relationType: relation.relationType
                    });
                }
            }
            await sourceTerm.save();
        }

        res.status(201).json({ message: "Начальные данные успешно добавлены", terms });
    } catch (error) {
        console.error("Ошибка при добавлении начальных данных:", error.message);
        res.status(500).json({ message: "Ошибка при добавлении начальных данных", error: error.message });
    }
});

// Роут для получения отформатированных данных
app.get("/api/terms/pretty", async (req, res) => {
    try {
        // Получаем термины из базы данных с заполнением связей
        const terms = await Glossary.find().populate("relations.target", "term definition");

        // Функция для преобразования данных
        const mapDataToNodesAndEdges = (data) => {
            const initialNodes = [];
            const initialEdges = [];

            // Создаем узлы
            data.forEach((item) => {
                initialNodes.push({
                    id: item._id,
                    data: { label: item.term },
                    position: { x: Math.random() * 800, y: Math.random() * 600 }, // Случайные позиции
                });

                // Создаем связи
                item.relations.forEach((relation) => {
                    initialEdges.push({
                        id: `e${item._id}-${relation.target._id}`,
                        source: item._id,
                        target: relation.target._id,
                        animated: true,
                        label: relation.relationType,
                    });
                });
            });

            return { initialNodes, initialEdges };
        };

        // Преобразуем данные
        const formattedData = mapDataToNodesAndEdges(terms);

        res.status(200).json(formattedData);
    } catch (error) {
        console.error("Ошибка при форматировании данных:", error.message);
        res.status(500).json({ message: "Ошибка при форматировании данных", error: error.message });
    }
});


// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
