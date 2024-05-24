<template>
  <q-page class="text-white bg-dark" padding>


    <q-page-container>
      <!-- Hero Section -->
      <section class="q-mb-lg text-center">
        <h1 class="text-h3 text-bold">Enhance your interface with voice.</h1>
        <p>Experience hands-free navigation and control.</p>
        <q-btn label="Activate now" color="orange-7" class="q-mr-md full-width" />
        <q-btn label="Explore commands" color="white" class="text-black full-width"/>
        <img src="/image-1.png" alt="Feature Image" />
      </section>

        <!-- Features Section -->
        <section class="q-mb-lg">
          <q-card flat bordered class="q-pa-md bg-dark text-center">
            <q-card-section>
              <img src="/image-3.png" alt="Feature Image" />
              <h2 class="text-h5 q-mt-md">Introducing innovative feature</h2>
              <p>Empowering users <br> with voice commands technology</p>
              <q-btn label="Activate now" color="orange-7" class="text-black full-width" />
            </q-card-section>
          </q-card>
        </section>

        <!-- Your Interface Section -->
        <section class="q-mb-lg">
          <q-card flat bordered class="q-pa-md bg-dark text-center">
            <q-card-section>
              <h2 class="text-h5 q-mt-md">Your interface, your voice</h2>
              <p>Revolutionize your experience with cutting-edge speech recognition technology. Customize your commands and take control with QuasarVoice.</p>
              <q-btn label="Get started" color="white" class="text-black" />
              <img src="/image-2.png" alt="Feature Image" />
            </q-card-section>
          </q-card>
        </section>
        <!-- Your Voice Section -->
        <section class="q-mb-lg">
          <q-card flat bordered class="q-pa-md bg-dark text-center">
            <q-card-section>
              <h2 class="text-h5 q-mt-md">Voice control at your fingertips</h2>
              <p>Efficient tool that revolutionizes interaction. Optimize your workflow with personalized voice commands. Experience the future of interface control.</p>
              <q-btn label="Get started" color="white" class="text-black" />

            </q-card-section>
          </q-card>
        </section>

        <!-- Voice Community Section -->
        <section class="q-mb-lg">
          <q-card flat bordered class="q-pa-md bg-dark">
            <q-card-section>
              <h2 class="text-h5 text-center">Join our voice community</h2>
              <ol>
                <li>Connect with our specialist for a voice setup session.</li>
                <li>Receive a tailored voice command package.</li>
                <li>Voilà! Your voice-controlled interface is ready.</li>
              </ol>
              <q-btn label="Join now" color="white" class="text-black full-width" />
            </q-card-section>
          </q-card>
        </section>

        <!-- Testimonials Section -->
        <section class="q-mb-lg">
          <q-card flat bordered class="q-pa-md bg-dark text-center">
            <q-card-section>
              <h2 class="text-h5 q-mt-md">User testimonials</h2>
              <p>"QuasarVoice is a game changer!" - Alexa Fox, Product Manager, VoiceTech</p>
              <q-rating value="5" readonly color="primary" />
            </q-card-section>
          </q-card>
        </section>

        <section class="q-mb-lg">
          <q-card flat bordered class="q-pa-md bg-dark text-center">
            <q-card-section>
              <img src="/image-3.png" alt="Feature Image" />
              <h2 class="text-h3 q-mt-md text-bold">Start using QuasarVoice today</h2>
              <p>Experience voice control in action</p>
              <q-btn label="Activate now" color="orange-7" class="text-black full-width" />
            </q-card-section>
          </q-card>
        </section>

    </q-page-container>

  </q-page>
</template>

<script>
export default {
  methods: {
    startVoiceCommand() {
      console.log("Starting voice command");
    }
  }
}
</script>

<style>
.bg-dark {
  background-color: #000000;
}

.full-width {
  width: 100%;
}

.text-white {
  color: white;
}

.text-center {
  text-align: center;
}
.q-card{
  background-color: #1a1a1a;
  color: white;
  border: 1px solid #666;
}
</style>
