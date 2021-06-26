<template>
  <section class="lp">
    <div class="lp__wrapper">
      <h3 class="lp__title">Please, enter your login and password</h3>

      <form class="lp__form">
        <label class="lp__login c-input-label">
          <h4 class="lp__login-title c-input-h4">Email</h4>
          <input v-model="email" type="text" class="lp__login-input" />
          <p v-if="errorEmailMessage" class="lp__login-error">
            {{ errorEmailMessage }}
          </p>
        </label>

        <label class="lp__password c-input-label">
          <h4 class="lp__password-title c-input-h4">Password</h4>
          <input
            v-model="password"
            type="password"
            class="lp__password-input c-input-input"
          />
          <p
            v-if="errorPasswordMessage"
            class="lp__password-error c-input-error"
          >
            {{ errorPasswordMessage }}
          </p>
        </label>

        <button class="c-btn" type="button" @click.prevent="auth">
          Sign in
        </button>
      </form>

      <h4 class="lp__subtitle">Still, don't have? Don't hesitate,</h4>
      <h4 class="lp__subtitle-link">
        just follow this link <router-link to="/reg">Registration</router-link>
      </h4>
    </div>
  </section>
</template>

<script>
import {validate} from "@/mixins/validate";

export default {
  name: "login",
  mixins: [validate],
  data() {
    return {
      errorEmailMessage: "",
    };
  },
  methods: {
    auth() {
      if (!this.accessEmail && !this.accessPassword) {
        alert(`Wow-wow, cowboy, something wrong!
               Check your email and password again`);
      } else {
        const users = JSON.parse(localStorage.getItem("users"));
        let accessUser;

        users.forEach((item) => {
          if (item.email === this.email && item.password === this.password) {
            accessUser = item;
          }
        });

        if (accessUser) {
          localStorage.setItem("accessUser", JSON.stringify(accessUser));
          localStorage.setItem("isLogin", "true");
          this.$router.push("/dashboard");
        } else {
          alert(`Wow-wow, cowboy, something wrong!
               Check your email and password again`);
        }
      }
    },
  },
  watch: {
    email: function (val, oldVal) {
      if (val.length > 3 && val !== oldVal) {
        if (this.validateEmail(val) === false) {
          this.errorEmail = true;
          this.errorEmailMessage = "Something wrong with your email";
          this.accessEmail = false;
        } else {
          this.accessEmail = true;
          this.errorEmail = false;
          this.errorEmailMessage = "";
        }
      }
    },
    password: function (val) {
      if (val.length <= 8) {
        this.errorPasswordMessage =
          "Your password is to short. Min length for is 8";
        this.errorPassword = true;
        this.accessPassword = false;
      } else {
        this.errorPasswordMessage = "";
        this.errorPassword = false;
        this.accessPassword = true;
      }
    },
  },
};
</script>

<style lang="scss">
.lp {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__title {
    padding-bottom: 40px;
    font-size: 18px;
  }

  &__password,
  &__login {
    &-error {
      position: absolute;
      color: red;
      padding: 0.5rem 0;
      font-size: 13px;
      bottom: 10px;
      z-index: -1;
    }

    &-input {
      border: none;
      border-bottom: 1px dashed #000;

      &:focus {
        outline: none;
        border-bottom: 1px solid #000;
      }
    }
  }

  &__login {
    padding-bottom: 40px;
  }

  &__password-error {
    bottom: 0;
  }

  .lp__subtitle,
  .lp__subtitle-link {
    padding-bottom: 8px;
    font-size: 14px;
  }

  .lp__subtitle-link > a {
    background-color: #000;
    padding: 4px;
    color: #fff;
  }
}
</style>
