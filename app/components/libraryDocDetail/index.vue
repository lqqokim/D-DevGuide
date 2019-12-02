<template>
  <div class="dbs-container-wrap">
    <div class="viewer-wrap">
      <div class="dbs-top-image-wrap movie">
        <div class="dbs-top-image">
          <dl>
            <dt>문서</dt>
            <dd>
              문서 서브 텍스트입니다. <br />
              문 서브 텍스트입니다 서브 텍스트입니다.
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="dbs-container">
      <h1 class="tit-con mgt-50">{{ doc.productName }}</h1>
      <div class="player-container">
        <div class="video-player">
          <div id="viewer1"></div>
          <!--          <div class="video-area">-->
          <!--          <embed-->
          <!--            :src="doc.docPath.replace('app/static', '')"-->
          <!--            type="application/pdf"-->
          <!--            width="100%"-->
          <!--            height="100%"-->
          <!--          />-->
          <!--          </div>-->

          <div class="video-clip-info">
            <h3 class="tit-video">
              {{ doc.docTitle }}
            </h3>
            <div class="tit-info">
              <span class="thumb-info"
                ><span class="video-view"
                  ><span class="txt">{{ doc.size }}</span></span
                ><span class="bookmark"
                  ><span class="txt">{{ doc.viewCount }}</span></span
                ></span
              >
              <span class="date">{{ doc.uploadDate }}</span>
            </div>
            <div class="line mgt-20"></div>
            <div class="video-content">
              <div class="video-avatar">
                <img
                  src="http://dbs.douzone.com/images/icon/ico_profile_1.svg"
                />
              </div>
              <div class="video-detail">
                <dl class="tit">
                  <dt>
                    <strong>{{ doc.empName }} | {{ doc.deptPath }}</strong
                    ><span>2019.08.15 15:12</span>
                  </dt>
                  <dd class="desc">
                    {{ doc.description }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="side-button"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import * as PDFObject from 'pdfobject';
import * as document from '@/store/modules/document';

const Doc = namespace('document');

@Component({
  // asyncData({ store }) {
  //   return {
  //     doc: store.state.document.selectedDoc.docPath,
  //   };
  // },
})
export default class LibraryDocDetail extends Vue {
  @Doc.Getter('selectedDoc') doc!: document.Document;

  mounted() {
    console.log(this.doc.docPath.replace('app/static', ''));
    PDFObject.embed(this.doc.docPath.replace('app/static', ''), '#viewer1');
  }
}
</script>

<style>
.pdfobject-container {
  height: 30rem;
  border: 1rem solid rgba(0, 0, 0, 0.1);
}
</style>
