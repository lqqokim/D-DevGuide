<template>
  <div>
    <div class="view-top">
      <h1 class="tit-con-text">
        {{ $store.state.product.product.productName
        }}<span>작업 브랜치 관리</span>
      </h1>
    </div>
    <div class="gray-info-box mgt-20 mgb-60">
      <div class="box-desc">
        <h2 class="tit-con-icon-sub-title icon-title dews">제품정보</h2>
        <ul class="bul-round-box">
          <li>
            <span>제품명</span> {{ $store.state.product.product.productName }}
          </li>
          <li>
            <span>제품설명</span>
            {{ $store.state.product.product.description }}
          </li>
          <li v-if="$store.state.product.product.apiUse">
            <span>API 사용여부</span> 사용
          </li>
          <li v-else><span>API 사용여부</span> 미사용</li>
        </ul>
      </div>
      <div class="box-desc">
        <h2 class="tit-con-icon-sub-title icon-title gitlab">
          GitLab 리포지토리 정보
        </h2>
        <ul class="bul-round-box">
          <li>
            <span>프로젝트 ID</span>
            {{ $store.state.product.product.projectId }}
          </li>
          <li>
            <span>기준 브랜치</span>
            {{ $store.state.product.product.targetBranch }}
          </li>
          <li>
            <span>문서 기본경로</span>
            {{ $store.state.product.product.manualDocPath }}
          </li>
          <li>
            <span>API 기본경로</span>
            {{ $store.state.product.product.APIDocPath }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class BranchManageProductInfo extends Vue {}
</script>

<style scoped></style>
