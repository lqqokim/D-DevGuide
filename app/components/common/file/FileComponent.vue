<template>
  <input
    id="file"
    ref="fileInput"
    class="inp-base"
    style="width: 648px;"
    type="file"
    name="storageFile"
    :accept="accept"
    @change="onChangeFile"
  />
</template>
<script lang="ts">
import { Vue, Component, Emit, Prop } from 'nuxt-property-decorator';

@Component
export default class FileComponent extends Vue {
  @Prop() readonly accept!: string[];

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
