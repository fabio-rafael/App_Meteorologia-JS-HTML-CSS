const key = "582991355e6dd54a3c93a5a09c13fcab";


function info_card(dados){
  const bandeiras = `https://flagsapi.com/${dados.sys.country}/flat/24.png`;
  
  document.querySelector(".local").innerHTML = `${dados.name} <img class="bandeira" src="${bandeiras}" alt="Bandeira">`;
  document.querySelector(".temperatura").innerHTML = Math.round(dados.main.temp) + " ºC";
  document.querySelector(".descricao").innerHTML = dados.weather[0].description;
  document.querySelector(".humidade").innerHTML = "Humidade: " + dados.main.humidity + " %";
  document.querySelector(".icon").src = `/Icones/Icones/w_ic_d_${dados.weather[0].icon}anim.svg`;


}

async function getInfo(local) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${local}&appid=${key}&lang=pt&units=metric`);
    const dados = await response.json();
    console.log(dados);
    if (response.ok) {
      handleError(null, response.status); // Passa null como mensagem para ocultar qualquer mensagem anterior
      info_card(dados);
    } else {
      handleError(dados.message, response.status);
    }
  } catch (error) {
    handleError("Ocorreu um erro durante a solicitação.", 500); 
  }
}


function buttonClick(){
  const local = document.querySelector(".location").value ;
  getInfo(local);
}

function handleError(message, statusCode) {
  const errorContainer = document.querySelector(".erro");

  
  if (statusCode === 404) {
    errorContainer.innerHTML = "Nome de cidade inválido";
    errorContainer.style.display = "block"; // Mostra a mensagem de erro
  } else {
    errorContainer.style.display = "none"; // Esconde a mensagem de erro
  }

  // Limpa as informações de clima
  document.querySelector(".local").innerHTML = "";
  document.querySelector(".temperatura").innerHTML = "";
  document.querySelector(".descricao").innerHTML = "";
  document.querySelector(".humidade").innerHTML = "";
  document.querySelector(".icon").src = "";
}
