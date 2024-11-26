import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  const {
    name,
    surname,
    email,
    password,
    rol = "user",
    numero,
    date,
  } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json(["El usuario ya existe"]);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Crea el nuevo usuario con el rol especificado o "user" por defecto
    const newUser = new User({
      name,
      surname,
      email,
      password: passwordHash,
      rol,
      numero,
      date,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({
      id: userSaved._id,
    });
    res.cookie("token", token);

    res.json({
      id: userSaved._id,
      name: userSaved.name,
      surname: userSaved.surname,
      email: userSaved.email,
      rol: userSaved.rol,
      numero: userSaved.numero,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
      date,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(400).json({ error: "No existe el usuario" });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    const token = await createAccessToken({
      id: userFound._id,
    });
    res.cookie("token", token);

    res.json({
      id: userFound._id,
      name: userFound.name,
      surname: userFound.surname,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
      rol: userFound.rol,
      numero: userFound.numero,
      date: userFound.date,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  res.json({ message: "Sesión cerrada con éxito" });
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) {
    return res.status(400).json({ error: "Usuario no encontrado" });
  }
  return res.json({
    id: userFound._id,
    name: userFound.name,
    surname: userFound.surname,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
    rol: userFound.rol,
    numero: userFound.numero,
    date: userFound.date,
  });
  res.send("profile");
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: "No se encontró el token" });
  }

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ error: "Token inválido" });
    const userFound = await User.findById(user.id);
    if (!userFound) {
      return res.status(400).json({ error: "Usuario no autorizado" });
    }
    return res.json({
      id: userFound._id,
      name: userFound.name,
      surname: userFound.surname,
      numero: userFound.numero,
      email: userFound.email,
      rol: userFound.rol,
      date: userFound.date,
    });
  });
};
