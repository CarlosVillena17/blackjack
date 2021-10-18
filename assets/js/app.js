
(()=>{
    'use strick'
    let deck=[] 
    const tipos=['C','D', 'H','S']
    const especiales=['A', 'J','Q','K']
    let puntosJugador=0; 
    let puntosComputadora=0; 
    const btnPedir=document.querySelector('#btnPedir')
    const btnDetener=document.querySelector('#btnDetener')
    const btnNuevo=document.querySelector("#btnNuevo")
    let puntaje=document.querySelectorAll('small')
    const divCartasJugador=document.querySelector('#jugador-cartas')
    const divCartasComputadora=document.querySelector('#computadora-cartas')
    const crearDeck=()=>{
        for(let i=2; i<10; i++){
            for(let tipo of tipos){
                deck.push(i+tipo)
            }
        }

        for(let tipo of tipos){
            for(let especial of especiales){
                deck.push(especial+tipo)
            }
        }
        deck=_.shuffle(deck);    
        return deck;
    }

    deck=crearDeck();

    const pedirCarta=()=>{
        return deck.pop(); 
    }

    const valorCarta=(carta)=>{
        const num=carta.substring(0,carta.length-1);
        let puntos=0; 
        if(isNaN(num)){
            puntos=(num==='A')? 11: 10;
        }else{
            puntos=num*1; 
        }
        return puntos;
    }

    const turnoComputadora= (puntosMinimos)=>{
        do{
            const carta=pedirCarta()
            puntosComputadora=puntosComputadora+valorCarta(carta)
            puntaje[1].innerText=puntosComputadora
            const imgCarta=document.createElement('img'); 
            imgCarta.src=`assets/cartas/${carta}.png`
            imgCarta.classList='carta'
            divCartasComputadora.append(imgCarta)
            if(puntosMinimos>21){
                break;
            }
        }while((puntosComputadora<puntosMinimos) && (puntosMinimos<=21))
        
        setTimeout(()=>{
            if(puntosComputadora==puntosMinimos){
                alert("NADIE GANA :(")
            }else if(puntosMinimos>21){
                alert("PERDISTE, GANA LA COMPUTADORA")
            }else if(puntosComputadora>21) {
                alert("JUGADOR GANA")
            }else{
                alert("COMPUTADORA GANA")
            }
        },10)   
    }
    //eventos 

    btnPedir.addEventListener('click', ()=>{
        const carta=pedirCarta()
        puntosJugador=puntosJugador+valorCarta(carta)
        console.log(carta)
        console.log(puntosJugador)
        puntaje[0].innerText=puntosJugador;
        const imgCarta=document.createElement('img'); 
        imgCarta.src=`assets/cartas/${carta}.png`
        imgCarta.classList='carta'
        divCartasJugador.append(imgCarta)
        //<img class="carta" src="assets/cartas/2C.png" alt="cartas">
        if(puntosJugador>21){
            btnPedir.disabled = true;
            btnDetener.disabled=true;
            turnoComputadora(puntosJugador)
        }else if(puntosJugador==21){
            btnDetener.disabled=true;
            btnPedir.disabled = true;
            turnoComputadora(puntosJugador)
        }
    })
    btnDetener.addEventListener('click', ()=>{
        btnDetener.disabled = true;
        btnPedir.disabled =true;
        turnoComputadora(puntosJugador);
    })

    btnNuevo.addEventListener('click', ()=>{
        console.clear();
        deck=[]
        deck=crearDeck(); 
        puntosJugador=0
        puntosComputadora=0

        puntaje[0].innerText=0
        puntaje[1].innerText=0

        divCartasComputadora.innerHTML=''; 
        divCartasJugador.innerHTML=''; 
        btnPedir.disabled=false; 
        btnDetener.disabled=false;
    })
})()

