<template>
  <div class="right-proc-content">
    <h2 class="tit-con-icon-title icon-title dews">제품정보</h2>

    <product-info></product-info>

    <product-staff-list></product-staff-list>

    <div class="btn-wrap-sub">
      <button
        type="button"
        class="dbs-icon-button ico-left small confirm"
        @click="onclickSave"
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
import ProductStaffList from '@/components/libraryHome/manage/ProductStaffList.vue';
import ProductInfo from '@/components/libraryHome/manage/ProductInfo.vue';

import { IVideo } from '@/store/modules/video';

@Component({
  components: {
    ProductStaffList,
    ProductInfo,
  },
})
export default class ProductManageForm extends Vue {
  @Prop() readonly product!: IVideo;

  // localProduct = {
  //   _id:
  //   productName: '',
  //   productCode: '',
  //   description: '',
  // };

  changeProductName(value) {
    console.log('changeProductName ', value);
  }

  changeProductCode(value) {
    console.log('changeProductCode ', value);
  }

  changeDescription(value) {
    console.log('changeDescription ', value);
  }

  onclickSave() {}

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

  // get localProduct() {
  //   console.log('[localProduct]');
  //   return this.product;
  // }

  get localStaffs() {
    return this.staffs;
  }

  onClickAddStaff(): void {
    for (let i = 0; i < this.temp.length; i++) {
      this.localStaffs.push(this.temp[i]);
    }
  }

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

  temp = [
    {
      empName: '노휘겸',
      positionName: '수석 연구원',
      deptPath: '플랫폼개발본부 플랫폼개발1팀',
      empId: 'whistle',
    },
    {
      empName: '안예솔',
      positionName: '연구원',
      deptPath: '플랫폼개발본부 플랫폼개발1팀',
      empId: 'ays',
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
