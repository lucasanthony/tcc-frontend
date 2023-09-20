<template lang="pug">
div.modal-content
    div.col
        el-divider(
            content-position="left"
        ) Descrição
        el-input(
            v-model="atualizacao.description"
            type="textarea"
            placeholder="Descrição"
            :disabled="isVisualizar"
        )
        el-divider(
            content-position="left"
        ) URL
        el-input(
            placeholder="URl"
            v-model="atualizacao.updateLink"
            :disabled="isVisualizar"
        )
        el-divider(
            content-position="left"
        ) Imagem
        input(
            type="file"
            ref="imageInput"
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
        atualizacao: {
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
            dados:[],
        }
    },

    methods: {
        ...mapActions({
            findById: 'findById'
        }),

        onImageSelected(e) {
            this.atualizacao.image = e.target.files[0]
            this.convertImageToBuffer();
        },

        async convertImageToBuffer() {
            if(!this.atualizacao.image) {
                return;
            }
            
            this.atualizacao.image = new Uint8Array(await this.atualizacao.image.arrayBuffer());
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