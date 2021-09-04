class ErrorHandler extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;

        // синтаксис вимагає саме такого запису
        // captureStackTrace - ф-ція яка видає на якому саме єтапі сталась помилка
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;

// В стандартному Error можно передати лише месседж, а статус не можна, для цього і потрібний кастомний ерорхендлер
