<template lang="pug">
div#home
    h2 Bem-vindo
    el-button(@click='cadastrarEj()') Cadastrar minha EJ
    el-button(@click='entrar()') Entrar
</template>

<script>
export default {
  name: "Home",

  methods: {
    cadastrarEj() {
        this.$router.push('Cadastro')
    },
    entrar() {
        this.$router.push('Login')
    },
  },
};
</script>

<style scoped>
#home {
  background-color: red;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3%
}
</style>
