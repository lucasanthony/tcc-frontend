<template lang="pug">
div.sidebar
  div.sidebar-button(
    :style="isMember ? 'background: #4b53c6' : 'background: #e6e6e6'"
    @click="handleOption('member')"
  )
    el-icon
      user-filled(
        :style="isMember ? 'color: white' : 'color: #808080'"
        :size="20"
      )
  div.sidebar-button(
    :style="isProject ? 'background: #4b53c6' : 'background: #e6e6e6'"
    @click="handleOption('project')"
  )
    el-icon
      files(
        :style="isProject ? 'color: white' : 'color: #808080'"
        :size="20"
      )
  div.sidebar-button(
    :style="isLink ? 'background: #4b53c6' : 'background: #e6e6e6'"
    @click="handleOption('link')"
  )
    el-icon
      connection(
        :style="isLink ? 'color: white' : 'color: #808080'"
        :size="20"
      )
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
export default {
  name: 'Sidebar',

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
      return localStorage.getItem("@role") === 'presidente'
    }
  },

  methods: {
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

  .sidebar-button {
    background: #e6e6e6;
    height: 16%;
    width: 80%;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
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
    height: 100%;

    svg {
      height: 3em;
      width: 3em;
      color: #808080;
    }
  }
}
</style>
