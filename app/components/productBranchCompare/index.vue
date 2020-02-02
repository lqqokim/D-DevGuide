<template>
  <div class="container-panel">
    <div class="view-top mgb-20">
      <h1 class="tit-con-text">
        {{ $store.state.product.product.productCode }}<span>브랜치 비교</span>
      </h1>
    </div>
    <div class="view-top bdr-bot-none">
      <p class="tit-con-sub">
        브랜치 비교<span
          >{{ $store.state.product.product.targetBranch }} -
          {{ $route.params.branchName }}</span
        >
      </p>
    </div>
    <div class="compare-branch-box">
      <div class="compare-content" v-html="prettyHtml()"></div>
    </div>
    <div class="btn-wrap-both mgt-10 mgb-80">
      <span class="fr"
        ><nuxt-link
          :to="{
            name: 'branchManagement',
            params: {
              productCode: $store.state.product.product.productCode,
              branchName: $route.params.branchName,
            },
          }"
          tag="button"
          class="dbs-icon-button ico-left small list"
        >
          목록
        </nuxt-link></span
      >
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { Diff2Html } from 'diff2html';
import 'diff2html/dist/diff2html.min.css';

@Component
export default class ProductBranchCompare extends Vue {
  prettyHtml(commit) {
    let differenceData = '';
    if (this.$route.params.mergeRequestIId !== undefined) {
      this.$store.state.mergeRequest.mergeRequestDiffData.forEach((changes) => {
        const diffContents =
          '--- ' +
          changes.old_path +
          '\n+++ ' +
          changes.new_path +
          '\n' +
          changes.diff;

        differenceData += diffContents;
      });
    } else {
      this.$store.state.branch.branchDiffData.forEach((changes) => {
        const diffContents =
          '--- ' +
          changes.old_path +
          '\n+++ ' +
          changes.new_path +
          '\n' +
          changes.diff;

        differenceData += diffContents;
      });
    }
    return Diff2Html.getPrettyHtml(differenceData, {
      inputFormat: 'diff',
      showFiles: false,
      matching: 'lines',
      outputFormat: 'line-by-line',
    });
  }
}
</script>
