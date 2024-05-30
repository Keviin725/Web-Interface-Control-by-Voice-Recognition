export const commands = [
  {
    name: 'previsão do tempo.',
    description: 'Retorna a previsão do tempo atual para a localização do usuário',
    execute: async function() {
      if (navigator.geolocation) {
        try {
          const position = await new Promise((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject)
          );
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const apiKey = process.env.WEATHER_API_KEY;
          const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=pt&units=metric`);
          const data = await response.json();
          const temperature = data.main.temp;
          const feelsLike = data.main.feels_like;
          const humidity = data.main.humidity;
          const windSpeed = data.wind.speed;
          const description = data.weather[0].description;
          return `A temperatura atual é de ${temperature} graus Celsius, mas a sensação térmica é de ${feelsLike} graus. A umidade é de ${humidity}% e a velocidade do vento é de ${windSpeed} m/s. ${description}`;
        } catch (error) {
          console.error(error);
          return 'Não foi possível obter a sua localização.';
        }
      } else {
        return 'Geolocalização não é suportada por este navegador.';
      }
    }
  },
  {
    name: 'voltar',
    description: 'Navega para a página anterior',
    execute: function() {
      this.$router.go(-1);
    }
  },
  {
    name: 'Enviar Mensagem',
    description: 'Envia uma mensagem para um contato específico através do WhatsApp',
    execute: function(contact, message) {
      const url = `https://api.whatsapp.com/send?phone=${contact}&text=${encodeURIComponent(message)}`;
      window.open(url);
    }
  },
  {
    name: 'Navegação Hands-Free',
    description: 'Inicia a navegação para um destino específico usando Google Maps',
    execute: function(destination) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
      window.open(url);
    }
  },
  {
    name: 'Tocar Playlist Favorita',
    description: 'Reproduz uma playlist de música predefinida no Spotify',
    execute: function() {
      const playlistId = 'your_playlist_id';
      const url = `https://open.spotify.com/playlist/${playlistId}`;
      window.open(url);
    }
  },
  {
    name: 'Ligar para um Contato',
    description: 'Realiza uma chamada telefônica para um contato específico',
    execute: function(contact) {
      const url = `tel:${contact}`;
      window.open(url);
    }
  },
  {
    name: 'Enviar E-mail',
    description: 'Redige e envia um e-mail para um destinatário específico com o assunto fornecido',
    execute: function(recipient, subject) {
      const url = `mailto:${recipient}?subject=${encodeURIComponent(subject)}`;
      window.open(url);
    }
  },
  {
    name: 'Consultar Notícias',
    description: 'Exibe as principais notícias do dia',
    execute: async function() {
      const apiKey = 'your_news_api_key';
      const url = `https://newsapi.org/v2/top-headlines?country=br&apiKey=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        return data.articles.map(article => article.title).join('\n');
      } catch (error) {
        console.error('Error fetching news:', error);
        return 'Não foi possível obter as notícias.';
      }
    }
  },
  {
    name: 'Navegar para',
    description: 'Navega para uma tela específica do aplicativo',
    execute: function(routeName) {
      this.$router.push({ name: routeName });
    }
  },
  {
    name: 'Procurar no Google',
    description: 'Realiza uma pesquisa no Google pelo termo fornecido',
    execute: function(term) {
      console.log(`Pesquisando o termo: ${term}`);
      const url = `https://www.google.com/search?q=${encodeURIComponent(term)}`;
      console.log(`Abrindo a URL: ${url}`);
      window.open(url);
    }
  },
  {
    name: 'Reproduzir Vídeo no YouTube',
    description: 'Abre e reproduz um vídeo específico no YouTube',
    execute: function(video) {
      const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(video)}`;
      window.open(url);
    }
  }
];

export default commands;
