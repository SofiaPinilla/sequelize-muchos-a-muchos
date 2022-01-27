const { User } = require("../models/index");
const bcrypt = require("bcryptjs");
const transporter = require("../config/nodemailer");
const jwt = require('jsonwebtoken')
const {jwt_secret} = require('../config/config.json')['development']

const UserController = {
  async create(req, res) {
    try {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({
        ...req.body,
        password: hash,
        confirmed: false,
        role: "user",
      });
      const emailToken = jwt.sign({email:req.body.email},jwt_secret,{expiresIn:'48h'})
      const url = 'http://localhost:3000/users/confirm/'+ emailToken
      await transporter.sendMail({
        to: req.body.email,
        subject: "Confirme su registro",
        html: `<h3>Bienvenido ${req.body.name}, estás a un paso de registrarte </h3>
        <a href="${url}"> Click para confirmar tu registro</a>
        `,
      });
      res.status(201).send({
        message: "Te hemos enviado un correo para confirmar el registro",
        user,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: "Ha habido un problema al intentar logearse",
      });
    }
  },
  login(req, res) {
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (!user) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }
      if (!user.confirmed) {
        return res.status(400).send({ message: "Debes confirmar tu correo" });
      }
      res.send({ message: "usuario logeado con éxito" });
    }).catch(err => console.error(err))
  },
  async confirm(req,res){
    try {
      const token = req.params.emailToken;
      const payload = jwt.verify(token,jwt_secret)
      const user = await User.update({confirmed:true},{
        where:{
          email: payload.email
        }
      })
      res.status(201).send("Usuario confirmado con exito" );
    } catch (error) {
      console.error(error)
    }
  },

};

module.exports = UserController;
