<template>
  <div class="">
    <Question
    v-for="(question, index) in questions"
    key="index"
    :question="question"
    />
    <router-link class="link" :to="{path: '/post'}">
      <v-btn class="askButton" round primary dark>Ask Question</v-btn>
    </router-link>
  </div>
</template>

<script>
import Question from './Question.vue'

export default {
  data() {
    return {
      questions: [{
        _id: '',
        user: '',
        title: '',
        inquiry: '',
        answers: [{}]
      }]
    }
  },
  methods: {
    getQuestions() {
      axios.get(`http://localhost:3000/questions/`)
      .then((response) => {
        this.questions = response.data
      })
      .catch((err) => {
        console.log(err.message);
      })
    }
  },
  created() {
    this.getQuestions()
  },
  components: {
    Question
  }
}
</script>

<style scoped>
  .askButton {
    position:absolute;
    transition: .5s ease;
    top: 20%;
    left: 90%;
  }
</style>
