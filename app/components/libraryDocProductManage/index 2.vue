<template>
  <div>
    <input type="button" value="추가" @click="onClickProductAdd" />
    <input type="button" value="삭제" @click="onClickRemove" />

    <div>
      <h2>제품 정보</h2>

      <div>
        <span>제품명</span>
        <label>
          <input v-model="productName" type="text" />
        </label>
      </div>
      <div>
        <span>제품코드</span>
        <label>
          <input v-model="productCode" type="text" />
        </label>
      </div>
      <div>
        <span>제품설명</span>
        <label>
          <input v-model="description" type="text" />
        </label>
      </div>
    </div>

    <div style="margin-top: 100px;">
      <h2>스태프 목록</h2>
      <input type="button" value="추가" @click="onClickStaffAdd" />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import * as document from '@/store/modules/document';

const Doc = namespace('document');

@Component
export default class LibraryDocProductManage extends Vue {
  @Doc.Action('registerProduct') registerProductAction!: (
    arg0: document.Product
  ) => void;

  productName: string = 'DEWS/FD';
  productCode: string = 'UI';
  description: string = 'DEWS Frond-end Designer';
  staff: document.Staff[] = [];

  onClickProductAdd(): void {
    this.registerProductAction({
      productName: this.productName,
      productCode: this.productCode,
      description: this.description,
      staff: this.staff,
    });
  }

  onClickRemove() {}

  onClickStaffAdd() {}
}
</script>

<style scoped></style>
