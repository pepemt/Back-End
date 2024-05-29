import Server from './provider/Server';
import {PORT,NODE_ENV} from './config'; // Si solo tiene el nombre de la carpeta, abre el index
import express from 'express';
import cors from 'cors';
import EmpleadoController from './controllers/EmpleadoController';
import ClienteController from './controllers/ClienteController';
import LlamadaController from './controllers/LlamadaController';
import ReporteController from './controllers/ReporteController';
import AuthenticationController from './controllers/AuthenticationController';

const server = new Server({
    port:PORT,
    env:NODE_ENV,
    middlewares:[
        express.json(),
        express.urlencoded({extended:true}),
        cors()
    ],
    controllers:[
        EmpleadoController.instance,
        ClienteController.instance,
        LlamadaController.instance,
        ReporteController.instance,
        AuthenticationController.instance
    ]
});


//Extendiendo la interfaz Request de Express para poder acceder a los datos del usuario
declare global {
    namespace Express {
        interface Request {
            user: string;
            token: string;
        }
    }
}


server.init();