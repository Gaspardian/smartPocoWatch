var isCronoPaused = false;
window.onload = setInterval(Orologio, 1000);

window.addEventListener('load', onLoad);
function onLoad() {
    //menu
    let mtime = document.querySelector(".spTime");
    let mcrono = document.querySelector(".spCrono");
    let mweater = document.querySelector(".spMeteo");
    mtime.addEventListener('click', setMenuTime);
    mcrono.addEventListener('click', setMenuCrono);
    mweater.addEventListener('click', setMenuMeteo);

    //cronometro
    let startCrono = document.querySelector("#crono-start");
    let stopCrono = document.querySelector("#crono-stop");
    let resetCrono = document.querySelector("#crono-reset");
    startCrono.addEventListener('click', cronoStart);
    stopCrono.addEventListener('click', cronoStop);
    resetCrono.addEventListener('click', stReset);

    //weater - meteo
    let syncMeteo = document.querySelector('#getMeteo');
    syncMeteo.addEventListener('click', getMeteo);

}

/*-----------------settings menu------------------*/
function setMenuTime() {
    document.querySelector(".spTime").classList.add("active");
    document.querySelector(".spCrono").classList.remove("active");
    document.querySelector(".spMeteo").classList.remove("active");
    //----------------------//
    document.querySelector(".orologio").classList.add("active");
    document.querySelector(".crono").classList.remove("active");
    document.querySelector(".weather").classList.remove("active");
}
function setMenuCrono() {
    document.querySelector(".spTime").classList.remove("active");
    document.querySelector(".spCrono").classList.add("active");
    document.querySelector(".spMeteo").classList.remove("active");
    //----------------------//
    document.querySelector(".orologio").classList.remove("active");
    document.querySelector(".crono").classList.add("active");
    document.querySelector(".weather").classList.remove("active");
}
function setMenuMeteo() {
    document.querySelector(".spTime").classList.remove("active");
    document.querySelector(".spCrono").classList.remove("active");
    document.querySelector(".spMeteo").classList.add("active");
    //----------------------//
    document.querySelector(".orologio").classList.remove("active");
    document.querySelector(".crono").classList.remove("active");
    document.querySelector(".weather").classList.add("active");
}
var oraEsatta;
/*--------------------inizio orologio--------------------*/
function Orologio() {
    var d = new Date();
    var day_month = d.getDate();
    var day_week = d.getDay(); // 0 = domenica
    var month = d.getMonth()+1;
    var year = d.getFullYear();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var sec = d.getSeconds();
    // stampo giorni settimana
    var giorni = [
        "Sunday",  // 0
        "Monday",   // 1
        "Tuesday",  // 2
        "Wednesday",// 3
        "Thusday",  // 4
        "Friday",  // 5
        "Saturday"   // 6
    ]; // length = 7
    /*
    for(var i = 0; i < giorni.length; i++) {
    console.log(giorni[day_week]);
    }*/
    oraEsatta = hours;
    var correctDay = (day_month < 10) ? ("0" + day_month) : day_month;
    var correctMonth = (month < 10) ? ("0" + month) : month;
    document.querySelector(".calendario").innerHTML = `${correctDay} / ${correctMonth } / ${year}`;

    document.querySelector(".day").innerText = giorni[day_week];

    var correctOra = (hours < 10) ? ("0" + hours) : hours;
    var correctMinuti = (minutes < 10) ? ("0" + minutes) : minutes;
    var correctSec = (sec < 10) ? ("0" + sec) : sec;
    document.querySelector(".oretta").innerHTML = `${correctOra}:${correctMinuti}<span>:${correctSec}</span>`;
};
/*--------------------fine orologio--------------------*/

/*--------------------inizio cronometro--------------------*/
function stReset() {
    isCronoPaused = true;
    let timer = document.querySelector(".time");
    let minsecond = 0;
    let second = 0;
    let minuti = 0;
    if (minsecond == 0) {
        minsecond = "00";
    }
    if (second == 0) {
        second = "00";
    }
    if (minuti == 0) {
        minuti = "00";
    }
    // console.log(minuti + ":" + second + ":" + minsecond);
    timer.innerHTML = `${minuti}:${second}<span>:${minsecond}</span>`;
    let nomeStart = document.querySelector("#crono-start");
    let nomeStop = document.querySelector("#crono-stop");
    nomeStart.classList.add("active");
    nomeStop.classList.remove("active");
}

function cronoStop() {
    isCronoPaused = true;
}

function cronoStart(e) {
    if (isCronoPaused == true) {
        isCronoPaused = false;
    }
    let timer = document.querySelector(".time");
    let minsecond = 0;
    let second = 0;
    let minuti = 0;
    setInterval(function () {
        if (!isCronoPaused) {
            minsecond++;
            if (minsecond < 10) {
                minsecond = "0" + minsecond;
            } /*else if (minsecond < 100) {
                minsecond = "0" + minsecond;
            }*/ else if (minsecond > 99) {
                minsecond = 0;
                second++;
                if (second < 10) {
                    second = "0" + second;
                } else if (second > 59) {
                    second = 0;
                    minuti++;
                    if (minuti < 10) {
                        minuti = "0" + minuti;
                    }
                }
            }
        } else {
            e.preventDefault();
            minsecond = 0;
            second = 0;
            minuti = 0;
            return;
        }
        if (minsecond == 0) {
            minsecond = "00";
        }
        if (second == 0) {
            second = "00";
        }
        if (minuti == 0) {
            minuti = "00";
        }
        // console.log(minuti + ":" + second + ":" + minsecond);
        timer.innerHTML = `${minuti}:${second}<span>:${minsecond}</span>`;
    }, 10);
    let nomeStart = document.querySelector("#crono-start");
    let nomeStop = document.querySelector("#crono-stop");
    nomeStart.classList.remove("active");
    nomeStop.classList.add("active");
}
/*--------------------fine cronometro--------------------*/

/*--------------------inizio meteo--------------------*/
function getMeteo() {
    let citta = document.querySelector('#city').value
    var httpReq = new XMLHttpRequest();
    httpReq.open(
        "GET", // method = GET, POST, ecc
        "https://api.openweathermap.org/data/2.5/weather?q=" + citta  +"&units=metric&appid=3ff40633eef2d9426e8b8cddc7fab9c1",  // URL
        true // paramtro bool async o no (default true)
    );
    httpReq.send();
    httpReq.onreadystatechange = function() {

        // console.log('cambio stato');

        // controllo se la chiamata è andata a buon fine
        if (httpReq.readyState == 4 && httpReq.status == 200) {

            // se la chiamata è ok eseguo le operazioni qui sotto

            console.log('RISPOSTA OK', httpReq.responseText); // Risposta di tipo JSON - JavaScript Object Notation

            let risposta = JSON.parse(httpReq.responseText); // Trasformo la stringa in JSON (in oggetto)

            let temperatura = (risposta.main.temp).toFixed(1);

            let umidita = risposta.main.humidity;

            let vento = risposta.wind.deg;
            console.log(vento);
            if(vento >= 338 || vento < 23 || vento == 0){
                document.querySelector('#wind').setAttribute('src', 'images/windrose_N.png');
            }else if(vento >= 23 && vento < 68){
                document.querySelector('#wind').setAttribute('src', 'images/windrose_NE.png');
            }else if(vento >= 68 && vento < 113){
                document.querySelector('#wind').setAttribute('src', 'images/windrose_E.png');
            }else if(vento >= 113 && vento < 158){
                document.querySelector('#wind').setAttribute('src', 'images/windrose_SE.png');
            }else if(vento >= 158 && vento < 203){
                document.querySelector('#wind').setAttribute('src', 'images/windrose_S.png');
            }else if(vento >= 203 && vento < 248){
                document.querySelector('#wind').setAttribute('src', 'images/windrose_SW.png');
            }else if(vento >= 248 && vento < 293){
                document.querySelector('#wind').setAttribute('src', 'images/windrose_W.png');
            }else if(vento >= 293 && vento < 338){
                document.querySelector('#wind').setAttribute('src', 'images/windrose_NW.png');
            }

            let previsioni = risposta.weather[0].main;
            console.log(previsioni);
            if(previsioni == "Clear"){
                if(oraEsatta > 5  && oraEsatta < 18){
                    document.querySelector('#sun_cloud').setAttribute('src', 'images/sun.png');
                }else{
                    document.querySelector('#sun_cloud').setAttribute('src', 'images/clear_night.png');
                }
            }else if(previsioni == "Clouds"){
                document.querySelector('#sun_cloud').setAttribute('src', 'images/cloud.png');
            }else if(previsioni == "Snow"){
                document.querySelector('#sun_cloud').setAttribute('src', 'images/snow.png');
            }else if(previsioni == "Rain"){
                document.querySelector('#sun_cloud').setAttribute('src', 'images/rain-cloud.png');
            }else if(previsioni == "Thunderstorm"){
                document.querySelector('#sun_cloud').setAttribute('src', 'images/thunder.png');
            }else if(previsioni == "Mist" || previsioni == "Fog" || previsioni == "Haze"){
                document.querySelector('#sun_cloud').setAttribute('src', 'images/fog.png');
            }

            document.querySelector('#temp_value').innerText = temperatura + "°C";

            document.querySelector('#humid_value').innerText = umidita + "%";
            
        }
         if(httpReq.readyState == 4 && httpReq.status == 404){
            document.querySelector('#city').value = "CITY NOT FOUND";
        }
        if(httpReq.readyState == 4 && httpReq.status == 400){
            document.querySelector('#city').value = "INSERT A CITY";
        }
    };
}
/*--------------------fine meteo--------------------*/
/*--------------------inizio resize screen--------------------*/
calculateNewScale();
window.addEventListener("resize",calculateNewScale); 

function calculateNewScale() {
    if (window.innerWidth < 645) {
        var percentuale = window.innerWidth / 645;
        document.querySelector("body").style.transform = "scale(" + percentuale + ")";
        document.querySelector(".quadrante .montante").style.transform =  "scale(" + 1 / percentuale + ")";//per non coinvolgere l'immagine del montante nel resize
    }
}
/*--------------------fine resize screen--------------------*/