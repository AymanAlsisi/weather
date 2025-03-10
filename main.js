const cityName = document.querySelector('#cityInp')
cityName.onkeydown = () => {
    document.querySelector(".body").innerHTML = `<div class="spiner"></div>`
}


const getFeatures = (city) => {
    if (city === "") {
        document.querySelector(".body").innerHTML =
            `<div class="empty">
                        <p class="empty-title">لم يتم تحديد مدينة أو منطقة بعد.</p>
                    </div>`
    } else {
        axios.get(`https://api.weatherapi.com/v1/current.json?key=f476f20e1f3f4638922212134242703&q=${city}&aqi=yes`)
            .then(res => {
                console.log(res.data)
                document.querySelector(".body").innerHTML =
                    `       <div class="location-info">
                                    <div class="names">
                                        <span class="city-name">${res.data.location.name}</span>
                                        <span class="region-name">${res.data.location.region}</span>
                                        <span class="country-name">${res.data.location.country}</span>
                                    </div>
                                    <p class="time">last updated: ${res.data.current.last_updated}</p>
                            </div>
                            <div class="weather-info">
                                <img src="https:${res.data.current.condition.icon}" alt="">
                                <span class="condition">${res.data.current.condition.text}</span>
                                <span class="temp">C<span class="circle">o</span>${res.data.current.temp_c}</span>
                                <span class="temp">المحسوسة C<span class="circle">o</span>${res.data.current.feelslike_c}</span>
                                <span class="wind">سرعة الرياح ${res.data.current.wind_kph} كم/س</span>
                                <span class="humidity">درجة الرطوبة ${res.data.current.humidity}%</span>
                            </div>`
            }).catch(rej => {
                console.log(rej)
                document.querySelector(".body").innerHTML =
                    `<div class="error">
                        <i class="fa fa-warning"></i>
                        <p>لم يتم العثور على المدينة أو المنطقة التي قمت بإدخالها.</p>
                        <p>أو قد يكون هناك مشكلة بالإتصال بالشبكة.</p>
                    </div>`
            })
    }
}

setInterval(() => { document.querySelector('.Loading').innerHTML += '.' }, 400)
setInterval(() => { document.querySelector('.Loading').innerHTML = 'Please wait' }, 1500)



getFeatures("")
