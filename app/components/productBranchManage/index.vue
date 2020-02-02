<template>
  <div class="container-panel">
    <branch-manage-product-info></branch-manage-product-info>
    <branch-manage-branch-list></branch-manage-branch-list>
    <branch-manage-merge-request></branch-manage-merge-request>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import BranchManageProductInfo from './BranchManageProductInfo.vue';
import BranchManageBranchList from './BranchManageBranchList.vue';
import BranchManageMergeRequest from './BranchManageMergeRequest.vue';

@Component({
  components: {
    BranchManageProductInfo,
    BranchManageBranchList,
    BranchManageMergeRequest,
  },
})
export default class ProductBranchManage extends Vue {}
</script>

<style scoped></style>
