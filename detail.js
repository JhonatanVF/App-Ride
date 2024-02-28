const params = new URLSearchParams(window.location.search)
const rideID = params.get("id")
const ride = getRideRecord(rideID)


document.addEventListener("DOMContentLoaded", async () => {
    //BUSCA A PRIMIRA POSIÇÃO DA CORRIDA
    const firtPosition = ride.data[0]
    const firstLocationData = await getLocationData(firtPosition.latitude, firtPosition.longitude)

    const dataElement = document.createElement("div")
    dataElement.className = "flex-fill d-flex flex-column"

    //CRIA NO ELEMENTO DA LISTA AS INFORMAÇÕES DA CIDADE
    const cityDiv = document.createElement("div")
    cityDiv.innerText = `${firstLocationData.city} - ${firstLocationData.countryCode}`
    cityDiv.className = "text-primary mb-2"

    //CRIA NO ELEMENTO DA LISTA A VELOCIDADE MAXIMA
    const maxSpeedDiv = document.createElement("div")
    maxSpeedDiv.innerText = `Max Speed: ${getMaxSpeed(ride.data)} Km/h`
    maxSpeedDiv.className = "h5"

    //CRIA NO ELEMENTO DA LISTA A DISTANCIA PERCORRIDA
    const distanceDiv = document.createElement("div")
    distanceDiv.innerText = `Distance: ${getDistance(ride.data)} Km`

    //CRIA NO ELEMENTO DA LISTA O TEMPO DE DURAÇÃO DA CORRIDA
    const durationDiv = document.createElement("div")
    durationDiv.innerText = `Duration: ${getDuration(ride)}`

    //CRIA NO ELEMENTO DA LISTA A DATA EM QUE A CORRIDA FOI CRIADA
    const dateDiv = document.createElement("div")
    dateDiv.innerText = getStartDate(ride)
    dateDiv.className = "text-secondary mt-2"

    //ADICIONA OS ELEMENTOS A CIMA A TELA PRINCIPAL DO APP
    dataElement.appendChild(cityDiv)
    dataElement.appendChild(maxSpeedDiv)
    dataElement.appendChild(distanceDiv)
    dataElement.appendChild(durationDiv)
    dataElement.appendChild(dateDiv)

    document.querySelector("#data").appendChild(dataElement)

    //DELETA A CORRIDA AO APERTAR O BOTÃO DE DELETE E VOLTA PRA LISTA DE CORRIDA
    const deleteButton = document.querySelector("#deleteBtn")
    deleteButton.addEventListener("click", ()=>{
        deleteRide(rideID)
        window.location.href = "./"
    })

    //ADICIONA O LAYER DO MAP LEAFLET
    const map = L.map("mapDetail")
    map.setView([firtPosition.latitude, firtPosition.longitude], 15)
    L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 10,
        maxZoom: 20,
        ext: 'png'
    }).addTo(map);

    //CRIA O PERCURSO PERCORRIDO
    const positionsArray = ride.data.map((position=>{
        return [position.latitude, position.longitude]
    }))

    const polyline = L.polyline(positionsArray, {color:"#F00"})
    polyline.addTo(map)

    //FOCA NO PERCURSO PERCORRIDO
    map.fitBounds(polyline.getBounds())
})