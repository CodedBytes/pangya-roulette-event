/*
*   Controlador de janelas.
*   Copyright original: CodedBytes
*   Programado por: João Victor Segantini (CodedBytes) Sob a licensa MIT.
*   OBS: É de suma importancia respeitar a licensa,e conforme a mesma, caso o projeto seja utilizado,
*   é obrigatorio o devido copyright delegado pelo dono do projeto!
*   Neste caso: manter esta mensagem e as localizações dos copyrights, originalmente inseridos no projeto, da forma que estão!
*/

// Controlador 
function windowHandler(_id, _imgElement) 
{
    // Efeito sonoro
    let open = new Audio('./sfx/open_ui.mp3');
    open.play();

    switch(_id)
    {
        case 0:// Janela de testes
        {
            // Cria o elemento da janela
            document.getElementById('windows').innerHTML += `
                <div class="draggable-window" id="window-${_id}">
                    <div class="window-header">
                        <span>Premio</span>
                        <button type="button" onclick="let cancel = new Audio('./sfx/cancel_ui.mp3'); cancel.play(); closeWindow(${_id});" class="close">X</button>
                    </div>
                    
                    <div class="window-content" id="content-${_id}">
                        ${_imgElement}
                        <span>Você ganhou um item!</span>
                        <span>Ele sera enviado para sua caixa de entrada no jogo.</span>
                    </div>
                </div>
            `;

            // Código de movimentação para a nova janela
            let isDragging = false;
            let offsetX, offsetY;

            $(`.draggable-window#window-${_id} .window-header`).mousedown(function (e) {
                isDragging = true;
                offsetX = e.clientX - $(this).offset().left;
                offsetY = e.clientY - $(this).offset().top;
            });

            $(document).mouseup(function () { isDragging = false; });

            $(document).mousemove(function (e)
            {
                if (isDragging) 
                {
                    let newX = e.clientX - offsetX;
                    let newY = e.clientY - offsetY;

                    newX = Math.max(0, Math.min(newX, $(window).width() - $(`.draggable-window#window-${_id}`).outerWidth()));
                    newY = Math.max(0, Math.min(newY, $(window).height() - $(`.draggable-window#window-${_id}`).outerHeight()));

                    $(`.draggable-window#window-${_id}`).offset({
                        top: newY,
                        left: newX
                    });
                }
            });
            
            $('.window-overlay').show();

            // Animação para abrir a janela
            let uploadPopup = document.getElementById(`window-${_id}`);
            uploadPopup.style.animation = "openAnimation 0.2s";
            
            // Depois que ele abriu troca a visualização dele para block
            delay (150).then (() => { uploadPopup.style.display = "block"; });
            break;
        }

        case 1:// Janela de aviso do sistema
        {
            // Cria o elemento da janela
            document.getElementById('windows').innerHTML += `
                <div class="draggable-window" id="window-${_id}">
                    <div class="window-header">
                        <span>Aviso</span>
                        <button type="button" onclick="let cancel = new Audio('./sfx/cancel_ui.mp3'); cancel.play(); closeWindow(${_id});" class="close">X</button>
                    </div>
                    
                    <div class="window-content" id="content-${_id}">
                        <span>
                            Este sistema foi idealizado como um menu fixo para meu servidor de pangya s8.
                            Originalmente, ele seria como um scratchy do USA, 
                            mas como o JP não tinha este sistema, resolvi criar um.
                            Atualmente a API dele não faz conexão com o jogo em si, pois não tenho um servidor para testar.
                            Caso use este projeto, peço que respeite os avisos presentes em todo o codigo aberto e mantenha o copyright.
                            Assim você valoriza o tempo que tive para desenvolver-lo.
                        </span>
                        
                        <span>
                            Atualmente o sistema pede para a API REST gerar um numero aleatorio, dentre os cadastrados,
                            retornando assim um numero, que ao ser passado para o cliente, mostra o item que foi ganho.
                            Em um cenario real você deve conectar esta API ao banco de dados do jogo usando o modulo mysql do node.js,
                            ou o modulo mssql, se conectando ou com o odbc ou por usuario e senha atravez de um ip/dominio/nome do server(local).
                        </span>
                    </div>
                </div>
            `;

            // Código de movimentação para a nova janela
            let isDragging = false;
            let offsetX, offsetY;

            $(`.draggable-window#window-${_id} .window-header`).mousedown(function (e) {
                isDragging = true;
                offsetX = e.clientX - $(this).offset().left;
                offsetY = e.clientY - $(this).offset().top;
            });

            $(document).mouseup(function () { isDragging = false; });

            $(document).mousemove(function (e)
            {
                if (isDragging) 
                {
                    let newX = e.clientX - offsetX;
                    let newY = e.clientY - offsetY;

                    newX = Math.max(0, Math.min(newX, $(window).width() - $(`.draggable-window#window-${_id}`).outerWidth()));
                    newY = Math.max(0, Math.min(newY, $(window).height() - $(`.draggable-window#window-${_id}`).outerHeight()));

                    $(`.draggable-window#window-${_id}`).offset({
                        top: newY,
                        left: newX
                    });
                }
            });
            
            $('.window-overlay').show();

            // Animação para abrir a janela
            let uploadPopup = document.getElementById(`window-${_id}`);
            uploadPopup.style.animation = "openAnimation 0.2s";
            
            // Depois que ele abriu troca a visualização dele para block
            delay (150).then (() => { uploadPopup.style.display = "block"; });
            break;
        }
    }
}

// Fechando janelas
function closeWindow(id) {
    // Efeito sonoro
    let open = new Audio('./sfx/close_ui.mp3');
    open.play();

    // Animação
    let uploadPopup = document.getElementById(`window-${id}`);
    uploadPopup.style.animation="closeAnimation 0.2s";
    $('.window-overlay').hide();
    
    // Elimina o elemento da DOM.
    delay (150).then (() => { uploadPopup.style.display = "none"; uploadPopup.remove(); });
}

// Delay
function delay(time) { return new Promise(resolve => setTimeout (resolve, time)); }