const speedElement = document.querySelector("#speed")
const startBtn = document.querySelector("#start")
const stopBtn = document.querySelector("#stop")

let watchID = null
let currentRide = null


//--------------------------------AÇÃO DO BOTÃO DE STAR--------------------------------

startBtn.addEventListener("click", () => {

    //SE JA ESTIVER ALGUMA POSIÇÃO RODANDO NÃO IRAR LER A FUNÇÃO NOVAMENTE
    if (watchID)
        return

    //QUANDO EXECUTADO NA EXPOSIÇÃO DE API RETORNARA A POSIÇÃO MOSTRANDO A VELOCIDADE
    function handleSuccess(position) {

        //IRA ADICIONAR A POSSIÇÃO AO CURRENTRIDA
        addPosition(currentRide, position)

        //MODIFICA O HTML DE VELOCIDADE DO FRONT COM A VELOCIDADE ATUAL
        speedElement.innerText = position.coords.speed ? (position.coords.speed * 3.6).toFixed(1) : 0

    }

    //MENSAGEM DE ERRO
    function handleError(error) {
        console.log(error.msg)
    }

    //PRECIÇÃO DA RECEPÇÃO DOS DADOS
    const options = {
        enableHighAccuracy: true
    }

    //REGISTRO DA CORRIDA
    currentRide = createNewRide()

    //EXPOSIÇÃO DA API DE LOCALIZAÇÃO
    watchID = navigator.geolocation.watchPosition(handleSuccess, handleError, options)

    //REMOVER O BOTÃO DE START
    startBtn.classList.add("d-none")
    stopBtn.classList.remove("d-none")

})


//--------------------------------AÇÃO DO BOTÃO DE STOP--------------------------------

stopBtn.addEventListener("click", () => {

    //SE NÃO OUVER NENHUMA POSIÇÃO RODANDO NÃO IRAR LER A FUNÇÃO
    if (!watchID)
        return

    //IRA LIMPAR O ARMAZENAMENTO DA POSIÇÃO E RETORNARA PARA NULL
    navigator.geolocation.clearWatch(watchID)
    watchID = null

    //TEMPO DE PAUSA DA CORRIDA
    updateStopTime(currentRide)
    currentRide = null

    //REMOVER O BOTÃO DE STOP
    stopBtn.classList.add("d-none")
    startBtn.classList.remove("d-none")

    window.location.href = "./"

})