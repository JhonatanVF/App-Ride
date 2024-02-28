const rideListElement = document.querySelector("#rideList")
const allRides = getAllRides()

//CRIA A LISTA COM AS INFORMAÇÕES DA CORRIDA DE FORMA DINAMICA
allRides.forEach(async ([id, value]) => {
    const ride = JSON.parse(value)
    ride.id = id

    //CRIA AS LINHA DA LISTA COM AS CORRIDAS
    const itemElement = document.createElement("li")
    itemElement.id = ride.id
    itemElement.className = "d-flex p-1 align-items-center justify-content-between shadow-sm gap-3"

    rideListElement.appendChild(itemElement)

    itemElement.addEventListener("click", ()=>{
        window.location.href = `./detail.html?id=${ride.id}`
    })

    //BUSCA A PRIMIRA POSIÇÃO DA CORRIDA
    const firtPosition = ride.data[0]
    const firstLocationData = await getLocationData(firtPosition.latitude, firtPosition.longitude)

    //IMAGEM DO MAPA
    const mapID = `map${ride.id}`
    const mapElement = document.createElement("div")
    mapElement.id = mapID
    mapElement.style = "width:100px; height:100px;"
    mapElement.classList.add("bg-secondary")
    mapElement.classList.add("rounded-4")

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

    itemElement.appendChild(mapElement)
    itemElement.appendChild(dataElement)

    const map = L.map(mapID, {zoomControl: false, dragging: false, attributionControl: false, scrollWheelZoom: false})
    map.setView([firtPosition.latitude, firtPosition.longitude], 15)
    L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 10,
        maxZoom: 20,
        ext: 'png'
    }).addTo(map);

    L.marker([firtPosition.latitude, firtPosition.longitude]).addTo(map)

})
