const celulas = document.querySelectorAll(".celula")
let checarturno = true;

const JOGADOR_X = 'X';
const JOGADOR_O = 'O';

const COMBINACOES = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

document.addEventListener("click", (event) => {
    if(event.target.matches([".celula"])){
        jogar(event.target.id);
    }
});  

function jogar(id){

    const celula = document.getElementById(id);
    turno = checarturno ? JOGADOR_X : JOGADOR_O;
    celula.textContent = turno;
    celula.classList.add(turno);
    checarVencedor(turno);
}

function checarVencedor(turno){
    const vencedor = COMBINACOES.some((comb) => {
        return comb.every((index) => {
            return celulas[index].classList.contains(turno);
        })
    })

if(vencedor){
    encerrarJogo(turno);
}else if(checarEmpate()){
    encerrarJogo();
}else{
    checarturno = !checarturno;
}
}

function checarEmpate() {
    let x = 0;
    let o = 0;
    for (index in celulas){
        if (!isNaN(index)){
            if (celulas[index].classList.contains(JOGADOR_X)){
                x++;
            }

            if (celulas[index].classList.contains(JOGADOR_O)){
                o++;
            }
        }
    }
    return x + o === 9 ? true : false;
}

function encerrarJogo(vencedor = null){
    const aviso = document.getElementById('aviso');
    if(vencedor){
        aviso.innerHTML = `<h1>O jogador vencedor foi: ${vencedor}</h1>
            <h2><button onclick="restart()" id="but" class="but">Recomeçar</button></h2>
        `
    }else{
        aviso.innerHTML = `<h1>O jogo empatou!</h1>
            <h2><button onclick="restart()" id="but" class="but">Recomeçar</button></h2>
        `
    }
}

function restart(){
    let contador = 3;
    setInterval(() => {
        aviso.innerHTML = `<h2>Reiniciando em: ${contador--}</h2>`
    }, 1000);

    setTimeout(() => location.reload(),4300
    
    )
}