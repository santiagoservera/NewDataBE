import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mern-crud-auth");
    console.log("Conectado a la base de datos de MongoDB!");
  } catch (error) {
    console.error("Error al conectar a la base de datos de MongoDB:", error);
  }
};
