<template lang="pug">
div#home
  div#loginContainer
    div.infoCard
      el-row#title
        h2 Bem-vindo, empresário júnior
      el-row#subtitle
        p Por ter uma rotatividade de membros extremamente alta, a 
          | organização dos dados da empresa júnior se torna difícil de ser gerenciada com assertividade, 
          | pois em meio às várias planilhas e pastas muitas informações acabam se perdendo
          | ou ficando muito “escondidas”. O problema se evidencia no momento da transição de diretorias, 
          | em que raramente tudo é passado para frente, pois nem mesmo os antigos diretores sabem onde estão 
          | alguns dados.
      el-column#buttons
        el-row
          el-button.button(round size="large" @click='cadastrarEj()') Cadastrar EJ
        el-row
          el-button.button(round type="primary" size="large" @click='entrar()') Entrar
    cadastro(
      v-show="isCadastro"
    )
</template>

<script>
import Cadastro from '@/components/Cadastro.vue'

export default {
  name: 'Home',

  components: {
    Cadastro,
  },

  data() {
    return {
      isCadastro: false,
      isLogin: false,
    }
  },

  methods: {
    cadastrarEj() {
      this.isCadastro = true
    },
    entrar() {
      this.$router.push('Login')
    },
  },
}
</script>

<style lang="scss" scoped>
#home {
  background-color: red;
  background-image: -moz-linear-gradient(
      left top,
      #282a37 0%,
      #282a39 45%,
      rgba(0, 0, 0, 0.65) 100%
    ),
    url(../assets/background_home.jpg);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 3%;

  #loginContainer {
    display: flex;

    .infoCard {
      background: transparent;
      flex: 1;
      width: 35%;
      border-radius: 10px;
      padding: 4%;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: white;
      gap: 5%;

      #title,
      #subtitle,
      #buttons {
        width: -moz-available;
      }

      #buttons {
        gap: 10%;
        display: flex;
        flex-direction: column;
        height: 17%;
        margin-top: 10%;
      }

      .button {
        width: 100%;
      }
    }
  }
}
</style>
