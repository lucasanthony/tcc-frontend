<template lang="pug">
div.modal-content
  div.col
    el-input(
			placeholder="Nome"
			v-model="usuario.name"
      :disabled="isVisualizar"
		)
    el-input(
			type="password"
			placeholder="Senha"
			v-model="usuario.password"
      :disabled="isVisualizar"
		)
    el-input(
			type="password"
			placeholder="Confirmar a senha"
			v-model="usuario.confirmPassword"
      :disabled="isVisualizar"
		)
  div.col
    el-input(
			placeholder="Email"
			v-model="usuario.email"
      :disabled="isVisualizar"
		)
    el-select(
      v-model="usuario.role"
      placeholder="Selecione a função"
      value-key="id"
      :disabled="isVisualizar"
    )
      el-option(
				v-for="funcao in funcoes",
				:key="funcao.id",
				:label="funcao.value",
				:value="funcao.value"
      )
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AdicionarUsuario',

  props: {
    usuario: {
      type: Object,
      required: true,
    },
    isVisualizar: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      dados: [],
      funcoes: [
        {
          id: 1,
          value: 'Presidente',
        },
        {
          id: 2,
          value: 'Diretor(a)',
        },
        {
          id: 3,
          value: 'Assessor(a)'
        },
        {
          id: 4,
          value: 'Conselheiro(a)'
        },
      ],
    }
  },

  methods: {
    ...mapActions({
      findById: 'findById',
    }),
  },
}
</script>

<style lang="scss" scoped>
.modal-content {
  display: flex;
  gap: 2%;
  justify-content: center;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 2vh;
  flex: 1;
}

.date-pickers {
  display: flex;
  gap: 2%;
  margin-bottom: 1vh;
}
</style>
