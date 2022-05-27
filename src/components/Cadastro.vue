<template lang="pug">
div#cadastro
    span#title Cadastre sua EJ
    div#cadastroInputs
        el-input(
            placeholder="digite o nome da ej"
            v-model="cadastroData.name"
        )
        el-input(
            placeholder="digite o nome do presidente"
            v-model="cadastroData.presidentData.name"
        )
        el-input(
            placeholder="digite o email"
            v-model="cadastroData.presidentData.email"
        )
        el-input(
            placeholder="digite a senha"
            v-model="cadastroData.presidentData.password"
        )
        el-date-picker(
            placeholder="digite a data de nascimento"
            v-model="cadastroData.presidentData.birthDate"
        )
        el-button(
            type="primary"
            round
            @click="save"
        ) Salvar
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Cadastro',

  data() {
    return {
      cadastroData: {
        name: '',
        presidentData: {
          name: '',
          email: '',
          birthDate: '',
          password: '',
        },
      },
    }
  },

  methods: {
    ...mapActions({
      createEj: 'createEj',
    }),

    async save() {
      console.log(this.cadastroData)
      // await this.createEj(this.cadastroData)
    },
  },
}
</script>

<style lang="scss" scoped>
#cadastro {
  background-color: transparent;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  display: flex;
  flex: 2;

  #title {
    margin-top: 4%;
    font-size: 2rem;
    color: white;
  }

  #cadastroInputs {
    width: 50%;
    height: 50vh;
    // background: blue;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3%;
    padding: 3%;
  }
}
</style>
