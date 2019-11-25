<template>
  <div class="fileUpload">
    <input
      ref="fileInput"
      type="file"
      name="storageFile"
      :accept="FILE_ACCEPT_TYPES"
      @change="onChangeFile"
    />
    <!--    <button @click="onClickRegister">확인</button>-->
  </div>
</template>
<script lang="ts">
import { Vue, Component, Emit } from 'nuxt-property-decorator';

@Component
export default class LibraryDocRegister extends Vue {
  @Emit('emit-file')
  onChangeFile(): void {
    this.file = this.$refs.fileInput;
    // this.file = this.$refs.fileInput.files; // multiple
    return this.file;
  }

  private file: any;
  readonly FILE_ACCEPT_TYPES: Array<String> = [
    // 'image/*',
    // 'video/*',
    // 'audio/*',
    // '.csv',
    // 'text/plain',
    'application/pdf',
    // 'application/msword',
    // 'application/vnd.ms-excel',
    // 'application/vnd.ms-powerpoint',
    // 'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    // 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    // 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];

  // TS2339 $refs error
  $refs!: {
    fileInput: HTMLFormElement;
  };

  // async onClickRegister(): Promise<void> {
  //   if (!this.file) return;
  //
  //   try {
  //     await this.registerDocAction(this.file);
  //     this.initialFile();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  initialFile(): void {
    this.file = null;
    this.$refs.fileInput.value = '';
  }
}
</script>

<style></style>
