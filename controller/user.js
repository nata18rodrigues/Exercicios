const model = require('../model/user')
const controllerUser = {

  index: function (req, res) {
    return res.json(model.banco)
  },
  //----------------------
  create: function (req, res) {

    const pesquisa = model.banco.find(item => item.usuario == req.body.usuario);

    if (pesquisa) {
      return res.json({
        message: "Nome de usuario ja cadastrado",
      });
    }

    model.id = model.id + 1;
    model.banco.push({
      "usuario": req.body.usuario,
      "senha": req.body.senha,
      "id": model.id
    });

    return res.json({
      message: "Usuario Cadastrado com sucesso",
    });

  },
  //----------------------
  destroy: function (req, res) {
    const indice_encontrado = model.banco.findIndex(item => {
      if (item.id == req.params.id) {
        return true;
      }
      return false;
    })
    if (indice_encontrado >= 0) {
      model.banco.splice(indice_encontrado, 1);
      return res.json({
        message: "conta removida com sucesso"
      });
    }
    return res.json({
      message: "conta não cadastrada"
    });

  },
  //----------------------
  update: function (req, res) {

    const indice_encontrado = model.banco.findIndex(item => {
      if (item.id == req.params.id) {
        return true;
      }
      return false;
    })
    if (indice_encontrado >= 0) {

      var altera_banco = model.banco.map((item) => {

        if (item.id == req.params.id) {
          return {
            "usuario": item.usuario,
            "senha": req.body.senha,
            "id": item.id
          };
        }
        return item;
      })
      model.banco = altera_banco;

      return res.json({
        message: "atualização realizada com sucesso"
      });
    }
    return res.json({
      message: "atualização não realizada com sucesso"
    });
  },
  //----------------------
  login: function (req, res) {

    const pesquisa = model.banco.find(item => item.usuario == req.body.usuario && item.senha == req.body.senha && item.id == req.body.id);

    if (!pesquisa) {
      return res.json({
        message: "Usuario não cadastrado",
      });
    }
    model.jwt.sign({ IdUsuario: req.body.id }, model.secret, { algorithm: 'HS256', expiresIn: "1m" }, function (err, token) {
      if (err) {
        throw new Error('ERR_INVALID_TOKEN');
      }//formatar menssagem de erro em json
      return res.json(token);
    })
  },
}

module.exports = controllerUser