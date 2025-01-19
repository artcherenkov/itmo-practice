module.exports = {
    apps: [
        {
            name: "backend", // Название процесса
            script: "server.js", // Основной файл приложения
            instances: "max", // Использовать все доступные ядра
            exec_mode: "cluster", // Кластерный режим
            watch: false, // Отключение наблюдения за изменениями
        },
    ],
};
