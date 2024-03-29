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
        prop="description",
        label="Descrição",
      )
      el-table-column(
        prop="team",
        label="Time",
        :formatter="formatList"
        :width="210"
      )
      el-table-column(
        prop="startDate",
        label="Data de início",
        :formatter="formatDate"
      )
      el-table-column(
        label="Ações"
        align="right"
      )
        template(
          #default="scope"
        )
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
    center
    :before-close="handleClose"
    :title="titleModal"
    @close="closeModal"
    v-model="showModal"
    fullscreen=true
  )
    adicionar-projeto(
      :titleModal='titleModal'
      :isVisualizar="isVisualizar"
      :projeto="novoProjeto"
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
import AdicionarProjeto from '@/components/modals/AdicionarProjeto.vue'
import { ElNotification, ElMessageBox } from 'element-plus'
import models from '@/constants/models'
import { cloneDeep } from 'lodash'

export default {
  name: 'Project',

  components: {
    AdicionarProjeto
  },

  async mounted() {
    this.$store.commit('SET_SIDEBAR_OPTION', this.$route.name.toLowerCase())
    const res = await this.findAllProjects()
    this.dados= res.projects
  },

  data() {
    return {
      dados: [],
      novoProjeto: cloneDeep(models.emptyProject),
      titleModal: 'Adicionar Projeto',
      isEditar: false,
      isVisualizar: false
    }
  },

  computed: {
    showModal() {
      return this.$store.state.header.modal === 'projeto'
    },
  },

  methods: {
    ...mapActions({
      findAllProjects: 'findAllProjects',
      createProject: 'createProject',
      deleteProject: 'deleteProject'
    }),

    formatDate(row, column, prop) {
      return Utils.formatDate(prop)
    },

    async getProjetos() {
      const res = await this.findAllProjects()
      this.dados = res.projects
    },

    async salvar() {
      try {
        const res = await this.createProject(this.novoProjeto)
        ElNotification({
          title: 'Tudo certo!',
          message: `Projeto ${res.project.name} foi cadastrado com sucesso`,
          type: 'success',
        })
        this.$store.commit('SET_MODAL', '')
        await this.getProjetos()
        this.novoProjeto = cloneDeep(models.emptyProject)
      } catch (error) {}
    },

    async editar () {
      try {
        const res = await this.updateProject({ membro: this.novoProjeto, id: this.novoProjeto._id })
        this.isEditar = false
        this.$store.commit('SET_MODAL', '')
        ElNotification({
          title: 'Tudo certo!',
          message: `${res.project.name} foi editado com sucesso`,
          type: 'success',
        })
        await this.getProjetos()
        this.novoProjeto = cloneDeep(models.emptyProject)
      } catch (error) {}
    },

    handleEditar (index, row) {
      this.isVisualizar = false
      this.isEditar = true
      this.novoProjeto = row
      console.log(this.novoProjeto)
      this.titleModal = 'Editar projeto'
      this.$store.commit('SET_MODAL', 'projeto')
    },

    handleVisualizar (index, row) {
      this.isVisualizar = true
      this.novoProjeto = row
      this.titleModal = row.name
      this.$store.commit('SET_MODAL', 'projeto')
    },

    async excluir(index, row) {
      try {
        await this.deleteProject(row._id)
        ElNotification({
          title: 'Tudo certo!',
          message: 'Projeto removido com sucesso',
          type: 'success',
        })
        await this.getProjetos()
      } catch (error) {}
    },

    handleExcluir (index, row) {
      ElMessageBox.confirm(
        `Excluir projeto ${row.name} do sistema?`,
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

    handleClose () {
      this.$store.commit('SET_MODAL', '')
    },

    formatList(row, column, prop) {
			let listFormated = ''
			prop.forEach((item, index) => {
				if (index !== prop.length-1) {
					listFormated += item.name + ', '
				} else {
					listFormated += item.name
				}
			})
      return listFormated
    },
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-left: 2%;
  margin-right: 2%;
  margin-top: 2%
}
</style>
