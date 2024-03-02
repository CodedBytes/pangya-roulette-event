/*
*   Arquivo Core do jogo.
*   Copyright original: CodedBytes
*   Programado por: João Victor Segantini (CodedBytes) Sob a licensa MIT.
*   OBS: É de suma importancia respeitar a licensa,e conforme a mesma, caso o projeto seja utilizado,
*   é obrigatorio o devido copyright delegado pelo dono do projeto!
*   Neste caso: manter esta mensagem e as localizações dos copyrights, originalmente inseridos no projeto, da forma que estão!
*/

document.getElementById("mute_unmute").addEventListener("click", function() {
    // Pega o elemento de audio e o controla.
    var audio = document.getElementById("bgm_teatime");
    audio.volume = 0.45;
    audio.muted = !audio.muted;
    audio.loop = true
    audio.play();

    // Troca de simbolos.
    (document.getElementById("mute_unmute").innerHTML === '<i class="fa-solid fa-volume-xmark"></i>') ?
    document.getElementById("mute_unmute").innerHTML = '<i class="fa-solid fa-volume-high"></i>' :
    document.getElementById("mute_unmute").innerHTML = '<i class="fa-solid fa-volume-xmark"></i>' 
});

function roulette() {
    // Desativando o botão
    document.getElementById('start').disabled = true;

    // audio area
    let roulette = new Audio('./sfx/roulette.wav');
    let click = new Audio('./sfx/click_ui.mp3');
    let roulette_decided = new Audio('./sfx/roulette_decided.wav');
    let roulette_btn = new Audio('./sfx/roulette_btn_act.wav');
    click.play(); 
    roulette_btn.play();

    // Toca a música
    roulette.loop = true;
    roulette.play();

    // Itens a renderizar em ordem de sorteio.
    let items = [
        '<img src="./imgs/Curvemastery.webp" alt="" width="45px">',
        '<img src="./imgs/Duostarls.webp" alt="" width="45px">',
        '<img src="./imgs/Duostarluckypangya.webp" alt="" width="45px">',
        '<img src="./imgs/Powerpotion.webp" alt="" width="45px">',
        '<img src="./imgs/g_earing_02.png" alt="" width="60px">',
        '<img src="./imgs/ball_128.png" alt="" width="45px">',
        '<img src="./imgs/item1_48.png" alt="" width="60px">',
        '<img src="./imgs/removedor.png" alt="" width="45px">'
        ];
    let itemIndex = 0;
    
    // Animação dos items
    function animateItemBox() {
        document.getElementById('itemBox').innerHTML = items[itemIndex]; 
        itemIndex = (itemIndex + 1) % items.length;
    }
    let intervalId = setInterval(animateItemBox, 50);

    
    /* 
    * Pede pra pangya roulette api gerar um numero do sorteio.
    * Em um cenario real, você faria essa chamada pra API,
    * a mesma iria varrer o banco de dados procurando por tickets na conta
    * Caso confirmado que o player logado tenha mais tickets na conta
    * Ele jogaria uma call pra Pangya Roulette api gerar o numero da sorte e, depois do retorno,
    * Gravar o item ganho no banco de dados. Mas como aqui é teste vamos fazer com numeros ficticios. 
    */

    // Chamando a api.
    const opt = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', }
    };
    fetch(`/api/v1/sort_item`, opt)
        .then((response) => response.json())
        .then(data => {
            // Após verificar que tem tickets e gerar o meu numero da sorte, continuar.
            setTimeout(() => {
                clearInterval(intervalId);
                document.getElementById('itemBox').innerHTML = items[data.item_sorted]; 
                roulette.pause();
                roulette.currentTime = 0;
                roulette_decided.play();

                // Fazer o item piscar 5 vezes
                let blinkTimes = 5;
                let blinkFunction = function() {
                    if(blinkTimes > 0) {
                        blinkTimes--;
                        $('#itemBox').fadeOut(150).fadeIn(150, blinkFunction);
                    }
                    else
                    {
                        setTimeout(() => {
                            document.getElementById('start').disabled = false;
                            windowHandler(0, items[data.item_sorted]);
                        },120);
                    }
                };
                blinkFunction();
            }, 5000);
        })
        .catch((error) => console.log(error))
};