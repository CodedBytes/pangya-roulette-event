/*
*   Servidor http node.js feito do zero e revisado por mim mesmo (CodedBytes)
*   Copyright original: CodedBytes
*   Programado por: João Victor Segantini (CodedBytes) Sob a licensa MIT.
*   OBS: É de suma importancia respeitar a licensa,e conforme a mesma, caso o projeto seja utilizado,
*   é obrigatorio o devido copyright delegado pelo dono do projeto!
*   Neste caso: manter esta mensagem e as localizações dos copyrights, originalmente inseridos no projeto, da forma que estão!
*/

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Configurações de comportamento e CORS
app.use(cors());
app.use(express.json());
app.engine('html', require('ejs').renderFile);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));


/* 
* Lista de itens com suas respectivas probabilidades baseado na chance de sair
* A quantidade maxima de itens pra esse evento, por enquanto, é de 8 itens,
* Sendo eles 4 itens consumiveis, 1 raro do update, 2 itens de cookie e 1 game ticket(Obrigatorio)
*/
const itens = [
    { id: 0, chances: 98 }, // Item Consumivel 1
    { id: 1, chances: 96 }, // Item Consumivel 2
    { id: 2, chances: 94 }, // Item Consumivel 3
    { id: 3, chances: 90 }, // Item Consumivel 4
    { id: 4, chances: 12 }, // Arin Black Feather
    { id: 5, chances: 47 }, // Water Aztec 
    { id: 6, chances: 39 }, // Game Ticket
    { id: 7, chances: 39 } // Removedor de cartas (Nunca falha).
];

/* Função para selecionar um item com base na probabilidade */
function sortearItem() 
{
    // Calcula a soma total das probabilidades
    let somaProbabilidades = 0;
    for (const item of itens) { somaProbabilidades += item.chances; }

    // Sorteia um número entre 0 e a soma total das probabilidades
    let sorteioTotal = Math.random() * somaProbabilidades;

    // Encontra o item correspondente ao número sorteado
    for (const item of itens) {
        if (sorteioTotal <= item.chances) { return item.id; } // Retorna o item sorteado
        sorteioTotal -= item.chances;
    }

    /*
    * Esta opção garante que, caso o sistema de probabilidade falhe,
    * o ticket usado retorne pro inventaro.   
    */
    return itens[itens.length - 1].id;
}

// Pagina do jogo
app.get('/', (req, res) => { res.render(path.join(__dirname + '/public/game.ejs'), {itens}); });

// Roulette API (GET 200) -> Pede para a api rolar um numero baseado na probabilidade e retorna pro cliente.
app.get('/api/v1/sort_item', (req, res) => {
    // Mandando o json com o item pro cliente
    const item = sortearItem();
    res.status(200).json({ item_sorted: item });
});

// Servindo o webapp
app.listen(3000, () => console.log('Aplicação rodando na porta 3000!'));