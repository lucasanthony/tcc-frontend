<template lang="pug">
div.header
	span.title-header {{ title }}
	el-button
		span {{ textButton }}
		div
			el-icon
				plus
</template>

<script>
export default {
  name: 'Header',

  props: {},

  computed: {
    isMember() {
      return this.$store.state.sidebar.activeOption === 'member'
    },
    isProject() {
      return this.$store.state.sidebar.activeOption === 'project'
    },
    isLink() {
      return this.$store.state.sidebar.activeOption === 'link'
    },

    title() {
      if (this.isMember) {
        return 'Membros'
      } else if (this.isProject) {
        return 'Projetos'
      } else if (this.isLink) {
        return 'Links'
      }
    },

		textButton () {
			if (this.isMember) {
        return 'Adicionar membro'
      } else if (this.isProject) {
        return 'Adicionar projeto'
      } else if (this.isLink) {
        return 'Adicionar link'
      }
		}
  },
}
</script>

<style lang="scss" scoped>
.header {
  height: 15vh;
  display: flex;
  justify-content: space-between;
	align-items: center;
  width: 90vw;
  margin-left: 10vw;

  .title-header {
    font-weight: bold;
    font-size: 2rem;
    color: #808080;
		margin-left: 5%;
  }

	.el-button {
		margin-right: 5%;
		width: 15%;
	}
}

</style>
