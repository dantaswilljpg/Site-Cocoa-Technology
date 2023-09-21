var express = require("express");
var router = express.Router();

var avisoController = require("../controllers/avisoController");

router.get("/", function (req, res) {
    avisoController.testar(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    avisoController.listar(req, res);
});

router.get("/listarPlantacao/:idUsuario", function (req, res) {
    avisoController.listarPlantacao(req, res);
});

router.get("/mostrar_dados/:idAviso", function (req, res) {
    avisoController.mostrar_dados(req, res);
});

router.get("/infoPlantaUsuario/:idAviso", function (req, res) {
    avisoController.infoPlantaUsuario(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    avisoController.listarPorUsuario(req, res);
});


router.get("/listarPorPlantacao/:idUsuario", function (req, res) {
    avisoController.listarPorPlantacao(req, res);
});


router.get("/pesquisar/:descricao", function (req, res) {
    avisoController.pesquisarDescricao(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    avisoController.publicar(req, res);
});

router.post("/plantacoes/:idUsuario", function (req, res) {
    avisoController.plantacoes(req, res);
});
router.put("/editar_plantacao/:idAviso", function (req, res) {
    avisoController.editar_plantacao(req, res);
});
router.put("/editar/:idAviso", function (req, res) {
    avisoController.editar(req, res);
});
router.delete("/deletar_plantacao/:idAviso", function (req, res) {
    avisoController.deletar_plantacao(req, res);
});
router.delete("/deletar/:idAviso", function (req, res) {
    avisoController.deletar(req, res);
});

module.exports = router;