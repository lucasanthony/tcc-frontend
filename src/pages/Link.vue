<template lang="pug">
div
  el-card
    el-table(
      :data="dados"
      stripe
    )
      el-table-column(
        prop="name",
        label="Nome",
      )
      el-table-column(
        prop="url",
			  label="URL",
			)
      el-table-column(
        prop="departments",
				label="Departamentos",
				:formatter="formatList"
			)
      el-table-column(
        prop="tags",
				label="Tags",
        :formatter="formatList"
			)
      el-table-column(
        label="Ações"
        align="right"
      )
        template(
          #default="scope"
        )
          el-button(
            @click="copyNick(scope.row)"
            type="success"
            size="small"
          )
            CopyDocument
          el-button(
            @click="handleVisualizar(scope.$index, scope.row)"
            type="success"
            size="small"
          )
            View
          el-button(
            @click="handleEditar(scope.$index, scope.row)"
            type="primary"
            size="small"
          )
            edit
          el-button(
            @click="handleExcluir(scope.$index, scope.row)"
            type="danger"
            size="small"
          )
            delete
  el-dialog(
    :before-close="handleClose"
    :title="titleModal"
    @close="closeModal"
    v-model="showModal"
  )
    adicionar-link(
      :titleModal='titleModal'
      :isVisualizar="isVisualizar"
      :link="novoLink"
    )
    template(
      #footer
    )
      span.dialog-footer
        el-button(
          v-if="!isVisualizar"
          @click="isEditar ? editar() : salvar()"
          type="primary"
          color="#4b53c6"
        ) Salvar
</template>

<script>
import { mapActions } from 'vuex'
import Utils from '@/utils/utils'
import AdicionarLink from '@/components/modals/AdicionarLink.vue'
import { ElNotification, ElMessageBox } from 'element-plus'
import models from '@/constants/models'
import { cloneDeep } from 'lodash'

export default {
  name: 'Link',

  components: {
    AdicionarLink,
  },

  async mounted() {
    this.$store.commit('SET_SIDEBAR_OPTION', this.$route.name.toLowerCase())
    const res = await this.findAllLinks()
    this.dados = res.links
  },

  data() {
    return {
      dados: [],
      novoLink: cloneDeep(models.emptyLink),
      titleModal: 'Adicionar Link',
      isEditar: false,
      isVisualizar: false,
    }
  },

  computed: {
    showModal() {
      return this.$store.state.header.modal === 'link'
    },
  },

  methods: {
    ...mapActions({
      findAllLinks: 'findAllLinks',
      createLink: 'createLink',
      deleteLink: 'deleteLink',
      updateLink: 'updateLink'
    }),

    formatDate(row, column, prop) {
      return Utils.formatDate(prop)
    },

    async getLinks() {
      const res = await this.findAllLinks()
      this.dados = res.links
    },

    async salvar() {
      try {
        const res = await this.createLink(this.novoLink)
        ElNotification({
          title: 'Tudo certo!',
          message: `Link ${res.link.name} foi cadastrado com sucesso`,
          type: 'success',
        })
        this.$store.commit('SET_MODAL', '')
        await this.getLinks()
        this.novoLink = cloneDeep(models.emptyLink)
      } catch (error) {}
    },

    async editar() {
      try {
        const res = await this.updateLink({
          link: this.novoLink,
          id: this.novoLink._id,
        })
        this.isEditar = false
        this.$store.commit('SET_MODAL', '')
        ElNotification({
          title: 'Tudo certo!',
          message: `${res.link.name} foi editado com sucesso`,
          type: 'success',
        })
        await this.getLinks()
        this.novoLink = cloneDeep(models.emptyLink)
      } catch (error) {}
    },

    handleEditar(index, row) {
      this.isEditar = true
      this.novoLink = row
      this.titleModal = 'Editar link'
      this.$store.commit('SET_MODAL', 'link')
    },

    handleVisualizar(index, row) {
      this.isVisualizar = true
      this.novoLink = row
      this.titleModal = row.name
      this.$store.commit('SET_MODAL', 'link')
    },

    async excluir(index, row) {
      try {
        await this.deleteLink(row._id)
        ElNotification({
          title: 'Tudo certo!',
          message: 'Link removido com sucesso',
          type: 'success',
        })
        await this.getLinks()
      } catch (error) {}
    },

    handleExcluir(index, row) {
      ElMessageBox.confirm(
        `Excluir link ${row.name} do sistema?`,
        'Atenção',
        {
          confirmButtonText: 'Excluir',
          cancelButtonText: 'Cancelar',
          type: 'warning',
        }
      ).then(async () => {
        await this.excluir(index, row)
      })
    },

    handleClose() {
      this.isVisualizar = false
      this.isEditar = false
      this.novoLink = cloneDeep(models.emptyLink)
      this.$store.commit('SET_MODAL', '')
    },

		formatList(row, column, prop) {
			let listFormated = ''
			prop.forEach((item, index) => {
				if (index !== prop.length-1) {
					listFormated += item + ', '
				} else {
					listFormated += item
				}
			})
      return listFormated
    },

    copyNick (row) {
      let input = document.createElement("input");
      input.value = `[${row.name}]\n ${row.url}`;
      document.body.appendChild(input);
      input.select();

      document.execCommand('copy');
      document.body.removeChild(input);

      ElNotification({
          title: 'Tudo certo!',
          message: `Link copiado para a área de tranferência`,
          type: 'success',
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-left: 2%;
  margin-right: 2%;
  margin-top: 2%;
}
</style>
