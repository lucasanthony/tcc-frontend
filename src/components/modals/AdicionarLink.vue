<template lang="pug">
div.modal-content
  div.col
    el-input(
			placeholder="Nome"
			v-model="link.name"
      :disabled="isVisualizar"
		)
    el-input(
			placeholder="URL"
			v-model="link.url"
			:disabled="isVisualizar"
		)
    el-select(
			multiple
			collapse-tags
			collapse-tags-tooltip
      v-model="link.tags"
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
      v-model="link.departments"
      placeholder="Selecione os departamentos"
      value-key="id"
      :disabled="isVisualizar"
    )
      el-option(
				v-for="department in departments",
				:key="department._id",
				:label="department.value",
				:value="department.value"
      )
</template>

<script>
import { mapActions } from 'vuex'
import Utils from '@/utils/utils'

export default {
  name: 'AdicionarLink',

  props: {
    link: {
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
          value: 'importante',
        },
        {
          id: 2,
          value: 'treinamento',
        }
      ],
      departments: [
        {
        id: 1,
        value: 'qualidade'
        },
        {
        id: 2,
        value: 'projetos'
      }
      ],
    }
  },

  async mounted() {
    const res = await this.findAllLinks()
    this.links = res.links
  },

  methods: {
    ...mapActions({
      findAllLinks: 'findAllLinks',
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
