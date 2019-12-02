<template>
  <div class="left-menu">
    <p class="tit-con-left"><strong>질문/답변</strong></p>
    <div class="ui-accordion-left-pnl">
      <ul>
        <li class="nav-item depth-1 folder selected">
          <a href="#" class="nav-text">문서관리</a>
          <ul class="nav-container depth-2" style="display: block;">
            <li class="nav-item depth-2 folder selected">
              <a href="#" class="nav-text">DEWS/UI</a>
              <ul class="nav-container depth-3" style="display: block;">
                <li class="nav-item depth-3 page selected">
                  <a href="#" class="nav-text">작업 브랜치 관리</a>
                </li>
                <li class="nav-item depth-3 page">
                  <a href="#" class="nav-text">버전 관리</a>
                </li>
                <li class="nav-item depth-3 page">
                  <a href="#" class="nav-text">공지사항 관리</a>
                </li>
              </ul>
            </li>
            <li class="nav-item depth-2 folder selected">
              <a href="#" class="nav-text">DEWS J</a>
              <ul class="nav-container depth-3" style="display: block;">
                <li class="nav-item depth-3 page">
                  <a href="#" class="nav-text">작업 브랜치 관리</a>
                </li>
                <li class="nav-item depth-3 page">
                  <a href="#" class="nav-text">버전 관리</a>
                </li>
                <li class="nav-item depth-3 page">
                  <a href="#" class="nav-text">공지사항 관리</a>
                </li>
              </ul>
            </li>
            <li class="nav-item depth-2 folder selected">
              <a href="#" class="nav-text">DEWS Q</a>
              <ul class="nav-container depth-3" style="display: block;">
                <li class="nav-item depth-3 page">
                  <a href="#" class="nav-text">작업 브랜치 관리</a>
                </li>
                <li class="nav-item depth-3 page">
                  <a href="#" class="nav-text">버전 관리</a>
                </li>
                <li class="nav-item depth-3 page">
                  <a href="#" class="nav-text">공지사항 관리</a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="nav-item depth-1 page selected">
          <a href="#" class="nav-text">제품관리</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class extends Vue {}
</script>
<style lang="scss"></style>
