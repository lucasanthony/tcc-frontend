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
            type="success"
            size="small"
          )
            View
          el-button(
            type="primary"
            size="small"
          )
            edit
          el-button(
            type="danger"
            size="small"
          )
            delete
</template>

<script>
import { mapActions } from 'vuex'
import Utils from '@/utils/utils'

export default {
  name: 'Member',

  async mounted() {
    this.$store.commit('SET_SIDEBAR_OPTION', this.$route.name.toLowerCase())
    await this.getMembros()
  },

  data() {
    return {
      dados: [],
    }
  },

  methods: {
    ...mapActions({
      findAllMembers: 'findAllMembers',
    }),

    async getMembros() {
      const res = await this.findAllMembers()
      this.dados = res.members
    },

    formatDate(row, column, prop) {
      return Utils.formatDate(prop)
    },
  },
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-left: 2%;
  margin-right: 2%;
  margin-top: 2%
}
</style>
