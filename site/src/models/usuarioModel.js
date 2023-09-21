var database = require("../database/config");

function listar() {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor do seu BD está rodando corretamente. \n\n function listar()");
  var instrucao = `
    SELECT * FROM cliente;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function entrar(email, senha) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor do seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
  var instrucao = `
  select 'cliente' as tipo_cliente ,  cliente.idcliente as id,cliente.nome  as nome,  cliente.email as email, cliente.senha as senha,endereco.idendereco from cliente 
  join endereco on idendereco = fkendereco_cliente
  where cliente.email = '${email}' and cliente.senha = '${senha}'
  union
  select 'usuario' as tipo_cliente , usuario.idusuario as id ,usuario.nome as nome , usuario.email as email, usuario.senha as senha, endereco.idendereco  from usuario 
  join cliente  on idcliente = fkusuario_cliente
  join endereco on endereco.idendereco = cliente.fkendereco_cliente 
  where usuario.email = '${email}' and usuario.senha = '${senha}'; 
   `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrar(nome, email, senha, cpf, cnpj, cep, estado, cidade, bairro, numero, complemento) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor do seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, cpf, cnpj);

  var instrucao = `
    INSERT INTO cliente (nome, email, senha, cpf, cnpj) VALUES ('${nome}', '${email}', '${senha}', '${cpf}', '${cnpj}');
  `;

  var instrucaoEndereco = `
    INSERT INTO endereco (cep, estado, cidade, bairro, numero, complemento) VALUES ('${cep}', '${estado}', '${cidade}', '${bairro}', '${numero}', '${complemento}');
  `;
  console.log("Executando a instrução SQL: \n" + instrucao, instrucaoEndereco);

  return new Promise((resolve, reject) => {
    database.executar(instrucao)
      .then((resultado) => {
        var idUsuario = resultado.insertId;

        console.log("Executando a instrução SQL para cadastrar endereço: \n" + instrucaoEndereco);

        database.executar(instrucaoEndereco)
          .then((resultadoEndereco) => {
            var idEndereco = resultadoEndereco.insertId;

            var instrucaoAtualizacao = `
            UPDATE cliente SET fkEndereco_cliente = '${idEndereco}' WHERE idcliente = '${idUsuario}';`;
            console.log("Executando a instrução SQL para atualizar cliente com o id de endereço: \n" + instrucaoAtualizacao);
            database.executar(instrucaoAtualizacao)

              .then(() => {
                resolve(resultado);
              })
              .catch((erro) => {
                reject(erro);
              });
          })
          .catch((erro) => {
            reject(erro);
          });
      })
      .catch((erro) => {
        reject(erro);
      });
  });
}
function cadastrar_plantacoes_usuario(nome, temp_maxima, umidade_maxima, cep, cidade, numero, tamanho_plantacao, temperatura_minima, umidade_minima, estado, bairro, complemento, id) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar_plantacoes(): ", nome, temp_maxima, umidade_maxima, cep, cidade, numero, tamanho_plantacao, temperatura_minima, umidade_minima, estado, bairro, complemento);

  var instrucao_plantacao = `
    INSERT INTO plantacao (nome, tamanho, fkPlantacao_cliente) VALUES ('${nome}', '${tamanho_plantacao}', '${id}');
  `;

  var instrucao_parametro = `
    INSERT INTO plantacao_param (temp_min, temp_max, umid_min, umid_max) VALUES ('${temperatura_minima}', '${temp_maxima}', '${umidade_minima}', '${umidade_maxima}');
  `;

  var instrucao_endereco = `
    INSERT INTO endereco (cep, estado, bairro, numero, complemento, cidade) VALUES ('${cep}', '${estado}', '${bairro}', '${numero}', '${complemento}', '${cidade}');
  `;

  return new Promise((resolve, reject) => {
    database.executar(instrucao_plantacao)
      .then((resultadoPlantacao) => {
        var idPlantacao = resultadoPlantacao.insertId;
        console.log("Executando a instrução SQL para cadastrar endereço: \n" + instrucao_endereco);
        return database.executar(instrucao_endereco)
          .then((resultadoEndereco) => {
            var idEndereco = resultadoEndereco.insertId;
            console.log("Executando a instrução SQL para cadastrar parâmetro: \n" + instrucao_parametro);
            return database.executar(instrucao_parametro)
              .then((resultadoParametro) => {
                var idParametro = resultadoParametro.insertId;
                var instrucaoAtualizacao = `
                  UPDATE plantacao SET fkPlantacao_endereco = '${idEndereco}', fkPlantacao_param = '${idParametro}' WHERE idplantacao = '${idPlantacao}';
                `;
                console.log("Atualizar plantação: \n" + instrucaoAtualizacao);
                return database.executar(instrucaoAtualizacao);
              })
              .then(() => {
                console.log("entrou!");
                resolve(resultadoPlantacao);
              })
              .catch((erro) => {
                reject(erro);
              });
          })
          .catch((erro) => {
            reject(erro);
          });
      })
      .catch((erro) => {
        reject(erro);
      });
  });
}
module.exports = {
  entrar,
  cadastrar,
  listar,
  cadastrar_plantacoes_usuario
};