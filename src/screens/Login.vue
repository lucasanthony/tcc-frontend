<template lang="pug"> 
  div.home_container
    div.login_container
      el-input.login_input(placeholder="Digite o email" v-model="email" size="medium")
      el-input.login_input(placeholder="Digite a senha" v-model="password" type="password")
      el-button(size="medium" @click="handleLogin") Entrar
</template>

<script>
import Api from "../services/Api";
// import login from "../services/Login";

export default {
  name: "Login",
  components: {
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleName(value) {
      this.email = value;
    },
    handlePassword(value) {
      this.password = value;
    },
    async handleLogin() {
      try {
        const response = await Api.post("user/signIn", {
          email: this.email,
          password: this.password,
        });
        const data = response.data;
        localStorage.setItem("token_vue", data.token);
        localStorage.setItem("user", data.user);
        this.$router.push("/dashboard");
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};
</script>

<style scoped>
.home_container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

.login_container {
  background-color: aliceblue;
  width: 50%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  flex-direction: column;
  gap: 5%;
}

.login_input {
  width: 90%;
}
</style>
