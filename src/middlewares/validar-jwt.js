import jwt from 'jsonwebtoken';
import Usuario from '../usuario/user.model.js';

export const validarJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(uid);
    console.log(usuario);
    if (!usuario) {
      return res.status(401).json({
        msg: "Usuario no existe en la base de datos",
      });
    }
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no válido - usuario con estado:false",
      });
    }
    req.usuario = usuario;
    next();
  } catch (e) {
    console.log(e),
      res.status(401).json({
        msg: "Token no válido",
      });
  }
};

