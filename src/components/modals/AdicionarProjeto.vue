<template lang="pug">
div.modal-content
  div.col
    el-input(
			placeholder="Nome"
			v-model="projeto.name"
      :disabled="isVisualizar"
		)
    el-input(
			placeholder="Descrição"
			v-model="projeto.description"
			:disabled="isVisualizar"
		)
    div.date-pickers
      el-date-picker(
				placeholder="Data de nascimento"
				format="DD/MM/YYYY"
				value-format="YYYY-MM-DD"
				style="width: 100%"
				v-model="projeto.startDate"
        :disabled="isVisualizar"
			)
      el-date-picker(
				placeholder="Data de entrada"
				format="DD/MM/YYYY"
				value-format="YYYY-MM-DD"
				style="width: 100%"
				v-model="projeto.finishDate"
        :disabled="isVisualizar"
			)
    el-select(
			multiple
			collapse-tags
			collapse-tags-tooltip
      v-model="projeto.tags"
      placeholder="Selecione tags"
      value-key="id"
      :disabled="isVisualizar"
    )
      el-option(
				v-for="tag in tags",
				:key="tag.id",
				:label="tag.value",
				:value="tag.value"
      )
    el-select(
			multiple
			collapse-tags
			collapse-tags-tooltip
      v-model="projeto.team"
      placeholder="Selecione o time"
      value-key="id"
      :disabled="isVisualizar"
    )
      el-option(
				v-for="member in members",
				:key="member._id",
				:label="member.name",
				:value="member._id"
      )
  div.col
    el-input(
			placeholder="Link do contrato"
			v-model="projeto.contractLink"
      :disabled="isVisualizar"
		)
    el-input(
			placeholder="Contato do cliente"
			v-model="projeto.customer.contact"
			v-mask="['(##)#####-####']"
      :disabled="isVisualizar"
		)
    el-input(
			v-model="projeto.customer.name"
			type="textarea"
			placeholder="Nome do cliente"
      :disabled="isVisualizar"
		)
</template>

<script>
import { mapActions } from 'vuex'
import Utils from '@/utils/utils'

export default {
  name: 'AdicionarProjeto',

  props: {
    projeto: {
      type: Object,
      required: true,
    },
    isVisualizar: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      dados: [],
      tags: [
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
      members: []
    }
  },

	async mounted () {
		const res = await this.findAllMembers() 
		this.members = res.members
	},

  methods: {
    ...mapActions({
			findAllMembers: 'findAllMembers',
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
