<template>
  <div class="wrapper-container">
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Login</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <div class="wrapper-content">
        <div class="wrapper-social">
          <v-btn
            :class="{ social: !isMobile, twitter: true }"
            :icon="isMobile"
            :rounded="!isMobile"
            :block="!isMobile"
            @click="onSignInWithSocial('TWITTER')"
          >
            <v-icon :class="{ 'social-icon': !isMobile }"
              >fab fa-twitter-square</v-icon
            >
            <span v-if="!isMobile" class="social-label">Twitter</span>
            <div v-if="!isMobile" class="fill" />
          </v-btn>
          <br />
          <v-btn
            :class="{ social: !isMobile, facebook: true }"
            :icon="isMobile"
            :rounded="!isMobile"
            :block="!isMobile"
            @click="onSignInWithSocial('FACEBOOK')"
          >
            <v-icon :class="{ 'social-icon': !isMobile }"
              >fab fa-facebook-square</v-icon
            >
            <span v-if="!isMobile" class="social-label">Facebook</span>
            <div v-if="!isMobile" class="fill" />
          </v-btn>
          <br />
          <v-btn
            :class="{ social: !isMobile, github: true }"
            :icon="isMobile"
            :rounded="!isMobile"
            :block="!isMobile"
            @click="onSignInWithSocial('GITHUB')"
          >
            <v-icon :class="{ 'social-icon': !isMobile }"
              >fab fa-github-square</v-icon
            >
            <span v-if="!isMobile" class="social-label">Github</span>
            <div v-if="!isMobile" class="fill" />
          </v-btn>
          <br />
          <v-btn
            :class="{ social: !isMobile, google: true }"
            :icon="isMobile"
            :rounded="!isMobile"
            :block="!isMobile"
            @click="onSignInWithSocial('GOOGLE')"
          >
            <v-icon :class="{ 'social-icon': !isMobile }"
              >fab fa-google-plus-square</v-icon
            >
            <span v-if="!isMobile" class="social-label">Google</span>
            <div v-if="!isMobile" class="fill" />
          </v-btn>
        </div>
        <div class="wrapper">
          <div class="vertical-line" color="primary" />
          <div class="circle">
            <h5>OR</h5>
          </div>
          <div class="vertical-line" />
        </div>
        <div class="wrapper-form">
          <v-form>
            <v-text-field
              v-model="email"
              prepend-icon="mdi-mail"
              name="login"
              label="Login"
              type="text"
              data-testid="input-login"
            />
            <v-text-field
              v-model="password"
              prepend-icon="mdi-lock"
              name="password"
              label="Password"
              type="password"
              data-testid="input-password"
            />
          </v-form>
          <v-alert :value="hasError" type="error" data-testid="error-dialog">
            {{ error }}
          </v-alert>
          <v-spacer />
          <v-layout column>
            <v-btn
              :loading="loading"
              color="primary"
              @click="onLogin"
              data-testid="button-login"
              >Login</v-btn
            >
            <p>
              Don't got an account? Signup here
              <router-link to="/sign-up">Signup</router-link>
            </p>
          </v-layout>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },

    error() {
      return this.$store.state.user.user_error;
    },

    loading() {
      return this.$store.state.user.user_request;
    },
    isMobile() {
      return this.$vuetify.breakpoint.name === "xs";
    },
    hasError() {
      return !!this.$store.state.user.user_error;
    }
  },
  watch: {
    user(newValue) {
      if (newValue) {
        this.$router.replace("/");
      }
    }
  },
  mounted() {
    if (this.error) {
      this.$store.commit("USER_CLEAR_REQUEST");
    }
  },
  methods: {
    onLogin() {
      this.$store.dispatch("USER_SIGNIN", {
        email: this.email,
        password: this.password
      });
    },

    onSignInWithSocial(provider) {
      this.$store.dispatch("USER_SIGNIN_SOCIAL", {
        provider,
        isMobile: this.isMobile
      });
    }
  }
};
</script>

<style scoped>
.fill {
  width: 100%;
}
.wrapper-container {
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 2em;
}

.wrapper-container > .v-card {
  width: 80vw;
}

.wrapper-content {
  display: flex;
  padding: 2em;
}

.wrapper-form {
  flex: 3;
}

.circle {
  width: 50px;
  height: 50px;
  background: #fff;
  border-radius: 100px;
  border-style: solid;
  border-width: 1px;
  /* border-color: #1976d2; */
  border-color: #fff;
  position: relative;
  margin: 10px auto 0 auto;
}
.vertical-line {
  width: 1px;
  height: 80px;
  background: #dcdcdc;
  margin: 10px auto 0 auto;
}

h5 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  color: #000;
}

.social {
  width: 200px;
}
.social > div.v-btn__content {
  display: flex;
  justify-content: flex-start;
  padding-left: 20px;
}

.social-icon {
  border-right: 1px solid;
  padding-right: 5px;
  padding-left: 15px;
}

.social-label {
  padding-left: 10px;
}

.google {
  background-color: #dd4b39 !important;
  border: 2px solid #dd4b39;
  color: #fff;
}
.twitter {
  background-color: #55acee !important;
  border: 2px solid #55acee;
  color: #fff;
}
.facebook {
  background-color: #3b5998 !important;
  border: 2px solid #3b5998;
  color: #fff;
}

.github {
  background-color: #444 !important;
  border: 2px solid #444;
  color: #fff;
}
</style>
