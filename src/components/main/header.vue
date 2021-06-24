<template>
  <nav class="header">
    <div class="header__container">
      <router-link tag="button" class="c-btn" to="reg">
        Registation
      </router-link>
      <button v-if="isLogin" @click.prevent="logOut" class="c-btn">
        Log Out
      </button>
      <router-link v-else class="c-btn" to="/login">Log In</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "HeaderBlock",
  data() {
    return {
      isLogin: false,
    };
  },
  watch: {
    $route() {
      this.isLogin = JSON.parse(localStorage.getItem("isLogin")) ? true : false;
    },
  },
  methods: {
    logOut() {
      const allUsers = JSON.parse(localStorage.getItem("users"));
      const currentUser = JSON.parse(localStorage.getItem("accessUser"));

      let update = allUsers.filter((item) => item.email !== currentUser.email);
      update.push(currentUser);

      localStorage.setItem("users", JSON.stringify(update));
      localStorage.removeItem("isLogin");
      localStorage.removeItem("accessUser");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  height: 60px;
  background-color: #2c3e50;
  display: flex;
  align-items: center;

  &__container {
    display: flex;
    padding-left: 1rem;
  }
}

.c-btn {
  margin-bottom: 0;
  margin-right: 10px;
  background-color: #fff;
}
</style>
