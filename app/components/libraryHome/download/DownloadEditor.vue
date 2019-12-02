<template>
  <div class="position-wrap">
    <div class="top">
      <label>
        <select name="product">
          <option
            v-for="product in $store.state.download.products"
            :key="product._id"
            :value="product.productName"
            :selected="product.productName === $route.params.productName"
            >{{ product.productName }}</option
          >
        </select>
      </label>

      <label>
        <input v-model="selectedFile.fileTitle" type="text" />
      </label>
    </div>

    <div class="content">
      <file-comp @emit-file="onChangeFile"></file-comp>

      <div class="tuiEditor">
        <label>
          <input
            v-model="selectedFile.description"
            type="text"
            style="width: 300px;"
          />
        </label>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import FileComp from '@/components/common/file/FileComp.vue';

@Component({
  components: {
    FileComp,
  },
})
export default class DownloadEditor extends Vue {
  file!: any;

  get selectedFile() {
    return this.$store.state.download.selectedFile;
  }

  get isSelectedFile() {
    return this.$store.state.download.selectedFile._id;
  }

  onChangeFile(file: any): void {
    this.file = file;
  }

  getFileInfo(): object {
    const user = this.$store.state.user.user;
    return {
      file: this.file,
      data: {
        fileTitle: this.selectedFile.fileTitle,
        projectId: '1',
        productName: this.$route.params.productName,
        empName: user.name,
        deptPath: user.deptPath,
        description: this.selectedFile.description,
      },
    };
  }
}
</script>
