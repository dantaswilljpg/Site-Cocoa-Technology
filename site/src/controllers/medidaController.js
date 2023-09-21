var medidaModel = require("../models/medidaModel");

function exibirPlantacoes(req, res) {
    var idCliente = req.params.idCliente;

    console.log(`Acatando plantações do cliente`);

    medidaModel.exibirPlantacoes(idCliente).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function exibirLeituraPlantacoes(req, res) {
    var idPlantacao = req.params.idPlantacao;

    console.log(`Acatando dados de leitura das plantações do cliente`);

    medidaModel.exibirLeituraPlantacoes(idPlantacao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function ultimosDadosPlantacao(req, res) {
    var idCliente = req.params.idCliente;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.ultimosDadosPlantacao(idCliente).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterquantidadeusuario(req, res) {
    var idCliente = req.params.idCliente;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.obterquantidadeusuario(idCliente).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterplantacoesemalerta(req, res) {
    var idCliente = req.params.idCliente;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.obterplantacoesemalerta(idCliente).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterquantidadeplantacoes(req, res) {
    var idCliente = req.params.idCliente;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.obterquantidadeplantacoes(idCliente).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function status_plantacoes(req, res) {
    var idCliente = req.params.idCliente;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.status_plantacoes(idCliente).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function plantaOrderStatus(req, res) {
    var idCliente = req.params.idCliente;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.plantaOrderStatus(idCliente).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    exibirPlantacoes,
    ultimosDadosPlantacao,
    obterquantidadeplantacoes,
    obterplantacoesemalerta,
    obterquantidadeusuario,
    status_plantacoes,
    exibirLeituraPlantacoes,
    plantaOrderStatus,
}