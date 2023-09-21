var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/exibirPlantacoes/:idCliente", function (req, res) {
    medidaController.exibirPlantacoes(req, res);
});

router.get("/exibirLeituraPlantacoes/:idPlantacao", function (req, res) {
    medidaController.exibirLeituraPlantacoes(req, res);
});

router.get("/ultimosDadosPlantacao/:idCliente", function (req, res) {
    medidaController.ultimosDadosPlantacao(req, res);
})

router.get("/obterquantidadeusuario/:idCliente", function (req, res) {
    medidaController.obterquantidadeusuario(req, res);
})

router.get("/obterquantidadeplantacoes/:idCliente", function (req, res) {
    medidaController.obterquantidadeplantacoes(req, res);
})

router.get("/obterplantacoesemalerta/:idCliente", function (req, res) {
    medidaController.obterplantacoesemalerta(req, res);
})

router.get("/status_plantacoes/:idCliente", function (req, res) {
    medidaController.status_plantacoes(req, res);
})

router.get("/plantaOrderStatus/:idCliente", function (req, res) {
    medidaController.plantaOrderStatus(req, res);
})

module.exports = router;