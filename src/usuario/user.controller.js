import { response, request } from 'express';
import bcryptjs from 'bcryptjs';
import User from './user.model.js';
import { generarJWT } from '../helpers/generate-jwt.js'

export const userPost = async (req, res) => {
  const { nombre, email, contra } = req.body;
  const user = new User({ nombre, email, contra });

  const salt = bcryptjs.genSaltSync();
  user.contra = bcryptjs.hashSync(contra, salt);

  await user.save();
  res.status(200).json({ user });
};


export const userGet = async (req, res) => {
  const { limite, desde } = req.query;
  const query = { estado: true};

  const [total, user] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
  ]);

  res.status(200).json({
      total,
      user
  });
} 

export const userLogin = async (req, res) => {
  const { email, contra } = req.body;

  try {
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(400).json({
              msg: 'Usuario no encontrado'
          });
      }
      if (!user.estado) {
          return res.status(400).json({
              msg: 'Usuario borrado de la base de datos'
          })
      }
      const contraValida = bcryptjs.compareSync(contra, user.contra);

      if (!contraValida) {
          return res.status(400).json({
              msg: 'Contraseña incorrecta'
          });
      }
      const token = await generarJWT(user.id)

      res.status(200).json({
          msg_1: 'Inicio sesión exitosamente',
          msg_2: 'Bienvenido: ' + user.nombre,
          msg_3: 'token: ' + token,
      });
  } catch (e) {
      console.log(e);
      res.status(500).json({
          msg: 'Error, consultar con admin'
      })
  }

}
