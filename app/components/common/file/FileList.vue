<template>
  <div class="list-area">
    <button @click="getFiles">파일 목록 가져오기</button>
    <h2>D_ERP</h2>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>ID</th>
          <th>Name</th>
          <th>Original Name</th>
          <th>Size</th>
          <th>MimeType</th>
          <th>Encoding</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(file, index) in files" :key="file._id">
          <td>{{ index + 1 }}</td>
          <td>{{ file._id }}</td>
          <td>{{ file.name }}</td>
          <td>{{ file.originalName }}</td>
          <td>{{ file.size }}</td>
          <td>{{ file.mimeType }}</td>
          <td>{{ file.encoding }}</td>
          <td><a :href="`/uploads/${file.name}`" download>다운로드</a></td>
        </tr>
      </tbody>
    </table>
    <div id="example1"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import * as PDFObject from 'pdfobject';
import { IFile } from './IFile';

@Component
export default class FileList extends Vue {
  files: Array<IFile> = [];

  getFiles(): void {
    PDFObject.embed('/uploads/1574311947405.pdf', '#example1');

    this.$axios
      .get('api/library/download/list')
      .then((res) => {
        this.files = res.data as Array<IFile>;
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>
<style scoped>
.pdfobject-container {
  height: 30rem;
  border: 1rem solid rgba(0, 0, 0, 0.1);
}

.list-area {
  margin-top: 100px;
}

table {
  width: 100%;
  font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4caf50;
  color: white;
}
</style>
