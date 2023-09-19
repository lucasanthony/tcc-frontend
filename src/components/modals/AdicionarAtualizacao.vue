<template lang="pug">
div.modal-content
    div.col
        el-divider(
            content-position="left"
        ) Descrição
        el-input(
            v-model="news.description"
            type="textarea"
            placeholder="Descrição"
            :disabled="isVisualizar"
        )
        el-divider(
            content-position="left"
        ) URL
        el-input(
            placeholder="URl"
            v-model="news.updateLink"
            :disabled="isVisualizar"
        )
        el-divider(
            content-position="left"
        ) Imagem
        el-input(
            v-model="news.images"
            type="file"
            accept="image/*"
            @change="onImageSelected"
            :disabled="isVisualizar"
        )
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'AdicionarAtualizacao',

    props: {
        news: {
            type: Object,
            required: true
        },
        isVisualizar: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    data() {
        return {
            dados:[]
        }
    },

    methods: {
        ...mapActions({
            findById: 'findById'
        }),

        onImageSelected(event) {
            console.log(event);
        }
    }
}
</script>

<style lang="scss" scoped>
.modal-content {
  display: flex;
  gap: 2%;
  justify-content: center;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 2vh;
  flex: 1;
}
</style>