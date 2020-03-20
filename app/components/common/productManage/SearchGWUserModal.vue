<template>
  <div class="dbs-dialog">
    <div class="dbs-dialog-form mgb-10">
      <div class="ui-select w-170">
        <select title="품목형태" class="off" tabindex="-1">
          <option value="전체" :selected="searchCategory === '전체'"
            >전체</option
          >
          <option value="이름" :selected="searchCategory === '이름'"
            >이름</option
          >
          <option value="아이디" :selected="searchCategory === '아이디'"
            >아이디</option
          >
        </select>

        <button
          type="button"
          class="ui-select-btn"
          :class="{ on: clickSelectBoxFlag }"
          title="전체"
          @click="onClickSelectBox"
        >
          {{ searchCategory }}
        </button>
        <div
          class="ui-select-wrap"
          :class="{ on: clickSelectBoxFlag }"
          @mouseleave="mouseLeaveToOtherArea"
        >
          <div class="ui-select-options">
            <button
              type="button"
              class="ui-select-opt"
              value="전체"
              @click="onClickSelectBtn"
            >
              <b class="ui-select-txt">전체</b>
            </button>
            <button
              type="button"
              class="ui-select-opt selected"
              value="이름"
              @click="onClickSelectBtn"
            >
              <b class="ui-select-txt">이름</b>
            </button>
            <button
              type="button"
              class="ui-select-opt"
              value="아이디"
              @click="onClickSelectBtn"
            >
              <b class="ui-select-txt">아이디</b>
            </button>
          </div>
        </div>
      </div>
      <div class="srch-wrap-bar-dialog">
        <div class="srch-wrap">
          <input
            ref="searchWord"
            type="search"
            class="m-srch-bar"
            @keydown="isClickedEnter"
          />
          <button
            type="button"
            class="btn-search small"
            @click="onClickSearchGWUser"
          >
            search
          </button>
        </div>
      </div>
    </div>
    <div class="tbl-wrap" style="height: 448px;">
      <table class="tbl-write-ver tbl-fixed">
        <colgroup>
          <col style="width: 50px;" />
          <col style="width: 80px;" />
          <col style="width: 120px;" />
          <col style="width: auto;" />
          <col style="width: 150px;" />
        </colgroup>
        <thead>
          <tr>
            <th></th>
            <th>이름</th>
            <th>직급</th>
            <th>부서</th>
            <th>아이디</th>
          </tr>
        </thead>
        <tbody>
          <!-- 결과가 없을 때-->
          <tr v-if="$store.state.searchGWUser.searchGWUserList.length === 0">
            <td colspan="5">
              <p class="no-result">검색결과가 없습니다.</p>
            </td>
          </tr>
          <tr
            v-for="user in $store.state.searchGWUser.searchGWUserList"
            v-else
            :key="user.loginId"
          >
            <td>
              <div class="radio-button-wrap">
                <input
                  :id="user.loginId"
                  type="radio"
                  :name="user.loginId"
                  class="dews-radio"
                  :checked="checkedUser.loginId === user.loginId"
                  @click="onClickRadioBtn(user)"
                />
                <label :for="user.loginId" class="dews-radio"> </label>
              </div>
            </td>
            <td>
              {{ user.empName }}
            </td>
            <td>{{ user.positionName }}</td>
            <td class="txt-left">{{ user.deptPath }}</td>
            <td class="txt-left" style="word-break: break-all;">
              {{ user.loginId }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import { searchGWUser } from '@/store/modules/searchGWUser.ts';
import { IAlert } from '@/store/modules/common';

const SearchGWUser = namespace('searchGWUser');
const Common = namespace('common');

@Component
export default class SearchGWUserModal extends Vue {
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;
  @SearchGWUser.Action('getSearchGWUser')
  getSearchGWUserAction!: (payload: {
    empName: string;
    loginId: string;
  }) => Promise<any>;
  @SearchGWUser.Action('getSearchGWUserByName')
  getSearchGWUserByNameAction!: (payload: { empName: string }) => Promise<any>;
  @SearchGWUser.Action('getSearchGWUserByID')
  getSearchGWUserByIDAction!: (payload: { loginId: string }) => Promise<any>;
  @SearchGWUser.Mutation('emptySearchGWUserList')
  emptySearchGWUserList!: () => void;

  searchCategory: string = '전체';
  clickSelectBoxFlag: boolean = false;
  checkedUser: searchGWUser = {
    empName: '',
    positionName: '',
    deptPath: '',
    loginId: '',
  };

  $refs!: {
    searchWord: any;
  };

  isClickedEnter(e) {
    if (e.keyCode === 13) {
      this.onClickSearchGWUser();
    }
  }

  beforeDestroy() {
    this.emptySearchGWUserList();
  }

  onClickSearchGWUser() {
    this.checkedUser = {
      empName: '',
      positionName: '',
      deptPath: '',
      loginId: '',
    };
    const searchWord = this.$refs.searchWord.value;
    if (this.searchCategory === '전체') {
      this.getSearchGWUserAction({
        empName: searchWord,
        loginId: searchWord,
      });
    } else if (this.searchCategory === '이름') {
      this.getSearchGWUserByNameAction({
        empName: searchWord,
      });
    } else {
      this.getSearchGWUserByIDAction({
        loginId: searchWord,
      });
    }
  }

  onClickSelectBox() {
    this.clickSelectBoxFlag = !this.clickSelectBoxFlag;
  }

  onClickSelectBtn(e) {
    this.searchCategory = e.target.value;
    this.clickSelectBoxFlag = false;
  }

  onClickRadioBtn(user: searchGWUser) {
    this.checkedUser = user;
  }

  // 마우스가 select box 를 벗어났을 때 select box 를 닫기 위한 함수
  mouseLeaveToOtherArea() {
    this.clickSelectBoxFlag = false;
  }

  getData() {
    return this.checkedUser;
  }
}
</script>

<style scoped></style>
