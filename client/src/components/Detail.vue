<template>
  <div class="">
    <v-modal v-model="bottom" bottom id="answerQuestion">
      <v-btn slot="activator" secondary dark >Answer</v-btn>
      <v-card class="secondary white--text">
        <v-card-text class="subheading white--text">
          <v-row row>
              <v-col xs3>
                <v-subheader>Your Answer</v-subheader>
              </v-col>
              <v-col xs8>
                <v-text-field
                  v-model="answer"
                  multi-line
                  name="input-1"
                  label="Write your answer here"
                ></v-text-field>
              </v-col>
            <v-col sm2 xs12>
              <v-btn primary dark v-on:click.native="bottom = false">Cancel</v-btn>
              <v-btn primary dark @click.native="postAnswer()">Submit</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-modal>
    <div class="container">
      <v-card>
        <v-card-row class="green darken-1">
          <v-card-title>
            <span class="white--text">{{ quest.title }}</span>
            <v-spacer></v-spacer>
            <div>
              <v-menu id="marriot" bottom left origin="top right">
                <v-btn icon="icon" slot="activator" class="white--text">
                  <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
                  <v-list-item>
                    <v-list-tile>
                      <v-list-tile-title @click="deleteQuestion()">Remove</v-list-tile-title>
                    </v-list-tile>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-card-title>
        </v-card-row>
        <v-card-text>
          <v-card-row height="75px">
            <div>
              <div>{{ quest.inquiry }}</div>
            </div>
          </v-card-row>
        </v-card-text>
      </v-card><br>
      <div  v-for="answer in answers">
        <p type="hidden" v-model="answerId" value="answer._id"> </p>
        <p>{{answer._id}}</p>
        <v-card class="grey lighten-4 elevation-0">
          <v-card-text>
            <v-container fluid>
              <v-card-text>
                <v-card-row height="75px">
                  <div>
                    <div>{{ answer.response }}</div>
                  </div>
                  <v-spacer></v-spacer>
                  <v-btn icon="icon" slot="activator" class="white--text">
                    <v-icon>more_vert</v-icon>
                  </v-btn>
                  <v-list>
                    <v-list-item>
                      <v-list-tile>
                        <v-list-tile-title @click="deleteAnswer(answer._id)">Remove</v-list-tile-title>
                      </v-list-tile>
                    </v-list-item>
                  </v-list>
                </v-card-row>
                <v-card-row actions>
                  <v-btn flat class="dark--text" @click.native="upVote(answer._id)">
                    <i class="material-icons">arrow_drop_up</i>
                  </v-btn>
                  <p>{{vote}}</p>
                  <v-btn flat class="dark--text" @click.native="downVote(answer._id)">
                    <i class="material-icons">arrow_drop_down</i>
                  </v-btn>
                </v-card-row>
              </v-card-text>
            </v-container>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      quest: "",
      answers: [],
      bottom: false,
      answer: "",
      answerId: "",
      vote: 0
    }
  },
  methods: {
    detailed() {
      axios.get(`http://localhost:3000/questions/${this.id}`)
      .then((response) => {
        this.quest = response.data
      })
      .catch((err) => {
        console.log(err.message);
      })
    },
    getAnswer() {
      axios.get(`http://localhost:3000/answers/${this.id}`)
      .then((response) => {
        this.answers = response.data
      })
      .catch((err) => {
        console.log(err.message);
      })
    },
    postAnswer() {
      this.bottom = false
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      let data = {response: this.answer}
      fetch(`http://localhost:3000/answers/${this.id}`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data)
      })
    },
    deleteQuestion() {
      fetch(`http://localhost:3000/questions/${this.id}`, {
        method: "DELETE"
      })
      .then(response => response.json())
      .then(json => this.quest = json)
    },
    deleteAnswer(id) {
      fetch(`http://localhost:3000/answers/${id}`, {
        method: "DELETE"
      })
      .then(response => response.json())
      .then(json => this.quest = json)
    },
    upVote(id) {
      axios.post(`http://localhost:3000/answers/${id}/upvote`, {
        answer: id
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err.message);
      })
    },
    downVote(id) {
      axios.post(`http://localhost:3000/answers/${id}/downvote`, {
        answer: id
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      })
    },
    allVote() {
      console.log(this.answerId);
      axios.get(`http://localhost:3000/answers/58f50be8dccfd7158d126d5d/vote`)
      .then((response) => {
        console.log(response.data);
        this.vote = response.data.sum
      })
      .catch((err) => {
        console.log(err.message);
      })
    }
  },
  created() {
    this.detailed()
    this.getAnswer()
    this.allVote()
  }
}
</script>

<style scoped>
  #answerQuestion {
    position:absolute;
    transition: .5s ease;
    top: 15%;
    left: 90%;
  }
</style>
