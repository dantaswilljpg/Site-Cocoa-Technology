const navbar = document.getElementById("nav");

function rolagem() {
    navbar.classList.toggle("ativa", scrollY > 0);
}

function simulador() {
    var qnt_hectares = Number(input_hectares.value);
    var sacas_produzidas = Number(input_sacas.value);
    var valor_saca = Number(input_valorsacas.value);
    var despesas = Number(input_despesas.value);

    var semCocoa = (sacas_produzidas * valor_saca) - despesas;
    var perdaHectare = (qnt_hectares * 10000) * 0.30;

    var comCocoa = (sacas_produzidas * 1.25) * valor_saca - despesas;
    var lucro = comCocoa - semCocoa;

    if(semCocoa < 0 || comCocoa < 0 ){
        alert(`Erro na entrada de dados! Verifique novamente suas informações, as despesas estão excedendo o lucro.`)
    } else {
    div_resulCalculo.innerHTML = ` 
    <div class="container-resultado">
    <h1 style="font-weight: 700; font-size: 21px;">Sem a solução da Cocoa Technology</h1><br>
    <p style="font-size: 17px;">O valor de retorno será de R$${semCocoa}.</p>
    <p style="font-size: 17px;">Perda de <span style="color: red;">${perdaHectare}</span> (M²) da produtividade na plantação!</p><br>

    <h1 style="font-weight: 700; font-size: 21px; margin-top: 5vh;">Com a solução da Cocoa Technology</h1><br>
    <p style="font-size: 17px;">O valor de retorno será de <span style="color: green;">R$${comCocoa}</span></p>
    <p style="font-size: 17px;">Obtendo um aumento no lucro de <span style="color: green;">R$${lucro}</span></p> </div>`;
    }
}

window.addEventListener("scroll", rolagem);