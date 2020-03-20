<template>
  <div class="container-panel">
    <div class="view-top mgb-15">
      <h1 class="tit-con-text">동영상<span>홈 화면 관리</span></h1>
    </div>
    <div
      v-for="(product, productIdx) in $store.state.video.products"
      :key="product._id"
    >
      <div class="video-top">
        <p class="tit-con-sub">{{ product.productName }}</p>
        <div class="pst-button">
          <!--<button-->
          <!--type="button"-->
          <!--class="dbs-icon-button ico-left small horizontal"-->
          <!--&gt;-->
          <!--이동-->
          <!--</button>-->
          <button
            type="button"
            class="dbs-icon-button ico-left small plus"
            @click="onClickAddButton(product)"
          >
            추가
          </button>
        </div>
      </div>
      <ul class="thumb-list x-small moving mgt-20 mgb-60">
        <draggable
          v-model="localManagedVideos[productIdx]"
          group="productCode"
          handle=".dbs-icon-move"
          animation="300"
          style="display: flex;"
          @change="draggableChange(product._id, productIdx)"
        >
          <li
            v-for="(managedVideo, index) in localManagedVideos[productIdx]"
            :key="managedVideo._id"
            :class="{ 'mgl-0': index === 0 }"
          >
            <div class="thumb" style="cursor: auto;">
              <button
                type="button"
                class="dbs-icon-move horizontal"
                style="cursor: move;"
              >
                좌우 이동
              </button>
              <img :src="imagePath(managedVideo)" alt="" />
              <em v-if="managedVideo.playTime" class="btn-time">{{
                managedVideo.playTime
              }}</em>
              <div v-if="managedVideo.isSeries" class="play">
                <span class="count">{{ managedVideo.series.length }}</span>
                <em class="icon-playlist" />
              </div>
            </div>
            <dl class="thumb-desc">
              <dt class="title-dim">
                {{
                  !managedVideo.isSeries
                    ? managedVideo.videoTitle
                    : managedVideo.seriesTitle
                }}
              </dt>
              <dd>
                {{ convertDateFormat(managedVideo.uploadDate)
                }}<span class="administer"
                  ><a
                    class="font-accent-color"
                    @click="removeManagedVideos(product, managedVideo)"
                    >삭제</a
                  ></span
                >
              </dd>
            </dl>
          </li>
        </draggable>
      </ul>
    </div>
    <modal-component
      :modal-title="videoManageModalTitle"
      :modal-name="videoManageModalName"
      :modal-height="videoManageModalHeight"
      :modal-width="videoManageModalWidth"
      @emit-confirm="videoManageModalConfirm"
    >
      <video-manage-modal
        slot="modalContent"
        ref="videoManageModal"
      ></video-manage-modal>
    </modal-component>
  </div>
</template>
<script lang="ts">
import draggable from 'vuedraggable';
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import { dateFormat } from '~/utils/commonFuncs';
import ModalComponent from '@/components/common/modal/modalComponent.vue';
import VideoManageModal from '@/components/libraryVideoHomeManage/VideoManageModal.vue';
import { IAlert } from '@/store/modules/common';
import { IProduct, IVideo } from '~/store/modules/video';

const Video = namespace('video');
const Common = namespace('common');

@Component({
  components: {
    draggable,
    ModalComponent,
    VideoManageModal,
  },
})
export default class LibraryVideoHomeManage extends Vue {
  localManagedVideos: any[] = [];
  @Video.Action('getVideosByProduct') getVideosByProductAction!: (payload: {
    data: IProduct;
    params: {
      limit: number;
      skip: number;
      sort: string;
    };
  }) => Promise<any>;
  @Video.Action('updateManagedVideos') updateManagedVideosAction!: (payload: {
    productId: string;
    managedVideos: IVideo[];
  }) => Promise<any>;
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;

  $refs!: {
    videoManageModal: any;
  };

  $modal!: any;

  videoManageModalTitle: string = '동영상 선택';
  videoManageModalName: string = 'videoManageModal';
  videoManageModalHeight: string = '668px';
  videoManageModalWidth: string = '826px';

  created() {
    this.$store.state.video.products.forEach((product) => {
      this.localManagedVideos.push(product.managedVideos);
    });
  }

  imagePath(video): string {
    return `https://img.youtube.com/vi/${
      video.isSeries ? video.series[0].youtubeId : video.youtubeId
    }/${this.$store.state.video.ytbThumbnailQuality}.jpg`;
  }

  videoManageModalConfirm(clickConfirmBtn) {
    if (clickConfirmBtn) {
      const selectedVideos = this.$refs.videoManageModal.getData();

      this.updateManagedVideosAction({
        productId: this.$store.state.video.selectedProduct._id,
        managedVideos: selectedVideos,
      }).then(() => {
        this.localManagedVideos = [];
        this.$store.state.video.products.forEach((product) => {
          this.localManagedVideos.push(product.managedVideos);
        });
      });
      this.$modal.hide(this.videoManageModalName);
    } else {
      this.$modal.hide(this.videoManageModalName);
    }
  }

  async onClickAddButton(product) {
    await this.getVideosByProductAction({
      data: product,
      params: {
        limit: 8,
        skip: 0,
        sort: '-uploadDate',
      },
    });

    this.$modal.show(this.videoManageModalName);
  }

  convertDateFormat(time): string {
    return dateFormat(time);
  }

  removeManagedVideos(product, videoData) {
    this.alertAction({
      type: 'question',
      isShow: true,
      msg: '선택하신 동영상을 홈 화면 관리에서 삭제하시겠습니까?',
    }).then((result) => {
      if (result.ok) {
        const newData = product.managedVideos.filter((video) => {
          return video._id !== videoData._id;
        });
        this.updateManagedVideosAction({
          productId: product._id,
          managedVideos: newData,
        }).then(() => {
          this.localManagedVideos = [];
          this.$store.state.video.products.forEach((product) => {
            this.localManagedVideos.push(product.managedVideos);
          });
        });
      }
    });
  }

  draggableChange(id, productIdx) {
    this.updateManagedVideosAction({
      productId: id,
      managedVideos: this.localManagedVideos[productIdx],
    });
  }
}
</script>

<style scoped></style>
