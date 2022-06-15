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
        prop="email",
        label="Email",
      )
			el-table-column(
        prop="role",
        label="Função",
      )
			el-table-column(
        label="Ações"
        align="right"
				:width="230"
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
    :before-close="handleClose"
    :title="titleModal"
    @close="closeModal"
    v-model="showModal"
  )
		adicionar-usuario(
      :titleModal='titleModal'
      :isVisualizar="isVisualizar"
      :usuario="novoUsuario"
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
import AdicionarUsuario from '@/components/modals/AdicionarUsuario.vue'
import { ElNotification, ElMessageBox } from 'element-plus'
import models from '@/constants/models'
import { cloneDeep } from 'lodash'

export default {
	name: "Settings",

	components: {
		AdicionarUsuario
	},

	async mounted() {
    this.$store.commit('SET_SIDEBAR_OPTION', this.$route.name.toLowerCase())
    await this.getUsuarios()
  },

  data() {
    return {
      dados: [],
      novoUsuario: cloneDeep(models.emptyUser),
      isEditar: false,
      isVisualizar: false,
      titleModal: 'Adicionar Usuário'
    }
  },

  computed: {
    showModal() {
      return this.$store.state.header.modal === 'settings'
    },
  },

	methods: {
    ...mapActions({
      findAllUsers: 'findAllUsers',
      createUser: 'createUser',
      updateUser: 'updateUser',
      deleteUser: 'deleteUser'
    }),

    async getUsuarios() {
      const res = await this.findAllUsers()
      this.dados = res.users
    },

    formatDate(row, column, prop) {
      return prop ? Utils.formatDate(prop) : '-'
    },

    closeModal() {
      this.isVisualizar = false
      this.isEditar = false
      this.novoUsuario = cloneDeep(models.emptyUser)
      this.$store.commit('SET_MODAL', '')
    },

    async salvar() {
      try {
        const res = await this.createUser(this.novoUsuario)
        ElNotification({
          title: 'Tudo certo!',
          message: `${res.user.name} foi cadastrado com sucesso`,
          type: 'success',
        })
        this.$store.commit('SET_MODAL', '')
        await this.getUsuarios()
        this.novoUsuario = cloneDeep(models.emptyUser)
      } catch (error) {}
    },

    async excluir(index, row) {
      try {
        await this.deleteUser(row._id)
        ElNotification({
          title: 'Tudo certo!',
          message: 'Usuário removido com sucesso',
          type: 'success',
        })
        await this.getUsuarios()
      } catch (error) {}
    },

    handleExcluir (index, row) {
      ElMessageBox.confirm(
        `Excluir usuário ${row.name} do sistema?`,
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

    async editar () {
      try {
        const res = await this.updateUser({ membro: this.novoUsuario, id: this.novoUsuario._id })
        this.isEditar = false
        this.$store.commit('SET_MODAL', '')
        ElNotification({
          title: 'Tudo certo!',
          message: `${res.user.name} foi editado com sucesso`,
          type: 'success',
        })
        await this.getUsuarios()
        this.novoUsuario = cloneDeep(models.emptyUser)
      } catch (error) {}
    },

    handleEditar (index, row) {
      this.isEditar = true
      this.novoUsuario = row
      this.titleModal = 'Editar Usuário'
      this.$store.commit('SET_MODAL', 'settings')
    },

    handleVisualizar (index, row) {
      this.isVisualizar = true
      this.novoUsuario = row
      this.titleModal = row.name
      this.$store.commit('SET_MODAL', 'settings')
    },

    handleClose () {
      this.$store.commit('SET_MODAL', '')
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