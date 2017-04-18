<template>
  <v-toolbar class="secondary">
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title class="hidden-sm-and-down">Hacktivoverflow</v-toolbar-title>
    <v-text-field prepend-icon="search" label="Search..." hide-details single-line dark></v-text-field>&nbsp;&nbsp;&nbsp;&nbsp;
    <div id="login">

      <v-modal v-model="modal">
        <v-btn slot="activator" primary dark>SIGN IN</v-btn>
        <v-card>
          <v-card-text><strong>SIGN IN</strong></v-card-text>
          <v-card-text>
            <v-row row>
              <v-col xs3>
                <v-subheader>Username</v-subheader>
              </v-col>
              <v-col xs8>
                <v-text-field
                v-model="username"
                name="input-1"
                label="Label Text"
                ></v-text-field>
              </v-col>
              <v-col xs3>
                <v-subheader>Password</v-subheader>
              </v-col>
              <v-col xs8>
                <v-text-field
                v-model="password"
                name="input-10-1"
                label="Enter your password"
                hint="At least 8 characters"
                min="8"
                append-icon="remove_red_eye"
                counter
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-row actions>
            <v-spacer></v-spacer>
            <v-btn flat v-on:click.native="modal = false" class="primary--text">Cancel</v-btn>
            <v-btn flat @click.native="signIn()" class="primary--text">Submit</v-btn>
          </v-card-row>
        </v-card>
      </v-modal>&nbsp;&nbsp;&nbsp;&nbsp;
      <v-modal v-model="modal2">
        <v-btn slot="activator" primary dark>SIGN UP</v-btn>
        <v-card>
          <v-card-text><strong>SIGN UP</strong></v-card-text>
          <v-card-text>
            <v-row row>
              <v-col xs3>
                <v-subheader>Username</v-subheader>
              </v-col>
              <v-col xs8>
                <v-text-field
                v-model="username"
                name="input-1"
                label="Label Text"
                ></v-text-field>
              </v-col>
              <v-col xs3>
                <v-subheader>Password</v-subheader>
              </v-col>
              <v-col xs8>
                <v-text-field
                v-model="password"
                name="input-10-1"
                label="Enter your password"
                hint="At least 8 characters"
                min="8"
                append-icon="remove_red_eye"
                counter
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text><a href="#">Already have a user? Click here to Sign In</a></v-card-text>
          <v-card-row actions>
            <v-spacer></v-spacer>
            <v-btn flat v-on:click.native="modal2 = false" class="primary--text">Cancel</v-btn>
            <v-btn flat @click.native="signUp()" class="primary--text">Submit</v-btn>
          </v-card-row>
        </v-card>
      </v-modal>

    </div>
    <div id="logout">
      <v-btn @click.native="logout()" primary dark>LOGOUT</v-btn>
    </div>


  </v-toolbar>
</template>

<script>



export default {
  data(){
    return {
      text: 'Will put questions and users only',
      modal: false,
      modal2: false,
      username: "",
      password: ""
    }
  },
  methods: {
    signIn() {
      this.modal = false
      axios.post(`http://localhost:3000/users/signIn`, {
          username: this.username,
          password: this.password
      })
      .then((response) => {
        window.localStorage.setItem('token', response.data.token)
        window.localStorage.setItem('user', response.data.username);
        window.localStorage.setItem('id', response.data.id);
        // if (window.localStorage.getItem('user') !== "" || this.$cookie.get("token") != null) {
        //   this.$cookie.set("token", response.data.token, 1);
        //   window.location = "/";
        // }else if(this.$cookie.get("token") == null){
        //   this.$router.push('/')
        // }
      })
      .catch((err) => {
        console.log(err.message);
      })
    },
    signUp() {
      this.modal2 = false
      axios.post(`http://localhost:3000/users/signUp`, {
        username: this.username,
        password: this.password
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.message);
      })
    },
    logout() {
      window.localStorage.clear()
    }
  }
}
</script>
