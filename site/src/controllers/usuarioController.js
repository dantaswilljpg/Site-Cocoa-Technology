var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}
function cadastrar(req, res) {
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var cpf = req.body.cpfServer;
  var cnpj = req.body.cnpjServer;
  var cep = req.body.cepServer;
  var estado = req.body.estadoServer;
  var cidade = req.body.cidadeServer;
  var bairro = req.body.bairroServer;
  var numero = req.body.numeroServer;
  var complemento = req.body.complementoServer;

 
  

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
} else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
} else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
}
else if (cpf == undefined) {
  res.status(400).send("Seu email está undefined!");
} else if (cnpj == undefined) {
  res.status(400).send("Sua senha está undefined!");
}
else if (cep == undefined) {
  res.status(400).send("Seu email está undefined!");
} else if (estado == undefined) {
  res.status(400).send("Sua senha está undefined!");
}
else if (cidade == undefined) {
  res.status(400).send("Seu email está undefined!");
} else if (bairro == undefined) {
  res.status(400).send("Sua senha está undefined!");
}
else if (numero == undefined) {
  res.status(400).send("Seu email está undefined!");
} else if (complemento == undefined) {
  res.status(400).send("Sua senha está undefined!");
}

else {
    
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.cadastrar(nome, email, senha , cpf , cnpj , cep , estado , cidade , bairro , numero , complemento)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}
}





function cadastrar_plantacoes_usuario(req, res) {
    var nome = req.body.nomeServer;
    var temp_maxima = req.body.temp_maxServer;
    var umidade_maxima = req.body.umid_max_Server;
    var cep = req.body.cepServer;
    var cidade = req.body.cidadeServer;
    var numero = req.body.numeroServer
    var tamanho_plantacao = req.body.tamanho_plantacaoServer
    var temperatura_minima = req.body.temp_minServer
    var umidade_minima = req.body.umid_minServer
    var estado = req.body.estado_plantacaoServer;
    var bairro = req.body.bairroServer;
    var complemento = req.body.complementoServer;
    var id = req.body.idSever
  
  console.log(nome , temp_maxima , umidade_maxima , cep , cidade , numero , tamanho_plantacao , temperatura_minima , umidade_minima, 
    estado , bairro , complemento , id)
    if (nome == undefined) {
      res.status(400).send("Seu nome está undefined!");
  } else if (temp_maxima == undefined) {
      res.status(400).send("Seu email está undefined!");
  } else if (umidade_maxima == undefined) {
      res.status(400).send("Sua senha está undefined!");
  }
  else if (cep == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (cidade == undefined) {
    res.status(400).send("Sua senha está undefined!");
  }
  else if (numero == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (tamanho_plantacao == undefined) {
    res.status(400).send("Sua senha está undefined!");
  }
  else if (temperatura_minima == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (umidade_minima == undefined) {
    res.status(400).send("Sua senha está undefined!");
  }
  else if (estado == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (bairro == undefined) {
    res.status(400).send("Sua senha está undefined!");
  }
  else if (complemento == undefined) {
    res.status(400).send("Sua senha está undefined!");
  }
  else {
      
      // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
      usuarioModel.cadastrar_plantacoes_usuario(nome , temp_maxima , umidade_maxima , cep , cidade , numero , tamanho_plantacao ,
        temperatura_minima , umidade_minima , estado , bairro , complemento , id)
          .then(
              function (resultado) {
                  res.json(resultado);
              }
          ).catch(
              function (erro) {
                  console.log(erro);
                  console.log(
                      "\nHouve um erro ao realizar o cadastro! Erro: ",
                      erro.sqlMessage
                  );
                  res.status(500).json(erro.sqlMessage);
              }
          );
  }
  }
module.exports = {
  listar,
  entrar,
  cadastrar,
  cadastrar_plantacoes_usuario
};