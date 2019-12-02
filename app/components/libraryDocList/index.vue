<template>
  <div class="container-panel">
    <div class="view-top">
      <p class="tit-con-qna">문서 {{ $route.params.productName }}</p>
      <div class="register">
        <button
          type="button"
          class="btn-main blue small"
          @click="onClickDocAdd"
        >
          추가
        </button>
      </div>
    </div>

    <ul class="thumb-list video mgt-20 mgb-60">
      <li v-for="doc in $store.state.document.docsByProduct" :key="doc._id">
        <nuxt-link
          :to="{
            name: 'docDetail',
            params: {
              productName: doc.productName,
              docName: doc.docName,
              _id: doc._id,
            },
          }"
        >
          <div class="thumb">
            <img
              :src="
                doc.thumbnailPath && doc.thumbnailPath.replace('app/static', '')
              "
              alt="document"
            />
          </div>
        </nuxt-link>
        <dl class="thumb-desc">
          <nuxt-link
            :to="{
              name: 'docDetail',
              params: {
                productName: doc.productName,
                docName: doc.docName,
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
            <span class="name">{{ doc.deptPath }}</span>
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
    <div class="btn-wrap mgb-80">
      <button type="button" class="btn-main small">더보기</button>
    </div>
  </div>
  <!-- 컨텐츠 영역 end-->
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
