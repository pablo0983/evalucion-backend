const { response } = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../models/db");

const createUser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);    
    req.body.password = bcrypt.hashSync(req.body.password, salt);

    const newUser = await User.create(req.body);
    console.log(newUser);

    newUser.password = undefined;

    return res.status(201).json({
      ok: true,
      msg: "Usuario creado correctamente",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error al crear el usuario",
      data: null,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if(!user){
        return res.status(400).json({
            ok: false,
            msg: 'El usuario no existe',
            data: null
        });
    }

    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if(!validPassword){
        return res.status(400).json({
            ok: false,
            msg: 'Contraseña incorrecta',
            data: null
        });
    }

    user.password = undefined;

    return res.status(200).json({
        ok: true,
        msg: 'Inicio de sesión correcto',
        data: user
    });


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
      data: null,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
};
