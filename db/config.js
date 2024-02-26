const { mongoose } = require('console');
const e = require('cors');
const mongoose = require('mongoose');

const dbConection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {});
        console.log("Base datos conectada existosamente");
    } catch (error) {
        throw new Error('Erro al tratar de conectarse a la base de datos', e);
    }
};

module.exports = {
    dbConection
}