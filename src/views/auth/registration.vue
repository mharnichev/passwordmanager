<template>
  <section class="rp c-center">
    <div class="rp__wrapper">
      <h3 class="rp__title">Happy to see you here!</h3>
      <h4 class="rp__subtitle">Time to create your new account <b>↓</b></h4>

      <form class="rp__form">
        <label class="c-input-label">
          <h4 class="c-input-h4">Best Email</h4>
          <input v-model="email" type="text" class="c-input-input" />
          <p v-if="emailErrorMessage" class="c-input-error">
            {{ emailErrorMessage }}
          </p>
        </label>

        <label class="c-input-label">
          <h4 class="c-input-h4">Epic Password</h4>
          <input
            v-model="password"
            placeholder="Strong like Hulk"
            type="password"
            class="c-input-input"
          />
          <p v-if="errorPasswordMessage" class="c-input-error">
            {{ errorPasswordMessage }}
          </p>
        </label>

        <label class="c-input-label">
          <h4 class="c-input-h4">Epic Password again</h4>
          <input
            v-model="confirmPassword"
            placeholder="Strong like Hulk"
            type="password"
            class="c-input-input"
          />
          <p v-if="errorPasswordMessage" class="c-input-error">
            {{ errorPasswordMessage }}
          </p>
        </label>

        <div class="btn-container">
          <button class="c-btn" type="button" @click.prevent="reg">
            Create account
          </button>
          <router-link tag="button" class="c-btn" to="/login"
            >Log In</router-link
          >
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import {validate} from "@/mixins/validate";

export default {
  name: "Registration",
  mixins: [validate],
  data() {
    return {
      confirmPassword: "",
      errorConfirmPassword: false,
    };
  },
  methods: {
    reg() {
      if (!this.accessEmail && !this.accessPassword || !this.accessEmail || !this.accessPassword) {
        alert(`Wow-wow, cowboy, something wrong!
               Check your login and password again`);
      } else if(this.accessEmail && this.accessPassword) {
        let newUserAccount = {
          email: this.email,
          password: this.password,
          pass_cards: [],
        };

        let array = [];
        array.push(newUserAccount);

        if (JSON.parse(localStorage.getItem("users"))) {
          this.checkExistUsers(newUserAccount);
        } else {
          localStorage.setItem("users", JSON.stringify(array));
          alert(
            "Good work! Now come back to Log In page and entry in PassManager"
          );
        }
      }
    },
    checkExistUsers(newUserAccount) {
      let users = JSON.parse(localStorage.getItem("users"));
      if (users.findIndex((item) => item.email === newUserAccount.email) === -1)
        users.push(newUserAccount);

      localStorage.setItem("users", JSON.stringify(users));
      alert("Good work! Now come back to Log In page and entry in PassManager");
    },
  },
  watch: {
    email: function (val, oldVal) {
      if (val.length > 3 && val !== oldVal) {
        if (this.validateEmail(val) === false) {
          this.errorEmail = true;
          this.emailErrorMessage = "Something wrong with your email";
          this.accessEmail = false;
        } else {
          this.accessEmail = true;
          this.errorEmail = false;
          this.emailErrorMessage = "";
        }
      }
    },
    confirmPassword: function (val, oldVal) {
      if (val !== oldVal && val.length <= 8) {
        this.errorPasswordMessage =
          "Your password is to short. Min length for is 8";
        this.errorPassword = true;
        this.accessPassword = false;
      } else if (this.password !== this.confirmPassword) {
        this.errorPasswordMessage = "Your passwords do not match";
        this.errorPassword = true;
        this.accessPassword = false;
      } else if(this.password === this.confirmPassword) {
        this.errorPasswordMessage = "";
        this.errorPassword = false;
        this.accessPassword = true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.rp {
  &__title,
  &__subtitle {
    font-size: 18px;
    padding-bottom: 5px;
  }

  &__subtitle {
    padding-bottom: 30px;
  }
}

.c-input-error {
  bottom: 2px;
}

.btn-container {
  display: flex;

  button {
    margin-bottom: 0;
    margin-right: 1rem;
  }
}
</style>
