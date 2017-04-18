<template>
  <v-card-row>
    <v-card-text>
      <router-link class="link" :to="{name: 'Detail', params: {id: question._id}}">{{ question.title }}</router-link>
    </v-card-text>
  </v-card-row>
</template>

<script>
export default {
  props: ['question']
}
</script>
