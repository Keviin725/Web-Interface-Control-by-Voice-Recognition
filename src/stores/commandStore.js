import { defineStore } from "pinia";

export const useCommandStore = defineStore("command", {
  state: () => ({
    voiceCommands: {},
    commands: [
      {
        id: "weather",
        name: "Previsão do tempo",
        description:
          "Retorna a previsão do tempo atual para a localização do usuário",
        icon: "cloud",
        category: "util",
        visible: true,
        async execute(payload) {
          if (!navigator.geolocation)
            return "Geolocalização não é suportada por este navegador.";
          try {
            const position = await new Promise((resolve, reject) =>
              navigator.geolocation.getCurrentPosition(resolve, reject)
            );
            const { latitude: lat, longitude: lon } = position.coords;
            const apiKey = process.env.WEATHER_API_KEY;
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=pt&units=metric`
            );
            const data = await response.json();
            return `A temperatura atual em ${data.name}, ${data.sys.country} é de ${data.main.temp}°C, sensação térmica de ${data.main.feels_like}°C. Umidade: ${data.main.humidity}%. Vento: ${data.wind.speed} m/s. Tempo: ${data.weather[0].description}.`;
          } catch (error) {
            console.error(error);
            return "Não foi possível obter a sua localização.";
          }
        },
      },
      {
        id: "navigate",
        name: "Navegar para",
        description: "Navega para uma tela específica do aplicativo",
        icon: "navigation",
        category: "navegação",
        visible: true,
        execute({ url }) {
          window.open(url, "_blank");
        },
      },
      {
        id: "camera-open",
        name: "Abrir câmera",
        description: "Abre a câmera do usuário",
        icon: "camera_alt",
        category: "media",
        visible: true,
        async execute() {
          if (!navigator.mediaDevices?.getUserMedia)
            return "Seu navegador não suporta a abertura da câmera.";
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              video: true,
            });
            const videoElement = document.querySelector("video");
            videoElement.srcObject = stream;
            videoElement.play();
            return "Câmera aberta com sucesso.";
          } catch (error) {
            console.error(error);
            return "Não foi possível abrir a câmera.";
          }
        },
      },
      {
        id: "capture-image",
        name: "Capturar imagem",
        description: "Captura uma imagem da câmera do usuário",
        icon: "photo_camera",
        category: "media",
        visible: true,
        async execute() {
          if (!navigator.mediaDevices?.getUserMedia)
            return "Seu navegador não suporta captura de imagens.";
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              video: true,
            });
            const videoElement = document.querySelector("video");
            videoElement.srcObject = stream;
            await new Promise(
              (resolve) => (videoElement.onloadedmetadata = resolve)
            );
            videoElement.play();
            await new Promise((r) => setTimeout(r, 2000));
            const canvas = document.createElement("canvas");
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            canvas
              .getContext("2d")
              .drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            stream.getTracks().forEach((track) => track.stop());
            return "Imagem capturada com sucesso.";
          } catch (error) {
            console.error(error);
            return "Não foi possível capturar a imagem.";
          }
        },
      },
      {
        id: "news",
        name: "Consultar Notícias",
        description: "Exibe as principais notícias do dia",
        icon: "article",
        category: "informação",
        visible: true,
        async execute() {
          const apiKey = process.env.NEWS_API_KEY;
          try {
            const position = await new Promise((resolve, reject) =>
              navigator.geolocation.getCurrentPosition(resolve, reject)
            );
            const geoRes = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=pt`
            );
            const geoData = await geoRes.json();
            const country = geoData.countryCode;
            const newsRes = await fetch(
              `https://newsdata.io/api/1/news?country=${country}&apiKey=${apiKey}`
            );
            const newsData = await newsRes.json();
            return (
              newsData.articles?.map((a) => a.title).join("\n") ||
              "Não foi possível obter as notícias."
            );
          } catch (error) {
            console.error(error);
            return "Erro ao consultar notícias.";
          }
        },
      },
      {
        id: "whatsapp",
        name: "Enviar Mensagem para",
        description: "Envia uma mensagem via WhatsApp",
        icon: "chat",
        category: "comunicação",
        visible: true,
        execute({ contact, message }) {
          const url = `https://api.whatsapp.com/send?phone=${contact}&text=${encodeURIComponent(
            message
          )}`;
          window.open(url, "_blank");
        },
      },
      {
        id: "google-search",
        name: "Procurar no Google",
        description: "Realiza uma pesquisa no Google",
        icon: "search",
        category: "web",
        visible: true,
        execute({ term }) {
          const url = `https://www.google.com/search?q=${encodeURIComponent(
            term
          )}`;
          window.open(url, "_blank");
        },
      },
      {
        id: "youtube",
        name: "Reproduzir Vídeo no YouTube",
        description: "Abre e reproduz um vídeo específico no YouTube",
        icon: "play_circle",
        category: "media",
        visible: true,
        execute({ video }) {
          const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(
            video
          )}`;
          window.open(url, "_blank");
        },
      },
      {
        id: "email",
        name: "Enviar E-mail",
        description: "Redige e envia um e-mail com assunto",
        icon: "email",
        category: "comunicação",
        visible: true,
        execute({ recipient, subject }) {
          const url = `mailto:${recipient}?subject=${encodeURIComponent(
            subject
          )}`;
          window.open(url);
        },
      },
      {
        id: "call",
        name: "Ligar para",
        description: "Realiza uma chamada telefônica",
        icon: "call",
        category: "comunicação",
        visible: true,
        execute({ contact }) {
          const url = `tel:${contact}`;
          window.open(url);
        },
      },
    ],
  }),

  actions: {
    setVoiceCommands(commands) {
      this.voiceCommands = commands;
    },
    async getCountryName(countryCode) {
      const response = await fetch(
        `https://restcountries.com/v2/alpha/${countryCode}`
      );
      const country = await response.json();
      return country.name;
    },
  },
});
