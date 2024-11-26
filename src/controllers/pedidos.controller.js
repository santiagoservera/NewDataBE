import Pedidos from "../models/pedido.models.js";

export const obtenerPedidos = async (req, res) => {
  const pedidos = await Pedidos.find({
    user: req.user.id,
  }).populate("user");
  res.json(pedidos);
};

export const obtenerTodosLosPedidos = async (req, res) => {
  try {
    // Obtener los parámetros de consulta (query params)
    const { estado, logistica, fechaInicio, fechaFin } = req.query;

    // Crear un objeto con los filtros
    const filtros = {};

    // Agregar filtros basados en los parámetros de la consulta
    if (estado) filtros.estado = estado;
    if (logistica) filtros.logistica = logistica; // Filtrar por ID de usuario
    if (fechaInicio && fechaFin) {
      filtros.date = {
        $gte: new Date(fechaInicio), // mayor o igual a la fecha de inicio
        $lte: new Date(fechaFin), // menor o igual a la fecha de fin
      };
    }

    // Obtener los pedidos con los filtros
    const pedidos = await Pedidos.find(filtros).populate(
      "user",
      "name surname numero email"
    );

    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los pedidos" });
  }
};

export const crearPedido = async (req, res) => {
  const { title, description, date, logistica } = req.body;
  const nuevoPedido = new Pedidos({
    title,
    description,
    date,
    user: req.user.id,
    estado: "pendiente",
    logistica,
  });
  const pedidoGuardado = await nuevoPedido.save();
  res.json(pedidoGuardado);
};

export const obtenerPedido = async (req, res) => {
  const pedido = await Pedidos.findById(req.params.id);
  if (!pedido) return res.status(404).json({ mensaje: "Pedido no encontrado" });
  res.json(pedido);
};

export const eliminarPedido = async (req, res) => {
  const pedido = await Pedidos.findByIdAndDelete(req.params.id);
  if (!pedido) return res.status(404).json({ mensaje: "Pedido no encontrado" });
  return res.sendStatus(204, { mensaje: "Pedido eliminado" });
};

export const actualizarPedido = async (req, res) => {
  const pedido = await Pedidos.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!pedido) return res.status(404).json({ mensaje: "Pedido no encontrado" });
  res.json(pedido);
};
