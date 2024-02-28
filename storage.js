//REGISTRO DA CORRIDA
function createNewRide() {
    //IDENTIFICADOR DA CORRIDA
    const rideID = Date.now()

    //DADOS DA CORRIDA
    const rideRecord = {
        data: [],
        startTime: rideID,
        stopTime: null
    }
    //SALVA O DADO DA CORRIDA
    saveRideRecord(rideID, rideRecord)
    return rideID
}

//APAGA A CORRIDA
function deleteRide(rideID){
    localStorage.removeItem(rideID)
}

//JUNTA TODOS OS DADOS DO LOCALSTORAGE
function getAllRides(){
    //TRANSFORMA OS DADOS DO LOCALSTORAGE DE OBJETO PARA ARRAY
    return Object.entries(localStorage)
}

//COMANDO PARA BUSCAR O REGISTRO DO LOCALSTORAGE
function getRideRecord(rideID) {
    return JSON.parse(localStorage.getItem(rideID))

}

//FUNÇÃO PARA SALVAR O RIDERECORD EM FORMATO DE STRING USANDO METODO JSON
function saveRideRecord(rideID, rideRecord) {
    localStorage.setItem(rideID, JSON.stringify(rideRecord))
}

function addPosition(rideID, position) {
    //BUSCA O REGISTRO REFERENTE AO RIDEID
    const rideRecord = getRideRecord(rideID)

    //BUCA AS PROPRIEDADES DO GEOLOCATIONPOSITION
    const newData = {
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        heading: position.coords.heading,
        ltitude: position.coords.ltitude,
        longitude: position.coords.longitude,
        speed: position.coords.speed,
        timestamp: position.timestamp,
    }

    //IRA ADICIONAR OS DADOS ACIMA AO RIDERECORD
    rideRecord.data.push(newData)

    //SALVARA O RIDERECORD ATUALIZADO
    saveRideRecord(rideID, rideRecord)
}

//SALVA O TEMPO EM QUE A CORRIDA FOI PAUSADA
function updateStopTime(rideID) {
    const rideRecord = getRideRecord(rideID)
    rideRecord.stopTime = Date.now()
    saveRideRecord(rideID, rideRecord)
}