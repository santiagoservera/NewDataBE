import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({
      required_error: "El nombre de usuario es obligatorio",
    })
    .min(3, {
      message: "El nombre de usuario debe tener al menos 3 caracteres",
    })
    .max(20),

  surname: z
    .string({
      required_error: "El apellido es obligatorio",
    })
    .min(3, {
      message: "El apellido debe tener al menos 3 caracteres",
    })
    .max(20),

  email: z
    .string({
      required_error: "El email es obligatorio",
    })
    .email({
      message: "El email no es valido",
    }),

  password: z
    .string({
      required_error: "La contraseña es obligatoria",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    })
    .max(20, {
      message: "La contraseña no debe tener mas de 20 caracteres",
    }),
  rol: z.string({
    required_error: "El rol es obligatorio",
  }),
  numero: z.number({
    required_error: "El numero es obligatorio",
  }),
  date: z.string().datetime().optional(),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "El email es obligatorio",
    })
    .email({
      message: "El email no es valido",
    }),

  password: z.string({
    required_error: "La contraseña es obligatoria",
  }),
});
