import { date, z } from "zod";

export const crearPedidoSchema = z.object({
  title: z.string({
    required_error: "El titulo es obligatorio",
  }),
  description: z.string({
    required_error: "La descripcion es obligatoria",
  }),
  estado: z.string().optional(),

  date: z.string().datetime().optional(),
  logistica: z.string().optional(),
});
