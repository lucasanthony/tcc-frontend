<template lang="pug">
div.page
   div.header
      p.title() {{ title }}
      a.exit(
         @click="handleClosePage"
      ) x
   div.content
      el-card
         el-table(
            :data="newsData"
            stripe
         )
            el-table-column(
               prop="member.name",
               label="Membro",
               :width="150"
            )
            el-table-column(
               prop="description",
               label="Descrição",
            )
            el-table-column(
               prop="createdAt",
               label="Data de Postagem",
               :formatter="formatDate"
               :width="210"
            )
            el-table-column(
               label="Ações"
               align="right"
            )
               template(
                  #default="scope"
               )
                  div.actions()
                     div.actions-button(
                        @click="handleCopyLink(scope.$index, scope.row)"
                        :style="'background: #95D475'"
                     )
                        el-icon
                           CopyDocument()
                     div.actions-button(
                        @click="handleDownloadImage(scope.$index, scope.row)"
                        :style="'background: #75D4C9'"
                     )
                        el-icon
                           Download()
                     div.actions-button(
                        v-if="isLeadership || isNewsOwner(scope.row)"
                        @click="handleEditNews(scope.$index, scope.row)"
                        :style="'background: #4B53C6'"
                     )
                        el-icon
                           Edit()
                     div.actions-button(
                        v-if="isLeadership || isNewsOwner(scope.row)"
                        @click="handleDeleteNews(scope.$index, scope.row)"
                        :style="'background: #F89898'"
                     )
                        el-icon
                           DeleteFilled()
   el-dialog(
      center
      :before-close="handleClose"
      :title="'Editar a atualização:'"
      @close="closeModal"
      v-model="showModalAddNews"
   )
      adicionar-atualizacao(
         :titleModal='"Editar Atualização:"'
         :atualizacao="newsFormat"
      )
      template(
         #footer
      )
         span.dialog-footer
            el-button(
               @click="editNews()"
               type="primary"
               color="#4b53c6"
            ) Salvar
</template>
   
<script>
import { mapActions } from 'vuex'
import Utils from '@/utils/utils'
import { ElNotification, ElMessageBox } from 'element-plus'
import AdicionarAtualizacao from '@/components/modals/AdicionarAtualizacao.vue'
import models from '@/constants/models'
import { cloneDeep } from 'lodash'

export default {
   name: 'ViewNews',

   components: {
      AdicionarAtualizacao
   },

   async mounted() {
      this.$store.commit('SHOW_SIDEBAR', false);
      this.userInfo = await this.getUserInfo();

      ElNotification({
         title: 'Aguarde...',
         message: 'A coleta de atualizações pode levar alguns instantes',
         type: 'success',
      });

      const data = await this.getNews();

      if (data && data.status !== 500) {
         this.newsData = data.news;
         this.projectData = data.project;
         this.title = this.getTitle();

         ElNotification({
            title: 'Sucesso!',
            message: 'Atualizações do Projeto coletadas.',
            type: 'success',
         });
      } else {
         ElNotification({
            title: 'O projeto informado não existe',
            message: 'Você será redirecionado(a) para a Página de Projetos',
            type: 'warning',
         })
         setTimeout(() => {
            this.$router.push({ name: 'Project' });
         }, "3000");
      }
   },

   data() {
      return {
         newsData: [],
         projectData: {},
         userInfo: {},
         title: '',
         newsFormat: cloneDeep(models.emptyNews)
      }
   },

   computed: {
      isLeadership() {
         return ['Presidente', 'Diretor(a)'].includes(localStorage.getItem("@role"))
      },
      showModalAddNews() {
         return this.$store.state.header.modal === 'add_news'
      },
   },

   methods: {
      ...mapActions({
         getUserInfo: 'userInfo',
         getNewsByProject: 'getNewsByProject',
         updateNews: 'updateNews',
         deleteNews: 'deleteNews',
      }),

      isNewsOwner(row) {
         return this.userInfo.sub._id === row.member._id;
      },

      async getNews() {
         const query = this.$route.params;

         const projectId = query.projectId ? JSON.parse(query.projectId) : null;

         return projectId ? await this.getNewsByProject({ projectId: projectId }) : null
      },

      formatDate(row, column, prop) {
         return Utils.formatDate(prop)
      },

      getTitle() {
         return `Atualizações do projeto: ${this.projectData.name}`
      },

      handleCopyLink(index, row) {
         if (row.updateLink) {
            let input = document.createElement("input");
            input.value = `${row.updateLink}`;
            document.body.appendChild(input);
            input.select();

            document.execCommand('copy');
            document.body.removeChild(input);

            ElNotification({
               title: 'Tudo certo!',
               message: `Link copiado para a área de tranferência`,
               type: 'success',
            })
         } else {
            ElNotification({
               title: 'Operação não realizada.',
               message: `A atualização não possui um URL adicional.`,
               type: 'warning',
            })
         }
      },

      async handleDownloadImage(index, row) {
         ElNotification({
            title: 'Operação não realizada.',
            message: `Essa funcionalidade está em desenvolvimento.`,
            type: 'warning',
         })
      },

      handleEditNews(index, row) {
         this.newsFormat = {
            _id: row._id,
            description: row.description,
            image: row.image,
            updateLink: row.updateLink
         };
         this.$store.commit('SET_MODAL', 'add_news')
      },

      async editNews() {
         try {
            const data = await this.updateNews(this.newsFormat);

            this.$store.commit('SET_MODAL', '');

            ElNotification({
               title: 'Tudo certo!',
               message: `Atualização editada com sucesso.`,
               type: 'success',
            });

            if (data && data.status !== 500) {
               this.newsData = data.news
            };

            this.newsFormat = cloneDeep(models.emptyNews);
         } catch (error) { }
      },

      async closeModal() {
         this.$store.commit('SET_MODAL', '');

         this.newsFormat = cloneDeep({ atualizacao: models.emptyNews });

         const data = await this.getNews();
         if (data && data.status !== 500) {
            this.newsData = data.news
         }
      },

      handleClose() {
         this.$store.commit('SET_MODAL', '');
      },

      handleDeleteNews(index, row) {
         ElMessageBox.confirm(
            `<b>Excluir atualização do sistema?</b><br><br>
            <b>Autor(a):</b> ${row.member.name}<br>
            <b>Última atualização:</b> ${Utils.formatDate(row.updatedAt)}<br>
            <b>Descrição:</b> ${row.description}<br>
            <b>Link de Referência:</b> ${row.updateLink ? row.updateLink : 'Sem link.'}<br>
            <b>Imagem de Referência:</b> ${row.image ? 'Com imagem.' : 'Sem imagem.'}`,
            'Atenção!',
            {
               dangerouslyUseHTMLString: true,
               confirmButtonText: 'Excluir',
               cancelButtonText: 'Cancelar',
               type: 'warning',
            }
         ).then(async () => {
            await this.deleteThisNews(index, row)
         })
      },

      async deleteThisNews(index, row) {
         try {
            const data = await this.deleteNews({ projectId: row.project, newsId: row._id });

            ElNotification({
               title: 'Tudo certo!',
               message: 'Atualização removida com sucesso',
               type: 'success',
            });

            if (data && data.status !== 500) {
               this.newsData = data.news
            }
         } catch (error) {
            ElNotification({
               title: 'Operação não realizada.',
               message: 'Ocorreu algum erro ao deletar a atualização.',
               type: 'error',
            })
         }
      },

      handleClosePage() {
         this.$router.push({ name: 'Project' });
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

.actions {
   display: flex;
   align-items: center;
   justify-content: end;
   flex-direction: row;
}

.actions-button {
   width: 45px;
   height: 35px;
   background: #e6e6e6;
   font-size: 70%;
   border-radius: 20px;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   margin: 4px;
   padding: auto;
}

.actions-button:hover {
   cursor: pointer;
}

.el-icon {
   width: 35%;
   height: 30%;

   svg {
      height: 5em;
      width: 5em;
      color: white;
      margin: 0;
   }
}

span {
   color: #808080;
   margin: 0;
}

.page {
   position: relative;
}

.header {
   position: relative;
   height: 10%;
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-top: 1%;
   padding: 1% 7% 0% 8%;
}

.title {
   position: absolute;
   font-weight: bold;
   font-size: 2.2rem;
   color: #808080;

   height: 54px;

   display: flex;
   justify-content: center;
   align-items: center;
}

.exit {
   position: absolute;
   right: 8%;
   width: 54px;
   height: 54px;

   display: flex;
   justify-content: center;
   align-items: center;

   cursor: pointer;
   font-family: -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
      "Open Sans", "Helvetica Neue", sans-serif;
   font-size: 24px;

   color: #FFF;
   background-color: #F89898;
   border-radius: 50%;
   transition: color 0.3s ease;
}

.exit:hover {
   color: #F89898;
   background-color: #ccc;
}

.content {
   margin-right: 5%;
   margin-left: 5%;
}
</style>
   