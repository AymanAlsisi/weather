window.onload = () => {
    if (!window.navigator.onLine) {
        offline()
    }
}


window.addEventListener("offline", () => { offline() })



const offline = () => {
    document.body.innerHTML =
        `<div class="offline-text">
        <h1>No Internet connection</h1>
        <ul>
            <li>Checking the connection...</li>
            <li>Checking the proxy and firewell</li>
            <button class="offline-btn" onclick="window.location.reload()">Reload</button>
        </ul>
        </div>
        <footer>


        <div class="footer-left">
            <p>+249 902854949</p>
            <p><a href="https://web.facebook.com/aiman.dabora?_rdc=1&_rdr" class="fa fa-facebook"></a></p>
            <p><a href="https://www.instagram.com/ayman_alsisi/" class="fa fa-instagram"></a></p>
            <p>aimandabora167@gmail.com</p>
        </div>
        <div class="footer-mid">
            <p>Data provided by</p>
            <a href="https://www.weatherapi.com/">www.weatherapi.com/</a>
        </div>
        <div class="footer-right">
            <p>Developer :</p>
            <p>Ayman Abdelaziz Elias Babekir</p>
            <p>Front-end web develper</p>
        </div>
    </footer>
        `
}

const cityName = document.querySelector('#cityInp')
cityName.onkeydown = () => {
    document.querySelector(".body").innerHTML = `<h1 class="Loading">Please wait</h1>`
}



const getFeatures = (city) => {
    if (city === "") {
        document.querySelector(".body").innerHTML =
                    `<div class="empty">
                        <h1 class="empty-title">No location selected yet.</h1>
                    </div>`
    } else {
        axios.get(`https://api.weatherapi.com/v1/current.json?key=8c7a7f622ff14c16a1f62741242601&q=${city}&aqi=yes`)
            .then(res => {
                console.log(res.data)
                document.querySelector(".body").innerHTML =
                    `<div class="location-info">
                                    <div class="location-names">
                                        <header class="city-name">${res.data.location.name}</header>
                                        <header class="region-name">${res.data.location.region}</header>
                                        <header class="country-name">${res.data.location.country}</header>
                                        </div>
                                    <p class="date">Last update: ${res.data.current.last_updated}</p>
                                </div>
                                <div class="weather-info">
                                    <img src="https:${res.data.current.condition.icon}" alt="">
                                    <header class="weather-condition">${res.data.current.condition.text}</header>
                                    <header class="weather-temp">${res.data.current.temp_c}<span>o</span>C</header>
                                    </div>`
            }).catch(rej => {
                console.log(rej)
                document.querySelector(".body").innerHTML =
                    `<div class="error">
                                <h1 class="error-title">Error!</h1>
                                <ul class="error-list">
                                <li>Maybe you entered unknown location.</li>
                                <li>Or There is an issue with the internet connection.</li>
                                </ul>
                                </div>`
            })
    }
}

setInterval(() => { document.querySelector('.Loading').innerHTML += '.' }, 400)
setInterval(() => { document.querySelector('.Loading').innerHTML = 'Please wait' }, 1500)



getFeatures("")