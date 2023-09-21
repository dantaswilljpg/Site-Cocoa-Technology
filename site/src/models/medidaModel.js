var database = require("../database/config");

function exibirPlantacoes(idCliente, limite_linhas) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select plantacao.* from plantacao join cliente on fkPlantacao_cliente = idcliente
        where idcliente = ${idCliente};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select plantacao.* from plantacao join cliente on fkPlantacao_cliente = idcliente
        where idcliente = ${idCliente};
`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function exibirLeituraPlantacoes(idPlantacao, limite_linhas) {
    instrucaoSql = ''
        instrucaoSql = `select 
        plantacao.nome,
        retorno_temp ,
        retorno_umidd,
        DATE_FORMAT(dataLeitura_hora,'%H:%i:%s') as dataLeitura_hora,
        fkLeitura_sensor 
        from leitura join sensor on fkLeitura_sensor = idsensor
	    join plantacao on fkSensor_plantacao = idplantacao
		where idplantacao = ${idPlantacao} order by idleitura desc limit 7;`;
   
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function ultimosDadosPlantacao(idCliente, limite_linhas) {
    instrucaoSql = `select  plantacao.idplantacao, plantacao.nome,
        retorno_temp as temperatura ,
        retorno_umidd as umidade,
        dataLeitura_hora, 
        DATE_FORMAT(dataLeitura_hora,'%H:%i:%s') as momento_grafico, 
        fkLeitura_sensor 
        from leitura join sensor on idsensor = fkLeitura_sensor
        join plantacao on idplantacao = fkSensor_plantacao 
        join cliente on fkPlantacao_cliente = idcliente
			where idcliente = ${idCliente} and idLeitura IN (select MAX(idleitura) from leitura group by fkLeitura_sensor);
        `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterquantidadeusuario(idCliente) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT COUNT(idusuario) AS qtdUsu FROM usuario where fkUsuario_cliente = ${idCliente};`;
    }
    else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT COUNT(idusuario) AS qtdUsu FROM usuario where fkUsuario_cliente = ${idCliente};
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterplantacoesemalerta(idCliente) {
        instrucaoSql = `SELECT
        COUNT(DISTINCT p.idplantacao) AS alerta
    FROM
        cliente c
        JOIN plantacao p ON c.idcliente = p.fkPlantacao_cliente
        JOIN sensor s ON p.idplantacao = s.fkSensor_plantacao
        JOIN leitura l ON s.idsensor = l.fkLeitura_sensor
    WHERE
        c.idcliente = ${idCliente}
        AND (
            (l.retorno_temp > 29 OR l.retorno_temp < 17)
            OR (l.retorno_umidd > 85 OR l.retorno_umidd < 75)
        )
        AND l.idleitura IN (SELECT MAX(idleitura) FROM leitura GROUP BY fkLeitura_sensor);
        `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterquantidadeplantacoes(idCliente) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT COUNT(idplantacao) AS qtdPlantacao FROM plantacao join cliente on fkPlantacao_cliente = idcliente
        where idcliente = ${idCliente};`;
    }
    else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT COUNT(idplantacao) AS qtdPlantacao FROM plantacao join cliente on fkPlantacao_cliente = idcliente
        where idcliente = ${idCliente};
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function status_plantacoes(idCliente) {
    instrucaoSql = `
    select 
    idcliente as cliente,
    (
    select count(idplantacao) from leitura join sensor on idsensor = fkLeitura_sensor join plantacao on idplantacao = fkSensor_plantacao join cliente on fkPlantacao_cliente = idcliente where ( (retorno_temp > 29 or retorno_temp < 17) or (retorno_umidd > 85 or retorno_umidd < 75) ) and idcliente = ${idCliente} and idleitura IN (select MAX(idleitura) from leitura group by fkLeitura_sensor)
    ) AS perigo,
    (
    select count(idplantacao) from leitura join sensor on idsensor = fkLeitura_sensor join plantacao on idplantacao = fkSensor_plantacao join cliente on fkPlantacao_cliente = idcliente where ( ( (retorno_temp > 26 and retorno_temp < 29) or (retorno_temp >= 17 and retorno_temp < 20) ) and (retorno_umidd <= 85 and retorno_umidd >= 75) ) and idcliente = ${idCliente} and idleitura IN (select MAX(idleitura) from leitura group by fkLeitura_sensor)
    ) AS cuidado,
    (
    select count(idplantacao) from leitura join sensor on idsensor = fkLeitura_sensor join plantacao on idplantacao = fkSensor_plantacao join cliente on fkPlantacao_cliente = idcliente where ( (retorno_temp > 24 and retorno_temp <= 26) and (retorno_umidd <= 85 and retorno_umidd >= 75) ) and idcliente = ${idCliente} and idleitura IN (select MAX(idleitura) from leitura group by fkLeitura_sensor)
    ) AS atencao,
    (
    select count(idplantacao) from leitura join sensor on idsensor = fkLeitura_sensor join plantacao on idplantacao = fkSensor_plantacao join cliente on fkPlantacao_cliente = idcliente where ( (retorno_temp >= 20 and retorno_temp <= 24) and (retorno_umidd <= 85 and retorno_umidd >= 75) ) and idcliente = ${idCliente} and idleitura IN (select MAX(idleitura) from leitura group by fkLeitura_sensor)
    ) as tranquilo
    from leitura join sensor on idsensor = fkLeitura_sensor join plantacao on idplantacao = fkSensor_plantacao join cliente on fkPlantacao_cliente = idcliente where idcliente = ${idCliente} group by idcliente;
        `;

    return database.executar(instrucaoSql);
}

function plantaOrderStatus(idCliente) {
    instrucaoSql = `
    SELECT 
    plantacao.idplantacao, 
    plantacao.nome,
    retorno_temp AS temperatura ,
    retorno_umidd AS umidade,
    dataLeitura_hora, 
    DATE_FORMAT(dataLeitura_hora, '%H:%i:%s') AS momento_grafico, 
    fkLeitura_sensor 
FROM 
    leitura 
    JOIN sensor ON idsensor = fkLeitura_sensor
    JOIN plantacao ON idplantacao = fkSensor_plantacao 
    JOIN cliente ON fkPlantacao_cliente = idcliente
WHERE 
    idcliente = ${idCliente} 
    AND idLeitura IN (SELECT MAX(idleitura) FROM leitura GROUP BY fkLeitura_sensor)
ORDER BY 
    CASE
        WHEN (retorno_temp > 29 OR retorno_temp < 17) OR (retorno_umidd > 85 OR retorno_umidd < 75) THEN 1 -- Perigo
        WHEN (retorno_temp > 26 AND retorno_temp < 29) OR (retorno_temp >= 17 AND retorno_temp < 20) THEN 2 -- Cuidado
        WHEN retorno_temp > 24 AND retorno_temp <= 26 AND retorno_umidd <= 85 AND retorno_umidd >= 75 THEN 3 -- Atenção
        WHEN retorno_temp >= 20 AND retorno_temp <= 24 AND retorno_umidd <= 85 AND retorno_umidd >= 75 THEN 4 -- Tranquilo
    END;
     `;

    return database.executar(instrucaoSql);
}


module.exports = {
    exibirPlantacoes,
    exibirLeituraPlantacoes,
    ultimosDadosPlantacao,
    obterquantidadeplantacoes,
    obterplantacoesemalerta,
    obterquantidadeusuario,
    status_plantacoes,
    plantaOrderStatus,
}
