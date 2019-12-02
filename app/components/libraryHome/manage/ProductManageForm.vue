<template>
  <div class="right-proc-content">
    <h2 class="tit-con-icon-title icon-title dews">제품정보</h2>
    <div class="tbl-wrap mgb-60">
      <table class="tbl-write tbl-fixed">
        <colgroup>
          <col style="width: 154px;" />
          <col style="width: auto;" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">제품명</th>
            <td>
              <input
                v-model="localProduct.productName"
                type="text"
                class="inp-base w-100p"
                placeholder="DEWS/UI"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">제품코드</th>
            <td>
              <input
                v-model="localProduct.productCode"
                type="text"
                class="inp-base w-100p"
                placeholder="UI"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">제품설명</th>
            <td>
              <input
                v-model="localProduct.description"
                type="text"
                class="inp-base w-100p"
                placeholder="DEWS Front-end UI Framework"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
          <tr
            v-for="(staff, index) in localStaffs"
            :key="staff._id + index.toString()"
          >
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
    <div class="btn-wrap-sub">
      <button
        type="button"
        class="dbs-icon-button ico-left small confirm"
        @click="onclickSaveStaffs"
      >
        확인
      </button>
      <button type="button" class="dbs-icon-button ico-left small cancel">
        취소
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'nuxt-property-decorator';
import ProductCardList from '@/components/libraryHome/manage/ProductCardList.vue';

@Component({
  components: {
    ProductCardList,
  },
})
export default class ProductManageForm extends Vue {
  @Prop() readonly product!: {
    productName: string;
    productCode: string;
    description: string;
    staff: any[];
  };

  @Prop() readonly staffs!: any[];
  @Emit('save-staffs')
  onclickSaveStaffs() {
    return this.localStaffs;
  }

  @Emit('remove-staff')
  onclickRemoveStaff(staff, index) {
    this.localStaffs.splice(index, 1);
    return this.localStaffs;
  }

  // @Watch('product', { immediate: true, deep: false })
  // onProductChange(val, oldVal) {
  //   // this.staffs = JSON.parse(JSON.stringify(val.staff));
  //   console.log('onProductChange', this.staffs);
  // }
  //
  // @Watch('staffs', { immediate: true, deep: true })
  // onStaffsChange(val, oldVal) {
  //   // this.staffs = JSON.parse(JSON.stringify(val.staff));
  //   console.log('onStaffsChange', this.staffs);
  // }

  get localProduct() {
    return this.product;
  }

  get localStaffs() {
    return this.staffs;
  }

  // get staffs() {
  //   const staffs = Object.assign({}, this.product).staff;
  //   return JSON.parse(JSON.stringify(staffs));
  // }

  // set staffs(staffs) {
  //   console.log('set ', staffs);
  // }
  //
  // staffs;
  //
  // created() {
  //   this.staffs = this.product.staff.slice();
  // }

  onClickAddStaff(): void {
    for (let i = 0; i < this.temp.length; i++) {
      this.localStaffs.push(this.temp[i]);
    }
  }

  getProductInfo() {
    return this.localProduct;
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
