require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors())

const initialData = [
    {
        term: "Веб-разработка",
        definition: "Веб-разработка — это процесс проектирования, создания и обслуживания веб-сайтов и веб-приложений, доступных через интернет. Она включает разработку клиентской части (frontend) и серверной части (backend), с использованием таких технологий, как HTML, CSS, JavaScript и различные базы данных.",
        relations: [
            { target: { term: "Frontend" }, relationType: "включает" },
            { target: { term: "Backend" }, relationType: "включает" },
            { target: { term: "Базы данных" }, relationType: "включает" },
            { target: { term: "Тестирование" }, relationType: "включает" },
            { target: { term: "Деплой" }, relationType: "включает" }
        ]
    },
    {
        term: "Frontend",
        definition: "Frontend-разработка, также известная как клиентская разработка, включает создание визуальных и интерактивных элементов веб-сайтов или веб-приложений, с которыми непосредственно взаимодействуют пользователи. Для этого используются такие технологии, как HTML, CSS и JavaScript.",
        relations: [
            { target: { term: "HTML" }, relationType: "зависит от" },
            { target: { term: "CSS" }, relationType: "использует" },
            { target: { term: "JavaScript" }, relationType: "использует" }
        ]
    },
    {
        term: "Backend",
        definition: "Backend в веб-разработке относится к серверной части веб-приложения, которая обрабатывает данные, бизнес-логику и интеграцию с базами данных. Он обеспечивает динамическое и безопасное взаимодействие между клиентской частью и серверной инфраструктурой. Он действует как посредник между интерфейсом клиентской части и серверной инфраструктурой, обеспечивая динамическое и безопасное взаимодействие.",
        relations: [
            { target: { term: "Node.js" }, relationType: "зависит от" },
            { target: { term: "Express" }, relationType: "использует" },
            { target: { term: "REST API" }, relationType: "создаёт" }
        ]
    },
    {
        term: "Базы данных",
        definition: "Базы данных выступают в качестве серверной части веб-приложений, обеспечивая хранение, извлечение и управление данными. Они играют ключевую роль в динамической подаче контента и взаимодействии с пользователями.",
        relations: [
            { target: { term: "MongoDB" }, relationType: "используется как" },
            { target: { term: "SQL" }, relationType: "альтернатива" },
            { target: { term: "Redis" }, relationType: "кэширует" }
        ]
    },
    {
        term: "Тестирование",
        definition: "Тестирование веб-приложений включает проверку функциональности, удобства использования, производительности, безопасности и совместимости на различных платформах и в браузерах. Оно гарантирует, что приложения являются удобными для пользователей, надежными и масштабируемыми.",
        relations: [
            { target: { term: "Unit-тестирование" }, relationType: "включает" },
            { target: { term: "End-to-End тестирование" }, relationType: "включает" },
            { target: { term: "Jest" }, relationType: "использует" }
        ]
    },
    {
        term: "Деплой",
        definition: "Деплой в современной веб-разработке означает процесс переноса программного приложения из среды разработки в рабочую (продакшн). Часто он включает автоматизацию таких задач, как настройка серверов, установка приложений и пост-деплойное тестирование для обеспечения бесперебойной работы и доступности для пользователей.",
        relations: [
            { target: { term: "Docker" }, relationType: "упрощает" },
            { target: { term: "Nginx" }, relationType: "обрабатывает запросы" },
            { target: { term: "CI/CD" }, relationType: "автоматизирует" }
        ]
    },
    {
        term: "HTML",
        definition: "HTML (язык гипертекстовой разметки) — это базовый язык для структурирования контента в интернете. Он предоставляет каркас для организации текста, изображений, ссылок и других мультимедийных элементов, позволяя браузерам отображать веб-страницы для взаимодействия пользователей.",
        relations: []
    },
    {
        term: "CSS",
        definition: "CSS (каскадные таблицы стилей) играет важную роль в современной веб-разработке, позволяя разработчикам эффективно стилизовать и компоновать веб-страницы.Оно обеспечивает разделение контента и представления, предоставляя расширенный контроль над элементами дизайна, такими как шрифты, цвета, интервалы и макеты.",
        relations: []
    },
    {
        term: "JavaScript",
        definition: "JavaScript — это универсальный и широко используемый язык программирования, который позволяет создавать интерактивные и динамичные веб-приложения. Он поддерживает разработку как на стороне клиента, так и на стороне сервера, а также интеграцию с HTML и CSS для создания отзывчивых и ориентированных на пользователя интерфейсов.",
        relations: []
    },
    {
        term: "Node.js",
        definition: "Node.js — это среда выполнения, которая позволяет разработчикам выполнять JavaScript-код на стороне сервера, обеспечивая возможность полной веб-разработки с использованием одного языка программирования. Она известна своей событийно-ориентированной, неблокирующей моделью ввода-вывода, что делает ее идеальной для создания масштабируемых и интенсивных по данным приложений.",
        relations: []
    },
    {
        term: "Express",
        definition: "Express.js — это легковесный и гибкий фреймворк для Node.js, предоставляющий инструменты и функции для создания веб-приложений и API. Он упрощает управление маршрутизацией, middleware и HTTP-запросами, позволяя создавать модульные приложения.",
        relations: []
    },
    {
        term: "REST API",
        definition: "REST API (интерфейс программирования приложений на основе архитектурного стиля REST) позволяет взаимодействовать с веб-службами через статeless-операции с использованием стандартных HTTP-методов. Он обеспечивает легковесный и масштабируемый способ взаимодействия систем, часто используя форматы JSON или XML для обмена данными.",
        relations: []
    },
    {
        term: "MongoDB",
        definition: "NoSQL база данных, разработанная для гибкости и масштабируемости, использующая модель, ориентированную на документы, для хранения данных в структурах, подобных JSON. Она широко используется в современной веб-разработке благодаря способности эффективно обрабатывать масштабируемые, динамичные и неструктурированные данные.",
        relations: []
    },
    {
        term: "SQL",
        definition: "SQL (язык структурированных запросов) — это стандартный язык программирования, используемый для управления и манипулирования реляционными базами данных. Он позволяет разработчикам выполнять запросы, вставлять, обновлять и удалять данные, что делает его основным инструментом для управления структурированными данными в веб-приложениях.",
        relations: []
    },
    {
        term: "Redis",
        definition: "Redis — это хранилище структур данных в оперативной памяти, используемое в качестве базы данных, кэша и брокера сообщений. Его высокая производительность и поддержка хранения в формате ключ-значение делают его идеальным для реальных приложений, таких как системы чатов, таблицы лидеров в играх и управление сессиями в веб-разработке.",
        relations: []
    },
    {
        term: "Unit-тестирование",
        definition: "Модульное тестирование — это метод тестирования программного обеспечения, который направлен на проверку функциональности отдельных компонентов или модулей кода. Оно обеспечивает выполнение каждой единицы в соответствии с ожиданиями, изолируя ее от других частей приложения, чтобы выявлять и устранять дефекты на ранних этапах разработки.",
        relations: []
    },
    {
        term: "End-to-End тестирование",
        definition: "Интеграционное тестирование (End-to-End) проверяет полное выполнение рабочего процесса приложения от начала до конца, гарантируя, что все интегрированные компоненты работают так, как ожидается. Оно имитирует реальные сценарии использования, охватывая как фронтенд, так и бэкенд системы.",
        relations: []
    },
    {
        term: "Jest",
        definition: "Jest — это фреймворк тестирования JavaScript, разработанный для упрощения, скорости и масштабируемости, в первую очередь используемый для тестирования приложений на React. Он включает такие функции, как встроенный тестовый раннер, возможности для создания моков и анализ покрытия кода, что способствует эффективным процессам тестирования.",
        relations: []
    },
    {
        term: "Docker",
        definition: "Docker — это платформа, которая позволяет разработчикам создавать, распространять и запускать приложения в легковесных контейнерах. Эти контейнеры инкапсулируют все зависимости, обеспечивая согласованное поведение в разных средах и упрощая развертывание и масштабирование в современной веб-разработке.",
        relations: []
    },
    {
        term: "Nginx",
        definition: "NGINX — это высокопроизводительный веб-сервер, обратный прокси и балансировщик нагрузки, используемый в современной веб-разработке для управления взаимодействием клиент-сервер. Он оптимизирует использование ресурсов, эффективно обрабатывает параллельные подключения и поддерживает функции, такие как кэширование и завершение SSL.",
        relations: []
    },
    {
        term: "CI/CD",
        definition: "CI/CD (непрерывная интеграция и непрерывное развертывание) — это практика DevOps, автоматизирующая интеграцию изменений в коде и их развертывание в продакшн. Она улучшает разработку программного обеспечения, позволяя выполнять частые, надежные обновления, сокращая ручной труд и увеличивая скорость доставки.",
        relations: []
    }
];

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
            const nodes = [];
            const edges = [];

            // Создаем узлы
            data.forEach((item) => {
                nodes.push({
                    id: item._id,
                    data: { label: item.term },
                    position: { x: Math.random() * 800, y: Math.random() * 600 }, // Случайные позиции
                });

                // Создаем связи
                item.relations.forEach((relation) => {
                    edges.push({
                        id: `e${item._id}-${relation.target._id}`,
                        source: item._id,
                        target: relation.target._id,
                        animated: true,
                        label: relation.relationType,
                    });
                });
            });

            return { nodes, edges };
        };

        // Преобразуем данные
        const formattedData = mapDataToNodesAndEdges(terms);

        res.status(200).json(formattedData);
    } catch (error) {
        console.error("Ошибка при форматировании данных:", error.message);
        res.status(500).json({ message: "Ошибка при форматировании данных", error: error.message });
    }
});

// Роут для получения данных в формате: id, title, description
app.get("/api/terms/glossary", async (req, res) => {
    try {
        // Получаем все термины из базы данных
        const terms = await Glossary.find({}, "_id term definition");

        // Преобразуем термины в нужный формат
        const formattedTerms = terms.map((term) => ({
            id: term._id,
            title: term.term,
            description: term.definition,
        }));

        res.status(200).json(formattedTerms);
    } catch (error) {
        console.error("Ошибка при получении терминов:", error.message);
        res.status(500).json({ message: "Ошибка при получении данных", error: error.message });
    }
});


// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
