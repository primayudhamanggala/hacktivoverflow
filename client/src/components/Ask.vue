<template>
  <div id="askForm">
    <br>
    <v-card class="secondary elevation-0">
      <v-card-text>
        <v-container fluid>
          <v-row row>
            <v-col xs4>
              <v-subheader class="grey--text text--lighten-1">Title</v-subheader>
            </v-col>
            <v-col xs8>
              <v-text-field
              v-model="title"
              name="input-1"
              label="Your question title?"
              dark
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row row>
            <v-col xs4>
              <v-subheader class="grey--text text--lighten-1">Inquiry</v-subheader>
            </v-col>
            <v-col xs8>
              <v-text-field
              v-model="inquiry"
              multi-line
              name="input-2"
              label="What do you want to ask?"
              dark
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-btn round light default>Cancel</v-btn>
        <v-btn @click.native="askQuestion()" round light default>Submit</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      inquiry: "",
    }
  },
  methods: {
    askQuestion() {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      let data = {title: this.title, inquiry: this.inquiry}
      fetch(`http://localhost:3000/questions/`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data)
      })
      .then(() => {
        window.location.replace('http://localhost:8080/#/')
      })
    }
  }
}
</script>
