'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js';
import userRoutes from '../src/usuario/user.routes.js';
import empresasRoutes from '../src/empresas/empresas.routes.js';
import empresaReporte from '../src/empresas/empresaReporte.js';

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/v1/users'
        this.empresasPath = '/api/v1/empresa'
        this.reportePath = '/empresaAPI/v1/report';


        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.usuarioPath, userRoutes);
        this.app.use(this.empresasPath, empresasRoutes);
        this.app.use(this.reportePath, empresaReporte);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo', this.port);
        });
    }
}

export default Server;