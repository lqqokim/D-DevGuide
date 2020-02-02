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
            <th>삭제</th>
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
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'nuxt-property-decorator';
import ProductCardList from '@/components/libraryHome/manage/ProductCardList.vue';
import * as video from '@/store/modules/video';

@Component({
  components: {
    ProductCardList,
  },
})
export default class ProductStaffList extends Vue {
  @Prop() readonly staffs!: any;
  @Watch('staffs', { immediate: true, deep: true })
  onStaffsChange(val) {
    this.localStaffs = val.slice();
  }

  localStaffs: {
    empName: string;
    positionName: string;
    deptPath: string;
    empId: string;
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

  temp = [
    {
      empName: '노휘겸',
      positionName: '수석 연구원',
      deptPath: '플랫폼개발본부 플랫폼개발1팀',
      empId: 'whistle',
    },
    {
      empName: '정일영',
      positionName: '책임 연구원',
      deptPath: '플랫폼개발본부 플랫폼개발1팀',
      empId: 'jiy',
    },
    {
      empName: '전병철',
      positionName: '연구원',
      deptPath: '플랫폼개발본부 플랫폼개발1팀',
      empId: 'jbc',
    },
    {
      empName: '김인수',
      positionName: '연구원',
      deptPath: '플랫폼개발본부 플랫폼개발1팀',
      empId: 'kis4204',
    },
  ];
}
</script>
