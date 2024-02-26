const express = require('express');
const cors = require('cors');
const { dbConection } = require('../db/config');

class Server {
    constructor() {
        this.app = expressI();
        this.port = process.env.PORT;

        this.conectarDataBase();
    }

    async conectarDataBase() {
        await dbConection();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

module.exports = Server;