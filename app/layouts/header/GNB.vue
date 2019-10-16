<template>
  <div class="header">
    <!--    <p>Header GNB</p>-->
    <div class="gnb">
      <p><a href="/docs" @mouseover="showSubMenu">비즈니스 스쿨</a></p>
      <p>
        <nuxt-link to="/docs" @mouseover.native="showSubMenu"
          >개발자 지원</nuxt-link
        >
      </p>
      <p><a href="/docs" @mouseover="showSubMenu">포럼</a></p>
    </div>
    <div v-if="isShowSubMenu" class="submenu" @mouseleave="leaveSubMenu">
      <div class="docs">
        <p><nuxt-link to="/docs/:productId">개발자 문서</nuxt-link></p>
        <p><nuxt-link to="/qna/:categoryName">질문 / 답변</nuxt-link></p>
        <p><nuxt-link to="/library/video">자료실</nuxt-link></p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
@Component
export default class extends Vue {
  isShowSubMenu: boolean = false;

  showSubMenu() {
    this.isShowSubMenu = !this.isShowSubMenu;
  }

  leaveSubMenu() {
    this.isShowSubMenu = !this.isShowSubMenu;
  }
}
</script>
<style scoped>
.header {
  background-color: deepskyblue;
  font-size: 18px;
  z-index: 0;
}
a {
  text-decoration: none;
  color: white;
}

a:hover {
  color: blue;
}
.header .gnb p {
  display: inline-block;
  width: 33%;
  color: white;
}

.submenu {
  z-index: 1;
}

.submenu .docs,
.gnb {
  width: 100%;
  text-align: center;
}
.gnb {
  display: flex;
  justify-content: space-around;
}
</style>
