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
        prop="birthDate",
        label="Data de nascimento",
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
    :before-close="handleClose"
    :title="titleModal"
    @close="closeModal"
    v-model="showModal"
  )
    adicionar-membro(
      :titleModal='titleModal'
      :isVisualizar="isVisualizar"
      :membro="novoMembro"
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
import AdicionarMembro from '@/components/modals/AdicionarMembro.vue'
import { ElNotification, ElMessageBox } from 'element-plus'
import models from '@/constants/models'
import { cloneDeep } from 'lodash'

export default {
  name: 'Member',

  components: {
    AdicionarMembro,
  },

  async mounted() {
    this.$store.commit('SET_SIDEBAR_OPTION', this.$route.name.toLowerCase())
    await this.getMembros()
  },

  data() {
    return {
      dados: [],
      novoMembro: cloneDeep(models.emptyMember),
      isEditar: false,
      isVisualizar: false,
      titleModal: 'Adicionar Membro'
    }
  },

  computed: {
    showModal() {
      return this.$store.state.header.modal === 'membro'
    },
  },

  methods: {
    ...mapActions({
      findAllMembers: 'findAllMembers',
      createMember: 'createMember',
      updateMember: 'updateMember',
      deleteMember: 'deleteMember'
    }),

    async getMembros() {
      const res = await this.findAllMembers()
      this.dados = res.members
    },

    formatDate(row, column, prop) {
      return prop ? Utils.formatDate(prop) : '-'
    },

    closeModal() {
      this.isVisualizar = false
      this.isEditar = false
      this.novoMembro = cloneDeep(models.emptyMember)
      this.$store.commit('SET_MODAL', '')
    },

    async salvar() {
      try {
        const res = await this.createMember(this.novoMembro)
        ElNotification({
          title: 'Tudo certo!',
          message: `${res.member.name} foi cadastrado com sucesso`,
          type: 'success',
        })
        this.$store.commit('SET_MODAL', '')
        await this.getMembros()
        this.novoMembro = cloneDeep(models.emptyMember)
      } catch (error) {}
    },

    async excluir(index, row) {
      try {
        await this.deleteMember(row._id)
        ElNotification({
          title: 'Tudo certo!',
          message: 'Membro removido com sucesso',
          type: 'success',
        })
        await this.getMembros()
      } catch (error) {}
    },

    handleExcluir (index, row) {
      ElMessageBox.confirm(
        `Excluir membro ${row.name} do sistema?`,
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
        const res = await this.updateMember({ membro: this.novoMembro, id: this.novoMembro._id })
        this.isEditar = false
        this.$store.commit('SET_MODAL', '')
        ElNotification({
          title: 'Tudo certo!',
          message: `${res.member.name} foi editado com sucesso`,
          type: 'success',
        })
        await this.getMembros()
        this.novoMembro = cloneDeep(models.emptyMember)
      } catch (error) {}
    },

    handleEditar (index, row) {
      this.isEditar = true
      this.novoMembro = row
      this.titleModal = 'Editar Membro'
      this.$store.commit('SET_MODAL', 'membro')
    },

    handleVisualizar (index, row) {
      this.isVisualizar = true
      this.novoMembro = row
      this.titleModal = row.name
      this.$store.commit('SET_MODAL', 'membro')
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
