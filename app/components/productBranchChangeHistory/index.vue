<template>
  <div class="container-panel">
    <div class="view-top mgb-20">
      <h1 class="tit-con-text">
        {{ $store.state.product.product.productName }}<span>변경내역</span>
      </h1>
    </div>
    <div class="view-top bdr-bot-none">
      <p class="tit-con-sub">
        변경내역<span class="dbs-icon-button ico-left ico-contents branch">{{
          $route.params.branchName
        }}</span>
      </p>
    </div>
    <ul class="dbs-list ui-accordion mgb-60">
      <li
        v-for="commit in $store.state.commit.commitList"
        :key="commit.short_id"
        class="list-row"
        @click="onClickCommit(commit.short_id)"
      >
        <div
          class="project-detail"
          :class="{ selected: clickedCommitShortId === commit.short_id }"
          style="cursor: pointer;"
        >
          <div class="project-wrap">
            <div class="project-title">
              <p>
                {{ commit.short_id }}
              </p>
              <div class="user-info">
                <span>{{ commit.committer_email }}</span>
                <span>{{ commit.committed_date }}</span>
                <!-- commit list 가 너무 많아서 일단 committed_date 로 출력 list 해결되면 >> {{commit.changed_time}} 이거로 바꾸기 -->
              </div>
            </div>
            <div class="project-description">
              <p class="dbs-icon-button ico-left ico-contents change">
                {{ commit.message.split('\n')[0] }}
              </p>
            </div>
          </div>
          <div class="project-controls" style="cursor: pointer;">
            <span class="ui-accordion-arrow"></span>
          </div>
        </div>
        <div class="hidden-area">
          <ul v-if="commit.message.split('\n').length > 1" class="bul-hypen">
            <li
              v-for="(commitMessage, index) in commit.message
                .split('\n')
                .slice(1)
                .filter((message) => message !== '')"
              :key="index"
            >
              {{ commitMessage }}
            </li>
          </ul>
          <div class="compare-content" v-html="prettyHtml(commit)"></div>
        </div>
      </li>
    </ul>
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
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import { Diff2Html } from 'diff2html';
import * as commit from '@/store/modules/commit';
import 'diff2html/dist/diff2html.min.css';

const Commit = namespace('commit');

@Component
export default class ProductBranchChangeHistory extends Vue {
  @Commit.Action('getCommitList') getCommitListAction;

  clickedCommitShortId: string = '';

  created() {
    if (!this.$store.state.user.user.gitlabToken) {
      return;
    }

    this.getCommitListAction({
      productCode: this.$route.params.productCode,
      branchName: this.$route.params.branchName,
      gitlabToken: this.$store.state.user.user.gitlabToken,
    });
  }

  onClickCommit(shortId) {
    if (this.clickedCommitShortId === shortId) {
      // 같은 commit 클릭 시 닫힘
      this.clickedCommitShortId = '';
    } else {
      this.clickedCommitShortId = shortId;
    }
  }
  prettyHtml(commit) {
    let differenceData = '';
    for (const key in commit.diffData) {
      const diffContents =
        '--- ' +
        commit.diffData[key].old_path +
        '\n+++ ' +
        commit.diffData[key].new_path +
        '\n' +
        commit.diffData[key].diff;

      differenceData += diffContents;
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
