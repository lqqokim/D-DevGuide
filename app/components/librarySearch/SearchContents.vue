<template>
  <div>
    <template v-if="!isSearchData">
      <div class="search-top">
        <em class="font-accent-color">{{ $route.params.searchWord }}</em
        >에 대한 검색 결과가 없습니다
      </div>
      <div class="search no-result mgb-80">검색결과가 없습니다.</div>
    </template>
    <template v-else>
      <div class="tit-con-sub mgb-20">
        자료실에서
        <em class="font-accent-color">{{ $route.params.searchWord }}</em
        >에 대한 검색 결과
      </div>
      <div class="search-top mgb-30">
        동영상<span
          >총<em class="font-accent-color">{{ totalSearchVideoDataLength }}</em
          >건</span
        >
      </div>
      <div
        v-for="data in $store.state.video.searchVideosResult"
        :key="'video_' + data.productName"
      >
        <div class="tit-search-sub">
          {{ data.productName }}
          <span
            ><em class="font-accent-color">{{ data.searchData.length }}</em
            >건</span
          >
        </div>
        <ul class="srch-result-list thumb-list search mgb-30">
          <li
            v-for="video in data.searchData"
            :key="video._id"
            @click="onClickVideo(video)"
          >
            <div class="thumb">
              <img :src="imagePath(video)" alt="" />
              <em class="btn-time">{{ video.playTime }}</em>
              <div v-if="video.isSeries" class="play">
                <span class="count">{{ video.series.length }}</span>
                <em class="icon-playlist"></em>
              </div>
            </div>

            <dl class="thumb-desc">
              <dt class="title-dim">
                <i v-if="isNew(video.updateDate)" class="icon-new">N</i>
                <span v-if="!video.isSeries">{{ video.videoTitle }}</span>
                <span v-else>{{ video.seriesTitle }}</span>
              </dt>
              <dd>
                <template v-if="isNew(video.updateDate)">
                  {{ dayDiff(video.uploadDate) }} 일전
                </template>
                <template v-else>
                  {{ dateFormat(video.uploadDate) }}
                </template>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
      <div class="search-top mgb-30">
        문서<span
          >총<em class="font-accent-color">{{ totalSearchDocDataLength }}</em
          >건</span
        >
      </div>
      <div
        v-for="data in $store.state.document.searchDocsResult"
        :key="'doc_' + data.productName"
      >
        <div class="tit-search-sub">
          {{ data.productName
          }}<span
            ><em class="font-accent-color"> {{ data.searchData.length }}</em
            >건</span
          >
        </div>
        <ul class="srch-result-list thumb-list search mgb-60">
          <li v-for="doc in data.searchData" :key="doc._id">
            <div class="thumb" @click="onClickDoc(doc)">
              <img
                :src="
                  doc.thumbnailPath &&
                    doc.thumbnailPath.replace('app/static', '')
                "
                alt="document"
              />
              <span class="btn-type btn-word" :class="docType(doc)"></span>
            </div>
            <dl class="thumb-desc">
              <dt class="title-dim" @click="onClickDoc(doc)">
                <i v-if="isNew(doc.updateDate)" class="icon-new">N</i>
                <span>{{ doc.docTitle }}</span>
              </dt>

              <dd>
                <template v-if="isNew(doc.updateDate)">
                  {{ dayDiff(doc.uploadDate) }} 일전
                </template>
                <template v-else>
                  {{ dateFormat(doc.uploadDate) }}
                </template>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
      <div class="search-top mgb-30">
        다운로드<span
          >총<em class="font-accent-color">{{
            totalSearchDownloadDataLength
          }}</em
          >건</span
        >
      </div>
      <div
        v-for="data in $store.state.download.searchDownloadsResult"
        :key="'download_' + data.productName"
      >
        <div class="tit-search-sub">
          {{ data.productName
          }}<span
            ><em class="font-accent-color"> {{ data.searchData.length }}</em
            >건</span
          >
        </div>
        <ul class="srch-result-list download mgb-40">
          <li v-for="file in data.searchData" :key="file._id">
            <div class="library-download">
              <dl class="text">
                <a
                  ><dt>
                    <strong v-html="file.fileTitle"></strong>
                  </dt>
                  <dd
                    id="content"
                    ref="contentRef"
                    @click="descriptionToggle"
                    v-html="file.description"
                  ></dd>
                  <span class="more" @click="descriptionToggle">더보기</span>
                </a>
              </dl>
              <p class="download-control">
                <button
                  type="button"
                  class="dbs-icon-button ico-left small download"
                >
                  <a
                    :href="`/downloads/${file.fileName}`"
                    :download="file.originFileName"
                    @click="onclickDownload(file)"
                    >다운로드</a
                  >
                </button>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import { IDocument } from '@/store/modules/document';
import { IFile } from '@/store/modules/download';

const Download = namespace('download');

@Component
export default class SearchContents extends Vue {
  @Download.Action('updateDownloadCount')
  updateDownloadCountAction!: (file: IFile) => Promise<any>;

  isSearchData: boolean = true;
  totalSearchVideoDataLength: number = 0;
  totalSearchDocDataLength: number = 0;
  totalSearchDownloadDataLength: number = 0;
  // selectedIndex: number = -1;

  $refs!: {
    contentRef: any;
  };

  created() {
    if (
      this.$store.state.video.searchVideosResult.length === 0 &&
      this.$store.state.document.searchDocsResult.length === 0 &&
      this.$store.state.download.searchDownloadsResult.length === 0
    ) {
      this.isSearchData = false;
    }
    // 동영상 검색 결과 수
    if (this.$store.state.video.searchVideosResult.length > 0) {
      this.$store.state.video.searchVideosResult.forEach((result) => {
        this.totalSearchVideoDataLength += result.searchData.length;
      });
    }
    // 문서 검색 결과 수
    if (this.$store.state.document.searchDocsResult.length > 0) {
      this.$store.state.document.searchDocsResult.forEach((result) => {
        this.totalSearchDocDataLength += result.searchData.length;
      });
    }
    // 다운로드 검색 결과 수
    if (this.$store.state.download.searchDownloadsResult.length > 0) {
      this.$store.state.download.searchDownloadsResult.forEach((result) => {
        this.totalSearchDownloadDataLength += result.searchData.length;
      });
    }
  }

  imagePath(video): string {
    return `https://img.youtube.com/vi/${
      video.isSeries ? video.series[0].youtubeId : video.youtubeId
    }/${this.$store.state.video.ytbThumbnailQuality}.jpg`;
  }

  isNew(updateDate: number): boolean {
    const standard = 1000 * 3600 * 24;
    // 7일 이내에 등록했을 경우 New 표시
    return (Date.now() - updateDate) / standard < 7;
  }

  dayDiff(updateDate: number): number {
    const standard = 1000 * 3600 * 24;
    return Math.floor((Date.now() - updateDate) / standard);
  }

  dateFormat(date): string {
    const d: Date = new Date(date);
    let month: string = '' + (d.getMonth() + 1);
    let day: string = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  docType(doc: IDocument): string[] {
    return [`btn-${doc.fileExt}`];
  }

  onClickDoc(docData) {
    docData.docTitle = docData.docTitle.split('<em>').join('');
    docData.docTitle = docData.docTitle.split('</em>').join('');

    this.$router.push({
      name: 'docDetail',
      params: {
        productCode: docData.productCode,
        _id: docData._id,
        doc: docData,
      },
    });
  }

  onClickVideo(videoData) {
    if (videoData.isSeries) {
      videoData.seriesTitle = videoData.seriesTitle.split('<em>').join('');
      videoData.seriesTitle = videoData.seriesTitle.split('</em>').join('');
    } else {
      videoData.videoTitle = videoData.videoTitle.split('<em>').join('');
      videoData.videoTitle = videoData.videoTitle.split('</em>').join('');
    }

    this.$router.push({
      name: 'videoDetail',
      params: {
        productCode: videoData.productCode,
        _id: videoData.isSeries ? videoData.series[0]._id : videoData._id,
        video: videoData,
      },
    });
  }

  // onclickFold(selectedIndex: number, e): void {
  //   console.log('event obj');
  //   console.log(e);
  //   this.selectedIndex = -1;
  //   this.$refs.contentRef[selectedIndex].style.display = 'block';
  // }
  //
  // onclickMore(selectedIndex: number): void {
  //   this.selectedIndex = selectedIndex;
  //   const contentRefs = this.$refs.contentRef;
  //   const selectedContentRef = contentRefs[selectedIndex];
  //   selectedContentRef.style.display = 'contents';
  //
  //   for (let i = 0; i < contentRefs.length; i++) {
  //     if (i !== selectedIndex) {
  //       contentRefs[i].style.display = 'block';
  //     }
  //   }
  // }

  onclickDownload(file: IFile): void {
    this.updateDownloadCountAction(file);
  }

  descriptionToggle(e): void {
    let ddTag!: HTMLElement;
    let spanTag!: HTMLElement;
    if (e.target.tagName === 'SPAN') {
      spanTag = e.target;
      ddTag = e.target.previousElementSibling;
    } else {
      ddTag = e.target;
      spanTag = e.target.nextElementSibling;
    }

    if (ddTag.style.display === 'contents') {
      ddTag.style.display = 'block';
      spanTag.textContent = '더보기';
    } else {
      ddTag.style.display = 'contents';
      spanTag.textContent = '접기';
    }
  }
}
</script>

<style scoped>
#content {
  height: 2em;
  overflow: hidden;
}
</style>
