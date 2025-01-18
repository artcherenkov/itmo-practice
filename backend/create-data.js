// const axios = require("axios");
//
// const API_URL = "http://localhost:3000/api/terms"; // Замените на ваш URL
//
// // Термины и их описания
// const terms = {
//     "API": "Application Programming Interface",
//     "REST": "Representational State Transfer",
//     "HTTP": "Hypertext Transfer Protocol",
//     "TCP/IP": "Transmission Control Protocol / Internet Protocol",
//     "JSON": "JavaScript Object Notation",
//     "XML": "eXtensible Markup Language",
//     "OAuth 2.0": "Open Authorization standard",
//     "JWT": "JSON Web Token",
//     "Docker": "Containerization platform",
//     "Kubernetes": "Container orchestration system",
//     "PostgreSQL": "Relational database management system",
//     "MongoDB": "Document-oriented NoSQL database",
//     "SQL": "Structured Query Language",
//     "NoSQL": "Non-relational database",
//     "React": "JavaScript library for building UI",
//     "Node.js": "JavaScript runtime for server-side",
//     "Express": "Web framework for Node.js",
//     "CI/CD": "Continuous Integration and Delivery",
//     "GitHub Actions": "CI/CD platform for GitHub",
//     "Git": "Version control system",
// };
//
// async function addTerms() {
//     const termIds = {}; // Сохраним созданные термины и их IDs
//
//     console.log("Adding terms...");
//     for (const [term, definition] of Object.entries(terms)) {
//         try {
//             // Отправляем запрос на добавление термина
//             const response = await axios.post(API_URL, { term, definition });
//             termIds[term] = response.data._id; // Сохраняем ID добавленного термина
//             console.log(`Added term: ${term} (ID: ${termIds[term]})`);
//         } catch (error) {
//             console.error(`Error adding term: ${term}`, error.message);
//         }
//     }
//
//     console.log("\nAll terms have been added!");
//     return termIds; // Возвращаем объект с терминами и их IDs
// }
//
// // Запуск скрипта
// addTerms();

const axios = require("axios");

const API_URL = "http://localhost:3000/api/terms"; // Замените на ваш URL

// Сохраненные ID терминов (скопируйте их из вывода `addTermsOnly.js`)
const termIds = {
    "API": "678936270af70c0d46dbf4e7",
    "REST": "678936270af70c0d46dbf4e9",
    "HTTP": "678936270af70c0d46dbf4eb",
    "TCP/IP": "678936270af70c0d46dbf4ed",
    "JSON": "678936270af70c0d46dbf4ef",
    "XML": "678936270af70c0d46dbf4f1",
    "OAuth 2.0": "678936270af70c0d46dbf4f3",
    "JWT": "678936270af70c0d46dbf4f5",
    "Docker": "678936270af70c0d46dbf4f7",
    "Kubernetes": "678936270af70c0d46dbf4f9",
    "PostgreSQL": "678936270af70c0d46dbf4fb",
    "MongoDB": "678936270af70c0d46dbf4fd",
    "SQL": "678936270af70c0d46dbf4ff",
    "NoSQL": "678936270af70c0d46dbf501",
    "React": "678936270af70c0d46dbf503",
    "Node.js": "678936270af70c0d46dbf505",
    "Express": "678936270af70c0d46dbf507",
    "CI/CD": "678936270af70c0d46dbf509",
    "GitHub Actions": "678936270af70c0d46dbf50b",
    "Git": "678936270af70c0d46dbf50d",
};

// Связи между терминами
const relations = [
    {
        term: "API",
        relations: [
            { target: "REST", relationType: "связан с" },
            { target: "HTTP", relationType: "зависит от" },
        ],
    },
    {
        term: "REST",
        relations: [
            { target: "HTTP", relationType: "зависит от" },
            { target: "API", relationType: "является частью" },
        ],
    },
    {
        term: "HTTP",
        relations: [
            { target: "TCP/IP", relationType: "зависит от" },
            { target: "JSON", relationType: "характеризует" },
        ],
    },
    {
        term: "Docker",
        relations: [
            { target: "Kubernetes", relationType: "связан с" },
            { target: "API", relationType: "включает в себя" },
        ],
    },
    {
        term: "Kubernetes",
        relations: [
            { target: "Docker", relationType: "зависит от" },
            { target: "PostgreSQL", relationType: "включает в себя" },
        ],
    },
];

async function addRelations() {
    console.log("Adding relations...");
    for (const { term, relations: termRelations } of relations) {
        const termId = termIds[term];
        if (!termId) {
            console.error(`Term ID not found for: ${term}`);
            continue;
        }

        try {
            // Форматируем связи для отправки на сервер
            const formattedRelations = termRelations.map((rel) => ({
                target: termIds[rel.target],
                relationType: rel.relationType,
            }));

            // Отправляем PUT-запрос на обновление связей
            await axios.put(`${API_URL}/${termId}`, { relations: formattedRelations });
            console.log(`Added relations for term: ${term}`);
        } catch (error) {
            console.error(`Error adding relations for term: ${term}`, error.message);
        }
    }

    console.log("\nAll relations have been added!");
}

// Запуск скрипта
addRelations();
