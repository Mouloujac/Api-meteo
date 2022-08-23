
let MainContainer = ultimateHTMLGenerator("div",null,["container","mt-5"],"MainContainer",document.body);
let MainRow = ultimateHTMLGenerator("div",null,["row"],"MainRow",MainContainer);
let CardBody =ultimateHTMLGenerator("div",null,["Card"],"CardBody",MainRow);


let WeatherData; // Stockera le JSON
let APIKey = "9588f0efcbaac5b879f57fd3b25ebe26"; // Clé API à transmettre


//Fonction de création d'éléments HTML
function ultimateHTMLGenerator(typeElement, contenu, tableauClassCss, id, destinationElement) {
    
    // on crée un élément html donné en paramètre (1er paramètre)
    var ultimateElement = document.createElement(typeElement);
    // on attribut du contenu (paramètre 2) à l'element html précedement fabriqué
    if (contenu != null){
        ultimateElement.textContent = contenu;
    }
    // on souhaite ajouter plusieurs class CSS à l'element html précedement créé
    for (var i = 0; i < tableauClassCss.length; i++) {
        // on ajoute la class css contenu dans le tableau de class css passé en paramètre 3
        ultimateElement.classList.add(tableauClassCss[i]);
    }
    if (id != null){
        ultimateElement.id = id;
    }
    if (destinationElement != null){
    // on fait apparaitre l'element dans celui passé en 4ème paramètre
        destinationElement.appendChild(ultimateElement);
    }
    return ultimateElement; 
}


/*Creation de cartes*/
function displayResult() {
    
    
    CardBody.innerHTML = "";


    let cityName = document.createElement('h1')
    cityName.classList.add('card-header')
    CardBody.appendChild(cityName)
    cityName.textContent = WeatherData.name;

    let cityWeather = document.createElement('p')
    cityWeather.classList.add("list")
    //CardBody.appendChild(cityWeather)
    cityWeather.textContent = WeatherData.weather[0].description;

    if(cityWeather.textContent === "couvert" || cityWeather.textContent === "peu nuageux" || cityWeather.textContent === "partiellement nuageux" || cityWeather.textContent === "nuageux"){
        
        let customImg = document.createElement('img');
        customImg.src = "https://raw.githubusercontent.com/basmilius/weather-icons/e715b4abd91a32877be6f075428fe7bc22e80031/design/line/final/cloudy.svg";
        CardBody.appendChild(customImg);  
    
    }else if(cityWeather.textContent === "légère pluie" ){
        let customImg = document.createElement('img');
        customImg.src = "https://raw.githubusercontent.com/basmilius/weather-icons/e715b4abd91a32877be6f075428fe7bc22e80031/design/line/final/rain.svg";
        CardBody.appendChild(customImg); 

    }else if(cityWeather.textContent === "ciel dégagé"){
        let customImg = document.createElement('img');
        customImg.src = "https://raw.githubusercontent.com/basmilius/weather-icons/e715b4abd91a32877be6f075428fe7bc22e80031/design/line/final/clear-day.svg";
        CardBody.appendChild(customImg); 

    }else if(cityWeather.textContent === "légères chutes de neige"){
        let customImg = document.createElement('img');
        customImg.src = "https://raw.githubusercontent.com/basmilius/weather-icons/e715b4abd91a32877be6f075428fe7bc22e80031/design/line/final/snow.svg";
        CardBody.appendChild(customImg); 

    }else if(cityWeather.textContent === "brume" ){
        let customImg = document.createElement('img');
        customImg.src = "https://raw.githubusercontent.com/basmilius/weather-icons/e715b4abd91a32877be6f075428fe7bc22e80031/design/fill/final/mist.svg";
        CardBody.appendChild(customImg); 

    }

    let cityTemp = document.createElement('p')
    cityTemp.classList.add("list")
    CardBody.appendChild(cityTemp)
    cityTemp.textContent ="Température: " + WeatherData.main.temp + " °C";

    let cityRes = document.createElement('p')
    cityRes.classList.add("list")
    CardBody.appendChild(cityRes)
    cityRes.textContent = "Ressenti: " + WeatherData.main.feels_like +' °C';

    let cityHumi = document.createElement('p')
    cityHumi.classList.add("list-item")
    CardBody.appendChild(cityHumi)
    cityHumi.textContent = "Humidité: " + WeatherData.main.humidity + " %";

    let cityWind = document.createElement('p')
    cityWind.classList.add("list")
    CardBody.appendChild(cityWind)
    cityWind.textContent = "Vent: " + WeatherData.wind.speed + ' km/h';
}




var input = "";

function getValue() {
    
    // Sélectionner l'élément input et récupérer sa valeur
    let input = document.getElementById("input-fichier").value;
    // Afficher la valeur
    console.log(input);
    // connexion a l'api grace a xhr
    xhr.open("GET","http://api.openweathermap.org/data/2.5/weather?q="+input+"&appid="+APIKey+"&units=metric&lang=fr", true);

    xhr.send();
}

// On crée une nouvelle instance d'un objet
let xhr = new XMLHttpRequest();

xhr.onreadystatechange = function(){ // on modifie l'attribut onreadystatechange de notre requête qui permet d'exécuter du code en fonction du changement d'état de la requête
    
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){ // Si la requête se termine
        
        WeatherData = JSON.parse(xhr.responseText); // on récupère le résultat de la requête dans l'objet indiqué, et on la convertit en objet JSON
        displayResult();

        console.log(WeatherData);
    }
} 




