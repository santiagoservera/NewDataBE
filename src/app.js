import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import pedidosRoutes from "./routes/pedidos.routes.js";
const app = express();

const allowedOrigins = [
  "http://localhost:5173", // Para desarrollo
  "https://new-data-fe-rmm9.vercel.app", // Para producción
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origen no permitido por CORS"));
      }
    },
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/auth", pedidosRoutes);
export default app;
