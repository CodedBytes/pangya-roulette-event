import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import ItemContainer from './components/ItemContainer';
import ItemModal from './components/MUI.ItemModal';
import MessageModal from './components/MUI.MessageModal';

const App = () => {
  //Estados da pagina 
  const [muted, setMuted] = useState(true);
  const [rolling, setRolling] = useState(false);
  const [items, setItems] = useState([]);
  const [BoxItem, setBoxItem] = useState({id: 0, img: '/imgs/Curvemastery.webp', name: 'Curve Mastery'});
  const OpenModal = () => setOpen(true);
  const CloseModal = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const OpenMessageModal = () => setMessageOpen(true);
  const CloseMessageModal = () => setMessageOpen(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [tickets, setTickets] = useState(5);

  // Mutando e desmutando o BGM do jogo.
  const muteUnmute = () => {
    var audio = document.getElementById("bgm_teatime");
    audio.volume = 0.45;
    audio.muted = !audio.muted;
    audio.loop = true
    audio.play();

    // Troca de simbolos.
    (muted) ? setMuted(false) : setMuted(true);
  };

  // Girando a roleta
  const roulette = async (event) => {
    if(tickets > 0)
    {
      setRolling(true);
      setTickets(prev => prev - 1);
  
      // Configurações de efeito sonoro
      let roulette = new Audio('./sfx/roulette.wav');
      let click = new Audio('./sfx/click_ui.mp3');
      let roulette_decided = new Audio('./sfx/roulette_decided.wav');
      let roulette_btn = new Audio('./sfx/roulette_btn_act.wav');
      click.play(); 
      roulette_btn.play();
  
      // Toca a música
      roulette.loop = true;
      roulette.play();
  
      // A roleta sempre começa pelo primeiro item 
      let itemIndex = 0;
      
      // Animação dos items
      const animateItemBox = () => {
        setBoxItem(items[itemIndex]); 
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
      try{
        const sortItem = await axios.get(`http://127.0.0.1:4000/api/v1/sort_item`, { 'Content-Type': 'application/json' });
        if(sortItem.request.status === 200) 
        {
          // Após verificar que tem tickets e gerar o meu numero da sorte, continuar.
          setTimeout(() => {
            clearInterval(intervalId);
            setBoxItem(sortItem.data.item_sorted);
            roulette.pause();
            roulette.currentTime = 0;
            roulette_decided.play();
            setRolling(false);
            setTimeout(() => OpenModal(), 1000); 
          }, 4900);
        }
      }
      catch(error){ console.log(error); }
    }
    else {
      setMessage('O numero de tickets se esgotou. Você deve adquirir mais tickets dentro do jogo antes de voltar a jogar.');
      OpenMessageModal();
    }
  }

  // Puxando a lista de itens presentes no backend
  useEffect(() => {
    const pushItems = async () => {
      try{
        const itemList = await axios.get(`http://127.0.0.1:4000/api/v1/sendItems`, { 'Content-Type': 'application/json' });
        if(itemList.request.status === 200) { setItems(itemList.data); }
      }
      catch(error) { console.log(error); }
    }

    pushItems();
  }, [])

  // Renderizando
  return (
    <main id="main-page">
      <audio id="bgm_teatime" controls muted src="/sfx/teatime.mp3" style={{ display: 'none' }}></audio>

      <div className="game-page">
        <div className="game-container">
            <img src='/imgs/logo.png' alt='' title='PangYa Premium Jackpot' width='400px' />
            <div className="out-circle">
                <button id="mute_unmute" className="mute_unmute" onClick={() => muteUnmute()}>{(muted) ? (<i className="fa-solid fa-volume-xmark"></i>) : (<i className="fa-solid fa-volume-high"></i>) }</button>
            </div>

            <div className="qty-container">
                <img src="/imgs/item1_48.png" alt="" width={55} />
                <div className="numbers-container">
                    <span className="qty">{tickets}</span>
                </div>
            </div>

            <div className="roulette-section">
                <div className="title">
                    <span>Roleta</span>
                </div>

                <div className="r-container">
                    <div className="sub-container">
                        <div className="square">
                            <div id="itemBox"><img src={`${BoxItem.img}`} alt="" width={45} /></div>
                        </div>
                    </div>

                    <button type="button" id="start" disabled={rolling} onClick={(e) => roulette(e)}>Start Game</button>
                </div>
            </div>

            <div className="items-section">
                <div className="title">
                    <span>Items</span>
                </div>

                <div className="items-container">
                  {items.map((i) => (<ItemContainer key={i.id} image={i.img} chance={i.chances} name={i.name} quantity={i.qtd} />))}
                </div>
            </div>
        </div>
      </div>

      {(open) && (<ItemModal img={BoxItem.img} itemName={BoxItem.name} CloseModal={CloseModal} OpenModal={OpenModal} open={open} setOpen={setOpen}/>)}
      {(messageOpen) && (<MessageModal msg={message} CloseModal={CloseMessageModal} OpenModal={OpenMessageModal} open={messageOpen} setOpen={setMessageOpen}/>)}
    </main>
  );
}

export default App;
