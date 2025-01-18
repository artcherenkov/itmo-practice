export const data = [
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
