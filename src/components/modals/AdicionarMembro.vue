<template lang="pug">
div.modal-content
	div.col
		el-input(
			placeholder="Nome"
			v-model="membro.name"
		)
		div.date-pickers
			el-date-picker(
				placeholder="Data de nascimento"
				format="DD/MM/YYYY"
				value-format="YYYY-MM-DD"
				style="width: 100%"
				v-model="membro.birthDate"
			)
			el-date-picker(
				placeholder="Data de entrada"
				format="DD/MM/YYYY"
				value-format="YYYY-MM-DD"
				style="width: 100%"
				v-model="membro.entryDate"
			)
		el-select(
			multiple
			collapse-tags
			collapse-tags-tooltip
      v-model="membro.habilidades"
      placeholder="Selecione habilidades"
      value-key="id"
    )
			el-option(
				v-for="habilidade in habilidades",
				:key="habilidade.id",
				:label="habilidade.value",
				:value="habilidade.value"
      )
		el-select(
      v-model="membro.diretoria"
      placeholder="Selecione a diretoria"
      value-key="id"
    )
			el-option(
				v-for="diretoria in diretorias",
				:key="diretoria.id",
				:label="diretoria.value",
				:value="diretoria.value"
      )
	div.col
		el-input(
			placeholder="Email"
			v-model="membro.email"
		)
		el-input(
			placeholder="Telefone"
			v-model="membro.phone"
			v-mask="['(##)#####-####']"
		)
		el-input(
			type="textarea"
			placeholder="Observações"
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
  },

  async mounted() {},

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
				}
			],
			diretorias: [
				{
					id: 1,
					value: 'Projetos'
				},
				{
					id: 2,
					value: 'Presidência'
				},
				{
					id: 3,
					value: 'Pessoas'
				}
			]
    }
  },

  methods: {
    ...mapActions({
      findAllMembers: 'findAllMembers',
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
