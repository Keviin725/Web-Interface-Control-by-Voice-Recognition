import { defineStore } from "pinia";

export const useCommandStore = defineStore('command',{

  state: () => ({
    voiceCommands:{},
    commands : [
      {
        name: 'Previsão do tempo', // Command name
        description: 'Retorna a previsão do tempo atual para a localização do usuário', // Description of the command
        execute: async function() {
          if (navigator.geolocation) { // Check if the browser supports geolocation
            try {
              const position = await new Promise((resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject)
              ); // Get the user's current position
              const lat = position.coords.latitude; // Latitude of the user's position
              const lon = position.coords.longitude; // Longitude of the user's position
              const apiKey = process.env.WEATHER_API_KEY; // API key for the weather service
              const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=pt&units=metric`); // Fetch weather data
              const data = await response.json(); // Parse the response as JSON
              const temperature = data.main.temp; // Current temperature
              const feelsLike = data.main.feels_like; // Feels-like temperature
              const humidity = data.main.humidity; // Humidity level
              const windSpeed = data.wind.speed; // Wind speed
              const description = data.weather[0].description; // Weather description
              const city = data.name; // City name
              const country = data.sys.country; // Country code
              const countryName = await getCountryName(country); // Get the country name
              this.$emit('command-executed', { type: 'weather', data: data });
              return `A temperatura atual em ${city}, ${countryName} é de ${temperature} graus Celsius, com sensação térmica de ${feelsLike} graus Celsius. A umidade relativa do ar é de ${humidity} por cento e a velocidade do vento é de ${windSpeed} metros por segundo. O tempo está ${description}.`; // Return the weather information
            } catch (error) {
              console.error(error); // Log any errors
              return 'Não foi possível obter a sua localização.'; // Return an error message
            }
          } else {
            return 'Geolocalização não é suportada por este navegador.'; // Return a message if geolocation is not supported
          }
        }
      },
      {
        name: 'Abrir câmera',
        description: 'Abre a câmera do usuário',
        execute: async function() {
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            return 'Seu navegador não suporta a abertura da câmera.';
          }
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const videoElement = document.querySelector('video');
            videoElement.srcObject = stream;
            videoElement.play();
            return 'Câmera aberta com sucesso.';
          } catch (error) {
            console.error('Error opening camera:', error);
            return 'Não foi possível abrir a câmera.';
          }
        },
      },
      {
        name: 'Capturar imagem',
        description: 'Captura uma imagem da câmera do usuário',
        execute: async function() {
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            return 'Seu navegador não suporta a captura de imagens da câmera.';
          }
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const videoElement = document.querySelector('video');
            videoElement.srcObject = stream;
            await new Promise(resolve => videoElement.onloadedmetadata = resolve);
            videoElement.play();

            // Aguarde um pouco para a câmera se ajustar
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Crie um elemento canvas
            const canvas = document.createElement('canvas');
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;

            // Desenhe a imagem atual do vídeo no canvas
            const context = canvas.getContext('2d');
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

            // Obtenha a imagem como uma string de dados
            const imageData = canvas.toDataURL('image/png');

            // Pare o stream da câmera
            stream.getTracks().forEach(track => track.stop());

            return 'Imagem capturada com sucesso.';
          } catch (error) {
            console.error('Error capturing image:', error);
            return 'Não foi possível capturar a imagem.';
          }
        },
      },
      {
        name: 'Consultar Notícias', // Command name
        description: 'Exibe as principais notícias do dia', // Description of the command
        execute: async function() {
          const apiKey = process.env.NEWS_API_KEY; // API key for the news service

          // Get the user's current position
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          // Get the country using a reverse geocoding service
          const responseGeo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=pt`);
          const dataGeo = await responseGeo.json();
          const country = dataGeo.countryCode; // Country code from the geocoding service

          const url = `https://newsdata.io/api/1/news?country=${country}&apiKey=${apiKey}`; // URL for fetching news

          try {
            const response = await fetch(url); // Fetch news data
            const data = await response.json(); // Parse the response as JSON
            if (data.articles) {
              return data.articles.map(article => article.title).join('\n'); // Return the titles of the articles
            } else {
              console.error('Unexpected response from the API:', data); // Log any unexpected responses
              return 'Não foi possível obter as notícias.'; // Return an error message
            }
          } catch (error) {
            console.error('Error fetching news:', error); // Log any errors
            return 'Não foi possível obter as notícias.'; // Return an error message
          }
        }
      },
      {
        name: 'Enviar Mensagem para', // Command name
        description: 'Envia uma mensagem para um contato específico através do WhatsApp', // Description of the command
        execute: function(contact, message) {
          const encodedMessage = encodeURIComponent(message); // Encode the message
          const url = `https://api.whatsapp.com/send?phone=${contact}&text=${encodedMessage}`; // URL for sending the message
          window.open(url); // Open the URL in a new tab
        }
      },
      {
        name: 'Procurar no Google', // Command name
        description: 'Realiza uma pesquisa no Google pelo termo fornecido', // Description of the command
        execute: function(term) {
          console.log(`Pesquisando o termo: ${term}`); // Log the search term
          const url = `https://www.google.com/search?q=${encodeURIComponent(term)}`; // URL for the Google search
          console.log(`Abrindo a URL: ${url}`); // Log the URL
          window.open(url); // Open the URL in a new tab
        }
      },
      {
        name: 'Reproduzir Vídeo no YouTube', // Command name
        description: 'Abre e reproduz um vídeo específico no YouTube', // Description of the command
        execute: function(video) {
          const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(video)}`; // URL for the YouTube search
          window.open(url); // Open the URL in a new tab
        }
      },
      {
        name: 'Enviar E-mail', // Command name
        description: 'Redige e envia um e-mail para um destinatário específico com o assunto fornecido', // Description of the command
        execute: function(recipient, subject) {
          const url = `mailto:${recipient}?subject=${encodeURIComponent(subject)}`; // URL for composing the email
          window.open(url); // Open the URL in a new tab
        }
      },
      {
        name: 'Ligar para', // Command name
        description: 'Realiza uma chamada telefônica para um contato específico', // Description of the command
        execute: function(contact) {
          const url = `tel:${contact}`; // URL for making the call
          window.open(url); // Open the URL in a new tab
        }
      },
    ]
  }),

  actions: {
    setVoiceCommands(commands) {
      this.voiceCommands = commands;
    }
  }
})
