<template>
  <div>
    <div class="position-wrap">
      <h2 class="tit-con-icon-title icon-title manager">
        관리자 정보
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
    <div class="tbl-wrap mgb-20" style="overflow-y: auto; max-height: 180px;">
      <table class="tbl-write-ver tbl-fixed">
        <colgroup>
          <col style="width: 200px;" />
          <col style="width: auto;" span="3" />
        </colgroup>
        <thead>
          <tr>
            <th>이름(아이디)</th>
            <th>작성</th>
            <th>병합</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(staff, index) in localStaffs" :key="staff._id">
            <td>{{ staff.empName }}({{ staff.empId }})</td>
            <td>
              <div class="dbs-checkbox-wrapper">
                <input
                  :id="'write_' + index"
                  type="checkbox"
                  :name="'write_' + index"
                  :value="staff.writeAuthority"
                  :checked="staff.writeAuthority"
                  @click="changeWriteAuthority(index)"
                />
                <label :for="'write_' + index" class="dbs-checkbox"></label>
              </div>
            </td>
            <td>
              <div class="dbs-checkbox-wrapper">
                <input
                  :id="'merge_' + index"
                  type="checkbox"
                  :name="'merge_' + index"
                  :checked="staff.mergeAuthority"
                  @click="changeMergeAuthority(index)"
                />
                <label :for="'merge_' + index" class="dbs-checkbox"></label>
              </div>
            </td>
            <td style="cursor: pointer;" @click="onclickRemoveStaff(index)">
              삭제
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <modal-component
      :modal-title="searchGWUserModalTitle"
      :modal-name="searchGWUserModalName"
      :modal-height="searchGWUserModalHeight"
      :modal-width="searchGWUserModalWidth"
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
  namespace,
} from 'nuxt-property-decorator';
import * as searchGWUser from '@/store/modules/searchGWUser.ts';
import ModalComponent from '@/components/common/modal/modalComponent.vue';
import SearchGWUserModal from '@/components/common/productManage/SearchGWUserModal.vue';
import { IAlert } from '@/store/modules/common';

const SearchGWUser = namespace('searchGWUser');
const Common = namespace('common');

@Component({
  components: {
    ModalComponent,
    SearchGWUserModal,
  },
})
export default class ProductAdminList extends Vue {
  @SearchGWUser.Action('getSearchGWUser')
  getSearchGWUserAction;
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;

  @Prop() readonly staffs!: any;
  @Watch('staffs', { immediate: true, deep: true })
  onStaffsChange(val) {
    if (val !== undefined) {
      this.localStaffs = val.slice();
    } else {
      this.localStaffs = [];
    }
  }

  $refs!: {
    searchGWUserModal: any;
  };

  $modal!: any;

  searchGWUserModalTitle: string = '그룹웨어 사용자 검색';
  searchGWUserModalName: string = 'searchGWUserModal';
  searchGWUserModalHeight: string = '673px';
  searchGWUserModalWidth: string = '700px';

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
            writeAuthority: false,
            mergeAuthority: false,
          });
          this.$modal.hide(this.searchGWUserModalName);
        }
      }
    } else {
      this.$modal.hide(this.searchGWUserModalName);
    }
  }

  localStaffs: {
    empName: string;
    empId: string;
    writeAuthority: boolean;
    mergeAuthority: boolean;
  }[] = [];

  async onClickAddStaff(): Promise<any> {
    await this.getSearchGWUserAction({
      empName: '',
      loginId: '',
    });
    this.$modal.show(this.searchGWUserModalName);
  }

  onclickRemoveStaff(index): void {
    this.alertAction({
      type: 'question',
      isShow: true,
      msg: '관리자에서 해당 사용자를 삭제하시겠습니까?',
    }).then((res) => {
      if (res.ok) {
        this.localStaffs.splice(index, 1);
      }
    });
  }

  getStaffs() {
    return this.localStaffs;
  }

  changeWriteAuthority(index) {
    this.localStaffs[index].writeAuthority = !this.localStaffs[index]
      .writeAuthority;
  }

  changeMergeAuthority(index) {
    this.localStaffs[index].mergeAuthority = !this.localStaffs[index]
      .mergeAuthority;
  }
}
</script>

<style scoped></style>
