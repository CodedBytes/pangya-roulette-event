/*
*   API em Node.JS feito do zero.
*   Copyright original: CodedBytes
*   Programado por: João Victor Segantini (CodedBytes) Sob a licensa MIT.
*   OBS: É de suma importancia respeitar a licensa, e conforme a mesma, caso o projeto seja utilizado, é obrigatorio o devido copyright delegado pelo dono do projeto!
*   Neste caso: manter esta mensagem e as localizações dos copyrights, originalmente inseridos no projeto, da forma que estão!
*/
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

// Configurações de comportamento e CORS
app.use(bodyParser.json({ limit: '80mb' }));// Tamanho do json para webhooks
app.use(bodyParser.urlencoded({ limit: '80mb', extended: true })); // Tamanho do encoder para webhooks
app.use(helmet()); // MiddleWare para melhorar segurança de cabeçalhos.
app.disable('x-powered-by'); // Retira identificação de software usado pelo server, evitando exploits
app.use(cors({ origin: function (origin, callback) { callback(null, true); }, credentials: true }));// Permissão correta para cors em Servidores VPS / WEB

/* 
* Lista de itens com suas respectivas probabilidades baseado na chance de sair
* A quantidade maxima de itens pra esse evento, por enquanto, é de 8 itens,
* Sendo eles 4 itens consumiveis, 1 raro do update, 2 itens de cookie e 1 game ticket(Obrigatorio)
*/
const itens = [
    { id: 0, chances: 98, name: 'Curve Mastery', qtd: 5, img: '/imgs/Curvemastery.webp' }, // Item Consumivel 1
    { id: 1, chances: 96, name: 'DuoStar LS', qtd: 5, img: '/imgs/Duostarls.webp' }, // Item Consumivel 2
    { id: 2, chances: 94, name: 'DuoStar LP', qtd: 5, img: '/imgs/Duostarluckypangya.webp' }, // Item Consumivel 3
    { id: 3, chances: 90, name: 'Power Potion', qtd: 5, img: '/imgs/Powerpotion.webp' }, // Item Consumivel 4
    { id: 4, chances: 12, name: 'Black Feather(A)', qtd: 1, img: '/imgs/g_earing_02.png' }, // Arin Black Feather
    { id: 5, chances: 47, name: 'Water Aztec', qtd: 3, img: '/imgs/ball_128.png' }, // Water Aztec 
    { id: 6, chances: 39, name: 'Roulette Ticket', qtd: 1, img: '/imgs/item1_48.png' }, // Game Ticket
    { id: 7, chances: 39, name: 'Card Remover', qtd: 1, img: '/imgs/removedor.png' } // Removedor de cartas (Nunca falha).
];

/* Função para selecionar um item com base na probabilidade */
function sortearItem() 
{
    // Calcula a soma total das chances
    let somaChances = 0;
    for (const item of itens) { somaChances += item.chances; }

    // Sorteia um número entre 0 e a soma total das chances
    let sorteioTotal = Math.random() * somaChances;

    // Encontra o item correspondente ao número sorteado
    for (const item of itens) {
        if (sorteioTotal <= item.chances) { return {id: item.id, name: item.name, img: item.img} } // Retorna o item sorteado
        sorteioTotal -= item.chances;
    }

    /*
    * Esta opção garante que, caso o sistema de probabilidade falhe,
    * o ticket usado retorne pro inventaro.   
    */
    return itens[itens.length - 1].id;
}

// Endpoints
app.get('/', (req, res) => res.send('API PangYa S8.9'));// Descrição caso acesse a api diretamente.
app.get('/api/v1/sendItems', (req, res) => res.status(200).json(itens));
app.get('/api/v1/sort_item', (req, res) => { const item = sortearItem(); return res.status(200).json({ item_sorted: item }); });

// Servindo a API
app.listen(4000, () => console.log('API rodando na porta 4000!'));