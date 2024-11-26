import dotenv from "dotenv";
dotenv.config(); // Carga las variables de entorno

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Conéctate a MongoDB usando el valor de la variable de entorno
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error(
        "La URI de MongoDB no está definida. Verifica el archivo .env"
      );
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a la base de datos de MongoDB!");
  } catch (error) {
    console.error("Error al conectar a la base de datos de MongoDB:", error);
  }
};
