let tempBlock = document.querySelector('#temp')
let cityBlock = document.querySelector('#city')
let mainBlock = document.querySelector('#main')
let visibilityBlock = document.querySelector('#visibility')
let windBlock = document.querySelector('#wind')
let imgBlock = document.querySelector('.img-block')
let update_date = document.querySelector('#update-date')
let local_date = document.querySelector('#local-date')
let searchInp = document.querySelector('.search')

setInterval(() => {
    let date = new Date;
    local_date.textContent = `Local time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}, 1000)

let city = 'London'

document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        let value = searchInp.value;
        if(!value) return false;
        city = value;
        init()
        searchInp.value = ''
    }
})

function init() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d5910db885ce40484519fe2dfb25c1c4`)
    .then((resp) => {return resp.json()})
    .then((data) => {

    
        // imgBlock.innerHTML = `<img class='weather-img' src="http://openweathermap.org/img/w/` + data.weather[0].icon + `.png "></img>`

        tempBlock.textContent = `${temperature()}°`

        cityBlock.textContent = `City: ${data.name}`

        mainBlock.textContent = `Weather: ${main()}`

        visibilityBlock.textContent = `Visibility: ${ves()} M`

        windBlock.textContent = `Wind Speed: ${wind()}`

        console.log()

        function temperature() {
            let getTemp = data.main.temp
            let tempC = Math.floor(getTemp) - 273
            return tempC
        }

        function main() {
            let getM = data.weather[0].main
            return getM
        }

        function ves() {
            let getV = data.visibility
            return getV
        }

        function wind() {
            let getW = data.wind.speed
            return getW
        }

        let date = new Date;

        update_date.textContent = `Update time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

        console.log('перезапуск')
    })
    .catch(() => {
        alert('This city not found')
        city = 'London';
        init()
        searchInp.value = ''
    })
}

init()

setInterval(() => {
    init()
}, 10000) //Обновляет инфу каждые 10секунд