//Objeto produtos
var produtos = ["Coca", "Pepsi", "Ronaldinho", "Maradona"]

let tabela = document.querySelector('.table');


function calcularSubtotal(qtde, preco) {
    return qtde * preco;
};

//Cria coluna e linha
document.addEventListener("DOMContentLoaded", event => {
    criarLinha()
});

document.getElementById('btnAdd').addEventListener('click', e => {
    criarLinha()
});

function deleteRow(i) {
    console.log("entrou")
    document.querySelector('.table').deleteRow(i)

}

//Cria linha e colunas
function criarLinha() {
    let itens = document.getElementById("itens")
    var item = `
        <tr>
            <td><select id='produto'>${produtos.map(produto => `<option>${produto}</option>`)}</td> 
            <td><input type="number" name="pedido" id="qtde"></td>
            <td><input type="number" name="pedido" id="preco"> </td>
            <td><input class="border-0" type="number" id="subtotal" readonly></td>  
            <td><input class="btn btn-danger float-right" type="button" value="Excluir" onclick="deleteRow(this.parentNode.parentNode.rowIndex)"</td>       
        </tr>`;

    itens.innerHTML += item
};



// //Atualizar subtotal e total ao alterar qtde e preço na tabela
// var elementos = document.body.getElementsByClassName('pedido')
// console.log(elementos)
// for (var ele of elementos) {
//     console.log("entrou")
//     ele.addEventListener("keyup", e => {
//         alert("entrou")
//         const qtde = document.getElementById('qtde').value
//         const preco = document.getElementById('preco').value.toLocaleString('US')
//         const sub = subtotal(qtde, preco)
//         var total = 0

//         total += sub
//         document.getElementById('subtotal').innerHTML = 'R$ ' + sub.toFixed(2).toLocaleString('pt-BR')
//         document.getElementById('total').innerHTML = 'R$ ' + total.toFixed(2).toLocaleString('pt-BR')
//     })
// }



