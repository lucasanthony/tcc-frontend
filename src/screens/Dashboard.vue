<template lang="pug"> 
  el-row.dashboard
    el-menu(:default-active="activeIndex" mode="horizontal" background-color="#409eff" text-color="white")
      el-menu-item(index="1") teste
      el-submenu(index="2")
        template(slot="title") Subgênero
        el-menu-item(index="2-1" @click="handleClick('SLASHER')") SLASHER
        el-menu-item(index="2-2" @click="handleClick('GORE')") GORE
        el-menu-item(index="2-3" @click="handleClick('ZUMBI')") ZUMBI

    el-col.dashboard_content
      el-col#left
        el-table.table_dashboard(:data='tableData' height='250' style='width: 100%')
          el-table-column(prop='date' label='Date' width='180')
          el-table-column(prop='name' label='Name' width='180' sortable)
          el-table-column(prop='email' label='Email')
          el-table-column(width='330')
            template(slot-scope="scope")
              el-button(type="primary" round @click="handleDialogFilm(scope.row.id)") Adicionar Filme
              el-button(type="primary" circle icon="el-icon-film")
              el-button(type="primary" circle icon="el-icon-edit" @click="handleDialogEdit(scope.row.id)")
              el-button(type="danger" circle icon="el-icon-delete" @click="deleteUser(scope.row.id)")
              el-dialog(title="Editar usuário" :visible.sync="dialogEditVisible" width="40%")
                el-input(placeholder="Digite o nome" v-model="currentUser.name")
                el-input(placeholder="Digite o email" v-model="currentUser.email")
                el-input(placeholder="Digite a data de nascimento" v-model="currentUser.date")
                el-button(type="primary" round @click="updateuser") Salvar

              el-dialog(title="Escolha o filme" :visible.sync="dialogFilmVisible" width="40%")
                el-col.modal_poster_col
                  img.poster(v-for="film in films" :src='film.poster')
                el-col(prop='title' label='Filmes' sortable)
                el-button(type="primary" round @click="updateuser") Salvar

        el-table.table_dashboard#directors(:data='directors' height='250' style='width: 100%')
          el-table-column(prop="name" label='Nome' width='150')
          el-table-column(prop="surname" label='Sobrenome' width='435')
          el-table-column(width='330')
            template(slot-scope="scope")
              el-button(type="primary" round) Adicionar Filme
              el-button(type="primary" circle icon="el-icon-film")
              el-button(type="primary" circle icon="el-icon-edit" @click="handleDialogEditDirector(scope.row.id)")
              el-button(type="danger" circle icon="el-icon-delete" @click="deleteDirector(scope.row.id)")
              el-dialog(title="Editar Diretor" :visible.sync="dialogEditDirectorVisible" width="40%")
                  el-input(placeholder="Digite o nome" v-model="currentDirector.name")
                  el-input(placeholder="Digite o sobrenome" v-model="currentDirector.surname")
                  el-button(type="primary" round @click="updateDirector") Salvar

      el-col#right
        el-table.table_dashboard(:data='films' height='540' style='width: 100%')
          el-table-column(width="110")
            template(slot-scope="scope")
              img.poster(:src='scope.row.poster')
          el-table-column(prop='title' label='Filmes' sortable)
      el-button#add_film_button(type="primary" circle icon="el-icon-plus")
</template>

<script>
import Api from "../services/Api";

export default {
  name: "Dashboard",
  data() {
    return {
      films: [],
      directors: [
        { id: 1, name: "Cristopher", surname: "Nolan" },
        { id: 2, name: "Quentin", surname: "Tarantino" },
        { id: 3, name: "Steven", surname: "Spielberg" },
        { id: 4, name: "Wes", surname: "Craven" },
        { id: 5, name: "Frank", surname: "Darabont" },
      ],
      selectedSubgenre: "",
      tableData: [
        {
          id: 1,
          date: "24/07/1998",
          name: "Lucas Anthony",
          email: "lucas@mail.com",
        },
        {
          id: 2,
          date: "21/05/1994",
          name: "Fernando Jorge",
          email: "fernando@mail.com",
        },
        {
          id: 3,
          date: "23/05/1996",
          name: "Redson Farias",
          email: "redson@mail.com",
        },
        {
          id: 4,
          date: "23/08/1997",
          name: "Filipin",
          email: "filipin@mail.com",
        },
      ],
      dialogEditVisible: false,
      dialogEditDirectorVisible: false,
      dialogFilmVisible: false,
      currentUser: {},
      currentDirector: {},
    };
  },
  components: {},
  methods: {
    async fetchFilms() {
      try {
        let url;
        this.selectedSubgenre === "" || this.selectedSubgenre === undefined
          ? (url = "movie")
          : (url = `movie/subgenre/${this.selectedSubgenre}`);
        const response = await Api.get(url);
        const data = await response.data.movies;
        this.films = data;
      } catch (error) {
        console.log(error);
      }
    },
    handleClick(value) {
      this.selectedSubgenre = value;
      this.fetchFilms();
    },
    deleteUser(user_id) {
      try {
        // REQUISIÇÃO PARA EXCLUIR DO BACK

        this.tableData.forEach((user, index) => {
          if (user.id === user_id) {
            this.tableData.splice(index, 1);
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
    deleteDirector(director_id) {
      try {
        // REQUISIÇÃO PARA EXCLUIR DO BACK

        this.directors.forEach((director, index) => {
          if (director.id === director_id) {
            this.directors.splice(index, 1);
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
    updateuser() {
      // REQUISIÇÃO PARA EDITAR O USER NO BACK

      console.log(this.tableData);
      this.dialogEditVisible = false;
    },
    updateDirector() {
      console.log(this.directors);
      this.dialogEditDirectorVisible = false;
    },
    handleDialogEditDirector(director_id) {
      this.directors.forEach((director) => {
        if (director.id === director_id) {
          this.currentDirector = director;
        }
      });

      if (this.dialogEditDirectorVisible) {
        this.dialogEditDirectorVisible = false;
      } else {
        this.dialogEditDirectorVisible = true;
      }
    },
    handleDialogEdit(user_id) {
      this.tableData.forEach((user) => {
        if (user.id === user_id) {
          this.currentUser = user;
        }
      });

      if (this.dialogVisible) {
        this.dialogEditVisible = false;
      } else {
        this.dialogEditVisible = true;
      }
    },
    handleDialogFilm(user_id) {
      this.tableData.forEach((user) => {
        if (user.id === user_id) {
          this.currentUser = user;
        }
      });

      if (this.dialogFilmVisible) {
        this.dialogFilmVisible = false;
      } else {
        this.dialogFilmVisible = true;
      }
    },
  },
  mounted() {
    this.fetchFilms();
  },
};
</script>

<style>
.dashboard {
  width: 100vw;
  display: flex;
  flex-direction: column;
}

.dashboard_content {
  height: 89vh;
  width: 100vw;
  overflow-y: scroll;
  padding-left: 2%;
  padding-top: 2%;
}

#left {
  width: 70%;
}

#left:last-child {
  margin-top: 4%;
}

#right {
  width: 22.5%;
  margin-left: 4%;
}

.table_dashboard {
  border-radius: 20px;
  box-shadow: black 2px 2px 8px 0px;
}

#directors {
  margin-top: 4%;
}

.poster {
  width: 80%;
  border-radius: 3px;
  cursor: pointer;
}

#add_film_button {
  position: fixed;
  margin-left: -5%;
  bottom: 5%;
}

.el-dialog {
  border-radius: 20px;
}

.el-dialog__body {
  display: flex;
  flex-direction: column;
  gap: 3vh;
}

.modal_poster_col {
  width: 38%;
}

h3 {
  font-size: 200px;
}
</style>
