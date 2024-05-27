export const commands = [
  {
    name: 'Previsão do Tempo',
    description: 'Retorna a previsão do tempo atual para a localização do usuário',
    execute: async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const apiKey = process.env.WEATHER_API_KEY;
          const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=pt&units=metric`);
          const data = await response.json();
          const temperature = data.main.temp;
          const description = data.weather[0].description;
          return `A temperatura atual é de ${temperature} graus Celsius. ${description}`;
        }, (error) => {
          console.error(error);
          return 'Não foi possível obter a sua localização.';
        });
      } else {
        return 'Geolocalização não é suportada por este navegador.';
      }
    }
  },

  {
    name: 'Enviar Mensagem',
    description: 'Envia uma mensagem para um contato específico através do WhatsApp',
    execute: (contact, message) => {
      const url = `https://api.whatsapp.com/send?phone=${contact}&text=${encodeURIComponent(message)}`;
      window.open(url);
    }
  },
  {
    name: 'Navegação Hands-Free',
    description: 'Inicia a navegação para um destino específico usando Google Maps',
    execute: (destination) => {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
      window.open(url);
    }
  },
  {
    name: 'Tocar Playlist Favorita',
    description: 'Reproduz uma playlist de música predefinida no Spotify',
    execute: () => {
      const playlistId = 'your_playlist_id';
      const url = `https://open.spotify.com/playlist/${playlistId}`;
      window.open(url);
    }
  },
  {
    name: 'Ligar para um Contato',
    description: 'Realiza uma chamada telefônica para um contato específico',
    execute: (contact) => {
      const url = `tel:${contact}`;
      window.open(url);
    }
  },
  /**
   * {
    name: 'Definir Alarme',
    description: 'Configura um alarme para o horário especificado',
    execute: (time) => {
      alert(`Alarme definido para ${time}`);
      // Aqui você pode implementar a lógica de configuração de alarme
    }
  },

  {
    name: 'Criar Lembrete',
    description: 'Adiciona um lembrete para uma tarefa específica em um determinado horário',
    execute: (task, time) => {
      alert(`Lembrete criado: ${task} às ${time}`);
      // Aqui você pode implementar a lógica de criação de lembrete
    }
  },
  {
    name: 'Consultar Agenda',
    description: 'Exibe os compromissos agendados para o dia atual',
    execute: () => {
      alert('Consultando agenda...');
      // Aqui você pode implementar a lógica de consulta da agenda
    }
  },
  {
    name: 'Abrir Aplicativo',
    description: 'Abre um aplicativo específico no dispositivo',
    execute: (app) => {
      alert(`Abrindo o aplicativo ${app}`);
      // Aqui você pode implementar a lógica de abertura de aplicativos
    }
  },
  {
    name: 'Controlar Dispositivos de Casa Inteligente',
    description: 'Controla dispositivos inteligentes conectados',
    execute: (device, action) => {
      alert(`${action} o dispositivo ${device}`);
      // Aqui você pode implementar a lógica de controle de dispositivos inteligentes
    }
  },*/
  {
    name: 'Enviar E-mail',
    description: 'Redige e envia um e-mail para um destinatário específico com o assunto fornecido',
    execute: (recipient, subject) => {
      const url = `mailto:${recipient}?subject=${encodeURIComponent(subject)}`;
      window.open(url);
    }
  },
  /**
   * {
    name: 'Anotar Nota Rápida',
    description: 'Adiciona uma nota rápida com o conteúdo especificado',
    execute: (content) => {
      alert(`Nota adicionada: ${content}`);
      // Aqui você pode implementar a lógica de adição de notas
    }
  },
   */
  {
    name: 'Consultar Notícias',
    description: 'Exibe as principais notícias do dia',
    execute: async () => {
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
    execute: (routeName) => {
      this.$router.push({ name: routeName });
    }
  },
  {
    name: 'Procurar no Google',
    description: 'Realiza uma pesquisa no Google pelo termo fornecido',
    execute: (term) => {
      const url = `https://www.google.com/search?q=${encodeURIComponent(term)}`;
      window.open(url);
    }
  },
  {
    name: 'Reproduzir Vídeo no YouTube',
    description: 'Abre e reproduz um vídeo específico no YouTube',
    execute: (video) => {
      const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(video)}`;
      window.open(url);
    }
  }
];



export default commands;
