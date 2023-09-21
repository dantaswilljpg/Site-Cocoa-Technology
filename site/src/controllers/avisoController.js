var avisoModel = require("../models/avisoModel");

function testar(req, res) {
    console.log("ENTRAMOS NO avisoController");
    res.send("ENTRAMOS NO AVISO CONTROLLER");
}

function listar(req, res) {
    var idUsuario = req.params.idUsuario;
    avisoModel.listar(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarPlantacao(req, res) {
    var idUsuario = req.params.idUsuario;
    avisoModel.listarPlantacao(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    avisoModel.listarPorUsuario(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}



function pesquisarDescricao(req, res) {
    var descricao = req.params.descricao;

    avisoModel.pesquisarDescricao(descricao)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function publicar(req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha
    var idUsuario = req.params.idUsuario;

    if (nome == undefined) {
        res.status(400).send("O título está indefinido!");
    } else if (email == undefined) {
        res.status(400).send("A descrição está indefinido!");
    } else if (senha == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        avisoModel.publicar(nome, email, senha , idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}



function plantacoes(req, res) {
    var nome_plantacao = req.body.nome_plantacao;
    var temp_max = req.body.temp_max;
    var umid_max = req.body.umid_max
    var cep = req.body.cep;
    var cidade = req.body.cidade;
    var numero = req.body.numero;
    var tamanho_plantacao = req.body.tamanho_plantacao
    var temp_min = req.body.temp_min;
    var umid_min = req.body.umid_min;
    var estado = req.body.estado;
    var bairro = req.body.bairro;
    var complemento = req.body.complemento;
    var idUsuario = req.params.idUsuario;

    console.log("Dados" +  nome_plantacao + temp_max + umid_max , + cep , + cidade , numero , tamanho_plantacao , temp_min )

    if (nome_plantacao == undefined) {
        res.status(400).send("O nome da plantação está indefinido!");
    } else if (temp_max == undefined) {
        res.status(400).send("A temperatura máxima está indefinido!");
    } else if (umid_max == undefined) {
        res.status(400).send("A umidade máxima está indefinido!");
    } 
    else if (cep == undefined) {
        res.status(400).send("O cep indefinido!");
    } else if (cidade == undefined) {
        res.status(400).send("A cidade está indefinido!");
    }
    else if (numero == undefined) {
        res.status(400).send("O número está indefinido!");
    } else if (tamanho_plantacao == undefined) {
        res.status(400).send("O tamanho da plantação está indefinido!");
    }
    else if (temp_min == undefined) {
        res.status(400).send("A temperatura mínima está indefinido!");
    } else if (estado == undefined) {
        res.status(400).send("O estado está indefinido!");
    }
    else if (bairro == undefined) {
        res.status(400).send("O bairro está indefinido!");
    } else if (complemento == undefined) {
        res.status(400).send("O complemento está indefinido!");
    }
    
    
    else {
        avisoModel.plantacoes(nome_plantacao , temp_max , umid_max , cep , cidade , numero , tamanho_plantacao , 
        temp_min , umid_min , estado , bairro , complemento , idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}



function editar(req, res) {
    var nome = req.body.nomeServer
    var email = req.body.emailServer 
    var senha = req.body.senhaServer
    var idAviso = req.body.idSever

    avisoModel.editar(nome,email , senha , idAviso)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function deletar(req, res) {
    var idAviso = req.params.idAviso;

    avisoModel.deletar(idAviso)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function deletar(req, res) {
    var idAviso = req.params.idAviso;

    avisoModel.deletar(idAviso)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function mostrar_dados(req, res) {
    var idAviso = req.params.idAviso;

    avisoModel.mostrar_dados(idAviso)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function mostrar_dados_plantacao(req, res) {
    var idAviso = req.params.idAviso;

    avisoModel.mostrar_dados_plantacao(idAviso)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
function infoPlantaUsuario(req, res) {
    var idAviso = req.params.idAviso;

    avisoModel.infoPlantaUsuario(idAviso)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
function deletar_plantacao(req, res) {
    var idAviso = req.params.idAviso;

    avisoModel.deletar_plantacao(idAviso)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar_plantacao o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function editar_plantacao(req, res) {
    var nome = req.body.nomeServer
    
    var idAviso = req.body.idSever

    avisoModel.editar_plantacao(nome, idAviso)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

module.exports = {
    testar,
    listar,
    listarPlantacao,
    listarPorUsuario,
    pesquisarDescricao,
    publicar,
    editar,
    deletar,
    mostrar_dados,
    deletar_plantacao,
    plantacoes,
    mostrar_dados_plantacao,
    infoPlantaUsuario,
    editar_plantacao
}