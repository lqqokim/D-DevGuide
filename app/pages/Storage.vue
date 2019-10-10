<template>
  <div>
    <h2>자료실 페이지</h2>
    <div class="fileUpload">
      <input
        type="file"
        name="storageFile"
        accept=".jpg, .jpeg, .png"
        @change="onSelect"
      />
      <button @click="upload">전송</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class Storage extends Vue {
  private file: any;

  onSelect($event): void {
    this.file = $event.target as Element;
  }

  upload(): void {
    const formData = new FormData();
    formData.append('name', this.file.name);
    formData.append('bin', this.file.files[0]);

    this.$axios
      .post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //   try {
  //   this.$store.dispatch('sdfsdf')
  // } catch (e) {
  // }
}
</script>

<style scoped></style>
