produtos = {
    nome: ["Alface", "Almeirao"],
    preco: 1.65
}
lojas = ["Matriz", "Filial"]


//VARIÁVEIS
let loja = document.querySelector('#lojas')
let produto = document.querySelector('#produtos')
let qtde = document.querySelector('#qtde')
let preco = document.querySelector('#preco')
const tabela = document.querySelector('.table')




//LISTENERS
document.querySelector('#preco').value = produtos.preco

document.addEventListener("DOMContentLoaded", function (event) {
    for (var i = 0; i < produtos.nome.length; i++)
        document.querySelector('#produtos').innerHTML += `<option value = ${produtos.nome[i]}>${produtos.nome[i]}</option>}`

    for (var i = 0; i < lojas.length; i++)
        document.querySelector('#lojas').innerHTML += `<option value = ${lojas[i]}>${lojas[i]}</option>}`

    document.querySelector('#preco').value = produtos.preco
    carregarLocalStorage()
});

document.querySelector("#btnAdd").addEventListener("click", (event) => {
    event.preventDefault();
    let subtotal = calcularSubtotal(qtde.value, preco.value);
    addTabela(produto.value, qtde.value, preco.value, subtotal.toFixed(2))
    addLocalStorage(produto.value, qtde.value, preco.value, subtotal.toFixed(2));
    carregarLocalStorage();
    document.querySelector('#total').value = calcularTotal()
    limparFormulario();
});



// FUNÇÕES
function limparFormulario() {
    qtde.value = "";
    qtde.focus();
}

function calcularSubtotal(qtde, preco) {
    return qtde * preco;
}

function calcularTotal() {
    let lista = JSON.parse(localStorage.getItem("listaPedidos"));
    let total = 0
    if (localStorage.getItem("listaPedidos")) {
        for (var i = 0; i < lista.length; i++) {
            total += parseFloat(lista[i].subtotal)
        }
    }
    return total
}

function addLocalStorage(produto, qtde, preco, subtotal) {

    let pedido = {
        "produto": produto,
        "qtde": qtde,
        "preco": preco,
        "subtotal": subtotal
    }

    if (localStorage.getItem("listaPedidos")) {

        let listaPedidos = JSON.parse(localStorage.getItem("listaPedidos"));
        listaPedidos.push(pedido);
        localStorage.setItem("listaPedidos", JSON.stringify(listaPedidos));

    } else {

        let listaPedidos = [];
        listaPedidos.push(pedido);
        localStorage.setItem("listaPedidos", JSON.stringify(listaPedidos));
    }
    mostrarMensagem();
}

function carregarLocalStorage() {

    limparTabela();

    if (localStorage.getItem("listaPedidos")) {

        let listaPedidos = JSON.parse(localStorage.getItem("listaPedidos"));
        listaPedidos.forEach((pedido, indice) => {
            addTabela(pedido.produto, pedido.qtde, pedido.preco, pedido.subtotal, indice);
        });

    } else {
        mostrarMensagem();
    }
}

function limparTabela() {
    let qtdLinhas = tabela.rows.length;
    for (let i = qtdLinhas - 2; i > 0; i--) {
        tabela.deleteRow(i);
    }
}

function deletarLinha(index) {
    let pedidos = JSON.parse(localStorage.getItem("listaPedidos"));
    pedidos.splice(index, 1);
    localStorage.setItem("listaPedidos", JSON.stringify(pedidos));
    carregarLocalStorage();
    document.querySelector('#total').value = calcularTotal()
    mostrarMensagem();
}

function mostrarMensagem() {

    console.log("Mensagem")
}

function addTabela(produto, qtde, preco, subtotal, indice) {
    let colunaProduto = document.createElement('td');
    colunaProduto.innerHTML = produto;

    let colunaQtde = document.createElement('td');
    colunaQtde.innerHTML = qtde;

    let colunaPreco = document.createElement('td');
    colunaPreco.innerHTML = preco;

    let colunaSubtotal = document.createElement('td');
    colunaSubtotal.innerHTML = subtotal;

    let colunaDeletar = document.createElement('td');
    let btnDeletar = document.createElement('button');
    btnDeletar.innerHTML = '<img src="assets/images/delete.svg" alt="Deletar IMC">';
    btnDeletar.classList.add('btn');
    btnDeletar.classList.add('btn-danger');


    btnDeletar.addEventListener("click", (event) => {
        event.preventDefault();
        $(this).remove();
        deletarLinha(indice);
    });
    colunaDeletar.appendChild(btnDeletar);

    let linha = document.createElement('tr');
    linha.appendChild(colunaProduto);
    linha.appendChild(colunaQtde);
    linha.appendChild(colunaPreco);
    linha.appendChild(colunaSubtotal);
    linha.appendChild(colunaDeletar);

    tabela.appendChild(linha);
}
