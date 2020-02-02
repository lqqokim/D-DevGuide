<template>
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
              :value="localProduct.productName"
              type="text"
              class="inp-base w-100p"
              placeholder="DEWS/UI"
              @input="changeProductName"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">제품코드</th>
          <td>
            <input
              :value="localProduct.productCode"
              type="text"
              class="inp-base w-100p"
              placeholder="UI"
              @input="changeProductCode"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">제품설명</th>
          <td>
            <input
              :value="localProduct.description"
              type="text"
              class="inp-base w-100p"
              placeholder="DEWS Front-end UI Framework"
              @input="changeDescription"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'nuxt-property-decorator';

@Component
export default class ProductInfo extends Vue {
  @Prop() readonly product!: any;
  @Watch('product', { immediate: true, deep: true })
  onProductChange(val, oldVal) {
    console.log('onProductChange', val, oldVal);

    if (oldVal && val.productCode !== oldVal.productCode) {
      this.emitEvent();
    }

    // this.localProduct = Object.assign({}, val);
    this.localProduct = val;
  }

  @Emit('emit-event')
  emitEvent() {
    return true;
  }

  localProduct = {
    productName: '',
    productCode: '',
    description: '',
  };

  // @ts-ignore
  changeProductName(e: InputEvent<HTMLInputElement>) {
    this.localProduct.productName = e.target.value;
  }

  // @ts-ignore
  changeProductCode(e: InputEvent<HTMLInputElement>) {
    this.localProduct.productCode = e.target.value;
  }

  // @ts-ignore
  changeDescription(e: InputEvent<HTMLInputElement>) {
    this.localProduct.description = e.target.value;
  }

  // @ts-ignore
  changeIsUseApiSection(e: InputEvent<HTMLInputElement>) {
    console.log('changeIsUseApiSection ', e.target.value);
  }

  getProduct() {
    return this.localProduct;
  }
}
</script>
