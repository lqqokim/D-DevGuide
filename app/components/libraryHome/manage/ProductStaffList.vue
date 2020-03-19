<template>
  <div>
    <div class="position-wrap">
      <h2 class="tit-con-icon-title icon-title manager">
        스태프 목록
      </h2>
      <div class="pst-rbtn">
        <button
          type="button"
          class="dbs-icon-button ico-left small plus"
          @click="onClickAddStaff"
        >
          추가
        </button>
      </div>
    </div>
    <div class="tbl-wrap mgb-20">
      <table class="tbl-write-ver tbl-fixed">
        <colgroup>
          <col style="width: auto;" />
          <col style="width: 95px;" />
        </colgroup>
        <thead>
          <tr>
            <th>이름(아이디)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(staff, index) in localStaffs" :key="staff._id">
            <td>{{ staff.empName }}({{ staff.empId }})</td>
            <td @click="onclickRemoveStaff(staff, index)">삭제</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="gray-info-box mgt-10 mgb-20">
      <p>
        직원 사용자 중 스태프로 추가된 사람은 모든 항목에 대한 수정/삭제 권한을
        가집니다.
      </p>
    </div>

    <modal-component
      :modal-title="gwModalInfo.title"
      :modal-name="gwModalInfo.name"
      :modal-height="gwModalInfo.height"
      :modal-width="gwModalInfo.width"
      @emit-confirm="searchGWUserModalConfirm"
    >
      <search-g-w-user-modal
        slot="modalContent"
        ref="searchGWUserModal"
      ></search-g-w-user-modal>
    </modal-component>
  </div>
</template>
<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch,
  Emit,
  namespace,
} from 'nuxt-property-decorator';
import ProductCardList from '@/components/libraryHome/manage/ProductCardList.vue';
import ModalComponent from '@/components/common/modal/modalComponent.vue';
import SearchGWUserModal from '@/components/common/productManage/SearchGWUserModal.vue';

import * as video from '@/store/modules/video';
import { IAlert } from '~/store/modules/common';

const SearchGWUser = namespace('searchGWUser');
const Common = namespace('common');

@Component({
  components: {
    ProductCardList,
    ModalComponent,
    SearchGWUserModal,
  },
})
export default class ProductStaffList extends Vue {
  @SearchGWUser.Action('getSearchGWUser')
  getSearchGWUserAction;
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;
  @Prop() readonly staffs!: any;
  @Watch('staffs', { immediate: true, deep: true })
  onStaffsChange(val) {
    this.localStaffs = val.slice();
  }

  $refs!: {
    searchGWUserModal: any;
  };

  $modal!: any;

  localStaffs: {
    empName: string;
    positionName: string;
    deptPath: string;
    empId: string;
  }[] = [];

  gwModalInfo = {
    title: '그룹웨어 사용자 검색',
    name: 'searchGWUserModal',
    height: '673px',
    width: '700px',
  };

  async onClickAddStaff(): Promise<any> {
    if (!this.$store.state.searchGWUser.searchGWUserList.length) {
      await this.getSearchGWUserAction({
        empName: '',
        loginId: '',
      });
    }

    this.$modal.show(this.gwModalInfo.name);
  }

  onclickRemoveStaff(index): void {
    this.localStaffs.splice(index, 1);
  }

  getStaffs() {
    return this.localStaffs;
  }

  searchGWUserModalConfirm(clickConfirmBtn) {
    const userInfo = this.$refs.searchGWUserModal.getData();

    if (clickConfirmBtn) {
      if (userInfo.loginId === '') {
        this.alertAction({
          type: 'warning',
          isShow: true,
          msg: '추가할 사용자를 선택하세요.',
        }).then(() => {});
      } else {
        let duplicatedUser: boolean = false;
        this.localStaffs.forEach((staff) => {
          if (!duplicatedUser && staff.empId === userInfo.loginId) {
            duplicatedUser = true;
          }
        });
        if (duplicatedUser) {
          this.alertAction({
            type: 'warning',
            isShow: true,
            msg: '이미 등록되어있는 사용자입니다.',
          }).then(() => {});
        } else {
          this.localStaffs.push({
            empName: userInfo.empName,
            empId: userInfo.loginId,
            deptPath: userInfo.deptPath,
            positionName: userInfo.positionName,
          });
          this.$modal.hide(this.gwModalInfo.name);
        }
      }
    } else {
      this.$modal.hide(this.gwModalInfo.name);
    }
  }
}
</script>
