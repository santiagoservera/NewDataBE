import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  obtenerPedido,
  crearPedido,
  obtenerPedidos,
  eliminarPedido,
  actualizarPedido,
  obtenerTodosLosPedidos,
} from "../controllers/pedidos.controller.js";
import { crearPedidoSchema } from "../schemas/pedido.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router();
router.get("/pedidos/all", authRequired, obtenerTodosLosPedidos);
router.get("/pedidos", authRequired, obtenerPedidos);
router.get("/pedidos/:id", authRequired, obtenerPedido);

router.post(
  "/pedidos",
  authRequired,
  validateSchema(crearPedidoSchema),
  crearPedido
);

router.delete("/pedidos/:id", authRequired, eliminarPedido);

router.put("/pedidos/:id", authRequired, actualizarPedido);

export default router;
