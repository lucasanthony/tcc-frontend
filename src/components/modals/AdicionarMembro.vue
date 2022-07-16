<template lang="pug">
div.modal-content
  div.col
    el-row
      el-divider(
        content-position="left"
      ) Nome
      el-input(
		  	placeholder="Nome"
		  	v-model="membro.name"
        :disabled="isVisualizar"
		  )
    div.date-pickers
      el-row
        el-divider(
          content-position="left"
        ) Data de nascimento
        el-date-picker(
			  	placeholder="Data de nascimento"
			  	format="DD/MM/YYYY"
			  	value-format="YYYY-MM-DD"
			  	style="width: 100%"
			  	v-model="membro.birthDate"
          :disabled="isVisualizar"
			  )
      el-row
        el-divider(
          content-position="left"
        ) Data de entrada
        el-date-picker(
			  	placeholder="Data de entrada"
			  	format="DD/MM/YYYY"
			  	value-format="YYYY-MM-DD"
			  	style="width: 100%"
			  	v-model="membro.entryDate"
          :disabled="isVisualizar"
			  )
    el-row
      el-divider(
        content-position="left"
      ) Habilidades
      el-select(
		  	multiple
		  	collapse-tags
		  	collapse-tags-tooltip
        v-model="membro.habilities"
        placeholder="Selecione habilidades"
        value-key="id"
        :disabled="isVisualizar"
      )
        el-option(
		  		v-for="habilidade in habilidades",
		  		:key="habilidade.id",
		  		:label="habilidade.value",
		  		:value="habilidade.value"
        )
    el-row
      el-divider(
        content-position="left"
      ) Diretoria
      el-select(
        v-model="membro.department"
        placeholder="Selecione a diretoria"
        value-key="id"
        :disabled="isVisualizar"
      )
        el-option(
		  		v-for="diretoria in diretorias",
		  		:key="diretoria.id",
		  		:label="diretoria.value",
		  		:value="diretoria.value"
        )
  div.col
    el-row
      el-divider(
        content-position="left"
      ) Email
      el-input(
		  	placeholder="Email"
		  	v-model="membro.email"
        :disabled="isVisualizar"
		  )
    el-row
      el-divider(
        content-position="left"
      ) Telefone
      el-input(
		  	placeholder="Telefone"
		  	v-model="membro.phone"
		  	v-mask="['(##)#####-####']"
        :disabled="isVisualizar"
		  )
    el-row
      el-divider(
        content-position="left"
      ) Observações
      el-input(
		  	v-model="membro.observations"
		  	type="textarea"
		  	placeholder="Observações"
        :disabled="isVisualizar"
		  )
</template>

<script>
import { mapActions } from 'vuex'
import Utils from '@/utils/utils'

export default {
  name: 'AdicionarMembro',

  props: {
    membro: {
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
      habilidades: [
        {
          id: 1,
          value: 'Backend',
        },
        {
          id: 2,
          value: 'Frontend',
        },
        {
          id: 3,
          value: 'Comunicação',
        },
      ],
      diretorias: [
        {
          id: 1,
          value: 'Projetos',
        },
        {
          id: 2,
          value: 'Presidência',
        },
        {
          id: 3,
          value: 'Pessoas',
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
