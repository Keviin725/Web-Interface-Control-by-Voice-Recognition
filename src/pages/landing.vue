<template>
  <q-page class="text-white bg-dark" padding>


    <q-page-container>
      <!-- Hero Section -->
      <section class="q-mb-lg text-center">
        <h1 class="text-h4">Enhance your interface with voice.</h1>
        <p>Experience hands-free navigation and control.</p>
        <q-btn label="Activate now" color="orange-8" class="q-mr-md full-width" />
        <q-btn label="Explore commands" color="white" class="text-black full-width"/>
      </section>

        <!-- Features Section -->
        <section class="q-mb-lg">
          <q-card flat bordered class="q-pa-md bg-dark text-center">
            <q-card-section>
              <img src="/image-1.png" alt="Feature Image" />
              <h2 class="text-h5 q-mt-md">Introducing innovative feature</h2>
              <p>Discover the power of voice commands.</p>
              <q-btn label="Activate now" color="white" class="text-black full-width" />
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
              <q-btn label="Join now" color="primary" class="full-width" />
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
