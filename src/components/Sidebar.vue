<template lang="pug">
div.sidebar
  div.user-info
    span(v-html="userData")
  div.sidebar-button(
    :style="isMember ? 'background: #4b53c6' : 'background: #e6e6e6'"
    @click="handleOption('member')"
  )
    el-icon
      user-filled(
        :style="isMember ? 'color: white' : 'color: #808080'"
        :size="20"
      )
    span(v-if="!isMember") Membros
  div.sidebar-button(
    :style="isProject ? 'background: #4b53c6' : 'background: #e6e6e6'"
    @click="handleOption('project')"
  )
    el-icon
      files(
        :style="isProject ? 'color: white' : 'color: #808080'"
        :size="20"
      )
    span(v-if="!isProject") Projetos
  div.sidebar-button(
    :style="isLink ? 'background: #4b53c6' : 'background: #e6e6e6'"
    @click="handleOption('link')"
  )
    el-icon
      connection(
        :style="isLink ? 'color: white' : 'color: #808080'"
        :size="20"
      )
    span(v-if="!isLink") Links
  div.sidebar-button#settings-button(
    v-if="isPresident"
    :style="isSettings ? 'background: #4b53c6' : 'background: #e6e6e6'"
    @click="handleOption('settings')"
  )
    el-icon
      setting(
        :style="isSettings ? 'color: white' : 'color: #808080'"
        :size="20"
      )
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Sidebar',

  data() {
    return {
      userData: {}
    }
  },

  computed: {
    isMember () {
      return this.$store.state.sidebar.activeOption === 'member'
    },
    isProject () {
      return this.$store.state.sidebar.activeOption === 'project'
    },
    isLink () {
      return this.$store.state.sidebar.activeOption === 'link'
    },
    isSettings () {
      return this.$store.state.sidebar.activeOption === 'settings'
    },
    isPresident () {
      return localStorage.getItem("@role") === 'Presidente'
    }
  },

  async mounted() {
    this.userData = await this.getUserInfo()
  },

  methods: {
    ...mapActions({
      userInfo: 'userInfo'
    }),

    handleOption (option) {
      this.$store.commit('SET_SIDEBAR_OPTION', option)
      if (this.isMember) {
        this.$router.push({ name: 'Member' })
      } else if (this.isProject) {
        this.$router.push({ name: 'Project' })
      } else if (this.isLink) {
        this.$router.push({ name: 'Link' })
      } else if (this.isSettings) {
        this.$router.push({ name: 'Settings' })
      }
    },

    async getUserInfo () {
      const info = await this.userInfo()
      const formattedName = info.sub.name.split(' ')
      const text = `<strong>${formattedName[0]} ${formattedName[1] || ''}</strong>, ${info.sub.role} da ${info.sub.ej.name}`
      return text
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 10vw;
  height: 100vh;
  position: fixed;
  background: #ecf0f3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2%;

  .user-info {
    text-align: center;
    position: fixed;
    top: 2%;
    width: inherit;
  }

  .sidebar-button {
    background: #e6e6e6;
    height: 16%;
    width: 80%;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .sidebar-button:hover {
    cursor: pointer;
  }

  #settings-button {
    bottom: 02%;
    position: absolute;
    width: 37%;
    height: 8%;
  }

  .el-icon {
    width: 100%;
    height: 56%;

    svg {
      height: 3em;
      width: 3em;
      color: #808080;
    }
  }

  span {
    color: #808080;
  }
}
</style>