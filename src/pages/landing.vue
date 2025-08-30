<template>
  <q-page class="text-white bg-dark" padding>

    <q-page-container>
      <!-- Secção Hero -->
      <section class="q-mb-lg text-center">
        <h1 class="text-h3 text-bold">Melhore a sua interface com voz.</h1>
        <p>Experimente navegação e controlo sem mãos.</p>
        <q-btn size="20px" @click="toggleSpeechRecognition()" label="Ativar agora" color="warning" class="button-spaced button-rounded q-mr-md full-width" />
        <q-btn size="20px" to="/commands" label="Explorar comandos" color="white" class="button-rounded text-black full-width"/>
        <img src="/image-1.png" alt="Imagem de Destaque" />
      </section>

      <!-- Secção Funcionalidades -->
      <section class="q-mb-lg">
        <q-card flat bordered class="q-pa-md bg-dark text-center card-shadow">
          <q-card-section>
            <img src="/image-3.png" alt="Imagem de Funcionalidade" />
            <h2 class="text-h5 q-mt-md text-bold">Apresentando uma funcionalidade inovadora</h2>
            <p>A capacitar os utilizadores <br> com tecnologia de comandos de voz</p>
            <q-btn label="Ativar agora" color="warning" class="button-rounded text-black full-width" />
          </q-card-section>
        </q-card>
      </section>

      <!-- Secção Interface -->
      <section class="q-mb-lg">
        <q-card flat bordered class="q-pa-md bg-dark text-center">
          <q-card-section>
            <h2 class="text-h5 q-mt-md text-bold">A sua interface, a sua voz</h2>
            <p>Revolucione a sua experiência com tecnologia de reconhecimento de voz de ponta. Personalize os seus comandos e tome o controlo com o QuasarVoice.</p>
            <q-btn size="20px" label="Começar" color="white" class="button-rounded text-black full-width" />
            <img src="/image-2.png" alt="Imagem de Funcionalidade" />
          </q-card-section>
        </q-card>
      </section>

      <!-- Secção Controlo por Voz -->
      <section class="q-mb-lg">
        <q-card flat bordered class="q-pa-md bg-dark text-center">
          <q-card-section>
            <h2 class="text-h5 q-mt-md text-bold">Controlo por voz ao seu alcance</h2>
            <p>Ferramenta eficiente que revoluciona a interação. Otimize o seu fluxo de trabalho com comandos de voz personalizados. Experimente o futuro do controlo de interfaces.</p>
            <q-btn size="20px" label="Começar" color="white" class="button-rounded text-black full-width" />
          </q-card-section>
        </q-card>
      </section>

      <!-- Secção Comunidade -->
      <section class="q-mb-lg">
        <q-card flat bordered class="q-pa-md text-center bg-dark">
          <q-card-section>
            <img src="/image-4.png" alt="Imagem de Funcionalidade" />
            <h2 class="text-h5 text-center text-bold">Junte-se à nossa comunidade de voz</h2>
            <ol>
              <li>Conecte-se com o nosso especialista para uma sessão de configuração de voz.</li>
              <li>Receba um pacote de comandos de voz personalizado.</li>
              <li>Voilà! A sua interface controlada por voz está pronta.</li>
            </ol>
            <q-btn size="20px" label="Juntar-se agora" color="white" class="button-rounded text-black full-width" />
          </q-card-section>
        </q-card>
      </section>

      <!-- Secção Testemunhos -->
      <section class="q-mb-lg">
        <q-card flat bordered class="q-pa-md bg-dark text-center">
          <q-card-section>
            <h2 class="text-h5 q-mt-md text-bold">Testemunhos de utilizadores</h2>
            <p>"QuasarVoice é uma mudança de paradigma!" - Alexa Fox, Gestora de Produto, VoiceTech</p>
            <q-rating value="5" readonly color="primary" />
          </q-card-section>
        </q-card>
      </section>

      <!-- Secção Final -->
      <section class="q-mb-lg">
        <q-card flat bordered class="q-pa-md bg-dark text-center">
          <q-card-section>
            <img src="/image-3.png" alt="Imagem de Funcionalidade" />
            <h2 class="text-h3 q-mt-md text-bold">Comece a usar o QuasarVoice hoje</h2>
            <p>Experimente o controlo por voz em ação</p>
            <q-btn size="20px" label="Ativar agora" color="warning" class="button-rounded text-black full-width" />
          </q-card-section>
        </q-card>
      </section>

    </q-page-container>

  </q-page>
</template>

<script>
import { voiceMixin } from 'src/mixins/voiceMixin';
export default {
  mixins: [voiceMixin],
  methods: {
    startVoiceCommand() {
      console.log("Iniciar comando de voz");
    }
  }
}
</script>

<style>
.bg-dark {
  background-color: #000000;
}
.button-spaced {
  margin-bottom: 20px;
}

.card-shadow {
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
}

.full-width {
  width: 100%;
}

@media (min-width: 768px) {
  .text-center {
    max-width: 375px;
    margin: 0 auto;
  }
}

.text-white {
  color: white;
}

.text-center {
  text-align: center;
}

.q-card {
  background-color: #1a1a1a;
  color: white;
  border: 1px solid #666;
  border-radius: 20px;
}

.button-rounded {
  border-radius: 20px;
}
</style>
