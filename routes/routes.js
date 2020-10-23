const express = require('express');
const routes = express.Router();
const userController = require('../controller/user');
const model = require('../model/user')

const autenticacao = function(req, res, next){ 
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    model.jwt.verify(token, model.secret, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      console.log(decoded);
      next();
    });
  }

routes.get("/dados", autenticacao, userController.index);
routes.post("/login", userController.login);
routes.post("/cadastro", userController.create);
routes.put("/atualizar/:id", autenticacao, userController.update);
routes.delete("/deletar/:id", autenticacao, userController.destroy);

module.exports = routes;