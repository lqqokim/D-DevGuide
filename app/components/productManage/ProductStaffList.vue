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
    <div class="tbl-wrap mgb-20">
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
            <th>삭제</th>
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
            <td @click="onclickRemoveStaff(index)">삭제</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'nuxt-property-decorator';

@Component
export default class ProductAdminList extends Vue {
  @Prop() readonly staffs!: any;
  @Watch('staffs', { immediate: true, deep: true })
  onStaffsChange(val) {
    if (val !== undefined) {
      this.localStaffs = val.slice();
    } else {
      this.localStaffs = [];
    }
  }

  localStaffs: {
    empName: string;
    empId: string;
    writeAuthority: boolean;
    mergeAuthority: boolean;
  }[] = [];

  onClickAddStaff(): void {
    for (let i = 0; i < this.temp.length; i++) {
      this.localStaffs.push(this.temp[i]);
    }
  }

  onclickRemoveStaff(index): void {
    this.localStaffs.splice(index, 1);
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

  temp = [
    {
      empName: '노휘겸',
      empId: 'whistle',
      writeAuthority: true,
      mergeAuthority: true,
    },
    {
      empName: '전병철',
      empId: 'years87',
      writeAuthority: true,
      mergeAuthority: false,
    },
  ];
}
</script>

<style scoped></style>
