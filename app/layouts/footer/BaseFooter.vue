<template>
  <div class="footer">
    <div class="list">
      <p><a href="/docs">공지사항</a></p>
      <p><a href="/docs">문의사항</a></p>
      <p><a href="/docs">FAQ</a></p>
      <p><a href="/docs">정책 및 약관</a></p>
      <div>
        Copyright DOUZONE ICT GROUP. All rights reserved
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class extends Vue {}
</script>
<style scoped>
a {
  text-decoration: none;
  color: black;
}

.footer {
  background-color: #dddddd;
  width: 100%;
  text-align: center;
  height: 200px;
}

.footer .list p {
  display: inline-block;
  width: 10%;
  color: white;
}

.list div {
  color: #7f828b;
  margin-top: 25px;
}
</style>
