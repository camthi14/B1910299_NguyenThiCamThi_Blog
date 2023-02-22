<script>
import { defineComponent } from "vue";
import image from "../../../public/img/Ashley can cook.png";

export default defineComponent({
  setup() {
    const messages = [
      {
        from: "You",
        message: `Sure, I'll see you later.`,
        time: "10:42am",
        color: "deep-purple-lighten-1",
      },
      {
        from: "John Doe",
        message: "Yeah, sure. Does 1:00pm work?",
        time: "10:37am",
        color: "green",
      },
      {
        from: "You",
        message: "Did you still want to grab lunch today?",
        time: "9:47am",
        color: "deep-purple-lighten-1",
      },
    ];
    return {
      image,
      messages,
    };
  },
});
</script>

<template>
  <v-card>
    <v-row
      class="d-flex mx-auto"
      style="justify-content: center; margin-top: 20px"
    >
      <v-col>
        <div justify="center" class="text-center mt-1">
          <v-avatar class="" color="grey-darken-1" size="150">
            <img :src="image" alt="" class="img-avt" />
          </v-avatar>

          <v-card-item>
            <v-card-title>Về chúng tôi</v-card-title>

            <v-card-subtitle>
              <span class="me-1">Mykitches Ashley</span>

              <v-icon
                color="error"
                icon="mdi-fire-circle"
                size="small"
              ></v-icon>
            </v-card-subtitle>
          </v-card-item>
        </div>
        <v-card-text class="text-center">
          <div>
            <v-btn
              class="ma-2"
              style="height: 40px"
              href="https://www.facebook.com/"
              icon="mdi-facebook"
              color="primary"
            ></v-btn>
            <v-btn
              class="ma-2"
              style="height: 40px"
              href="https://www.instagram.com/"
              icon="mdi-instagram"
              color="secondary"
            ></v-btn>
            <v-btn
              class="ma-2"
              style="height: 40px"
              href="https://translate.google.com/"
              icon="mdi-google"
              color="info"
            ></v-btn>
            <v-btn
              class="ma-2"
              style="height: 40px"
              href="https://www.twitter.com/"
              icon="mdi-twitter"
              color="success"
            ></v-btn>
          </div>
        </v-card-text>
      </v-col>
      <v-col>
        <v-card-text>
          <div class="font-weight-bold ms-1 mb-2">Today</div>

          <v-timeline density="compact" align="start">
            <v-timeline-item
              v-for="message in messages"
              :key="message.time"
              :dot-color="message.color"
              size="x-small"
            >
              <div class="mb-4">
                <div class="font-weight-normal">
                  <strong>{{ message.from }}</strong> @{{ message.time }}
                </div>
                <div>{{ message.message }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>
