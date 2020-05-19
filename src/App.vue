<template>
  <div class="row justify-content-center h-100">
    <ChatList/>
    <ShowMessage v-bind:current-user-id="CurrentUserId"/>

    <b-modal v-model="ShowModalLogin" hide-footer title="Login" no-close-on-esc no-close-on-backdrop hide-header-close>
      <b-form @submit="OnSubmit">
        <b-form-group id="email-group" label="Email address:" label-for="email" >
            <b-form-input id="email" v-model="form.email" type="email" required placeholder="Enter email"/>
        </b-form-group>
        <b-form-group id="password-group" label="Email address:" label-for="password">
          <b-form-input id="password" v-model="form.password" type="password" required placeholder="Enter password"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Login</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-modal>
  </div>
</template>
<script>
import ShowMessage from "./components/ShowMessage";
import ChatList from "./components/ChatList";
import firebase from "./firebaseConfig"

export default {
  mounted: function() {
    var self = this;
    // check login
    this.$nextTick(function() {
      firebase.auth.onAuthStateChanged(function(user) {
          if (user) {
            self.IsLogin = true;
            self.ShowModalLogin = false;
            self.CurrentUserId = user.uid
          } else {
            self.IsLogin = false;
            self.ShowModalLogin = true;
          }
      });
    });
  },
  methods: {
    
    OnSubmit: function (evt) {
        evt.preventDefault()
        var self = this;
        firebase.auth.signInWithEmailAndPassword(self.form.email, self.form.password)
        .then(function(user) {
          debugger
          self.IsLogin = true;
          self.ShowModalLogin = false;
          // self.globalReadOnlyProperty = user.uid;
        })
        .catch(function(error) {
          var errorMessage = error.message;
          alert(errorMessage);
        });
      }
  },
  name: "App",
  components: {
    ShowMessage,
    ChatList
  },
  data(){
    return {
      form: {
            email: "",
            password: ""
          },
      IsLogin: false,
      ShowModalLogin: false,
      CurrentUserId: null
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  height: 100%;
  margin: 0;
}
</style>
