import mongoose from "mongoose";
import dotenv from "dotenv"; // Importar dotenv para cargar las variables de entorno

dotenv.config(); // Cargar las variables de entorno

export const connectDB = async () => {
  try {
    // Usar la URI de conexión de MongoDB Atlas desde el archivo .env
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a la base de datos de MongoDB!");
  } catch (error) {
    console.error("Error al conectar a la base de datos de MongoDB:", error);
  }
};
