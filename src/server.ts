import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec from "./config/swagger";

// Conectar base de datos
export async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.magenta('Conexion exitosa a la base de datos'))
    } catch (error) {
        // console.log()
        console.log(colors.red.bold('Hubo un error al conectarse a la base de datos'))
    }
}

connectDB()

// Instancia express
const server = express()

// Permitir conexiones
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL, // Desarrollo local
      process.env.API_URL, // Documentación local
    ].filter(Boolean); // Elimina valores undefined o vacíos

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
  },
};

server.use(cors(corsOptions))

// Leer datos de formularios
server.use(express.json())
server.use(morgan('dev'))
server.use('/api/products', router)

// Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

export default server