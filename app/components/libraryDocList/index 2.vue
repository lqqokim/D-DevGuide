<template>
  <div class="dbs-container">
    <h1 class="tit-con mgt-50">
      문서 {{ $store.state.document.selectedProduct.productName }}
    </h1>
    <div class="position-wrap">
      <input type="button" value="+추가" @click="onClickDocAdd" />
    </div>
    <ul class="thumb-list mgt-10">
      <li v-for="doc in $store.state.document.docsByProduct" :key="doc._id">
        <nuxt-link
          :to="{
            name: 'videoDetail',
            params: {
              productName: doc.productName,
              projectId: doc.projectId,
              _id: doc._id,
            },
          }"
        >
          <div class="thumb">
            <img
              :src="doc.thumbnailPath.replace('app/static', '')"
              alt="document"
            />
          </div>
        </nuxt-link>
        <dl class="thumb-desc">
          <nuxt-link
            :to="{
              name: 'videoDetail',
              params: {
                productName: doc.productName,
                _id: doc._id,
              },
            }"
            tag="dt"
            >{{ doc.docTitle }}</nuxt-link
          >
          <dd>
            문서형태
            <span class="name">{{ doc.docName.split('.')[1] }}</span>
          </dd>
          <dd>
            {{ formatDate(doc.uploadDate) }}
            <span class="name">조회: {{ doc.viewCount }}</span>
          </dd>
          <dd>
            {{ doc.empName }}
            <span class="name">{{ doc.depthPath }}</span>
          </dd>
          <dd>
            <nuxt-link
              :to="{
                name: 'docEdit',
                params: {
                  doc: doc,
                  docName: doc.docName,
                  productName: doc.productName,
                },
              }"
              style="display: inline-block;"
              >수정</nuxt-link
            >
            <span class="name"
              ><a
                style="display: inline-block; color: red;"
                @click="onRemove(doc)"
                >삭제</a
              ></span
            >
          </dd>
        </dl>
        <!--        <div>-->
        <!--          <nuxt-link-->
        <!--            :to="{-->
        <!--              name: 'docEdit',-->
        <!--              params: {-->
        <!--                video: doc,-->
        <!--                _id: doc._id,-->
        <!--              },-->
        <!--            }"-->
        <!--            @click.native="onClickEdit(doc)"-->
        <!--            >수정</nuxt-link-->
        <!--          >-->
        <!--          <a @click="onRemove(doc)">삭제</a>-->
        <!--        </div>-->
      </li>
    </ul>
    <!--    <input type="button" value="더보기" style="width: 100%;"/>-->
    <div class="line"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import * as document from '@/store/modules/document';

const Doc = namespace('document');

@Component({
  components: {},
})
export default class LibraryDocList extends Vue {
  @Doc.Action('removeDoc') removeDocAction!: (string) => void;

  onRemove(doc: document.Document): void {
    this.removeDocAction(doc._id);
    alert(`${doc._id} 삭제완료`);
  }

  formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  onClickDocAdd(): void {
    this.$router.push({
      name: 'docRegister',
      params: {
        productName: this.$store.state.document.selectedProduct.productName,
      },
    });
  }
}
</script>

<style scoped></style>
