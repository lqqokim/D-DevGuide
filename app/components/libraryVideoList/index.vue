<template>
  <!-- // 좌측메뉴 E -->
  <div class="container-panel">
    <div class="view-top">
      <p class="tit-con-text">
        동영상 <span>{{ $store.state.video.selectedProduct.productName }}</span>
      </p>
      <div v-if="isCheckEmp() || isAdmin()" class="register">
        <button
          type="button"
          class="btn-main blue small"
          @click="
            $router.push({
              name: 'videoRegister',
              params: {
                productCode: $store.state.video.selectedProduct.productCode,
                editType: 'register',
                type: 'single',
              },
            })
          "
        >
          추가
        </button>
        <button
          type="button"
          class="btn-main blue small"
          @click="
            $router.push({
              name: 'videoRegister',
              params: {
                productCode: $store.state.video.selectedProduct.productCode,
                editType: 'register',
                type: 'series',
              },
            })
          "
        >
          시리즈 추가
        </button>
      </div>
    </div>
    <ul class="thumb-list video mgt-20 mgb-60">
      <li v-for="video in localVideosByProduct" :key="video._id">
        <nuxt-link
          :to="{
            name: 'videoDetail',
            params: {
              productCode: video.productCode,
              _id: video.isSeries ? video.series[0]._id : video._id,
              video: video,
            },
          }"
        >
          <div class="thumb">
            <img
              :src="
                `https://img.youtube.com/vi/${
                  video.isSeries ? video.series[0].youtubeId : video.youtubeId
                }/maxresdefault.jpg`
              "
              alt=""
            />
            <!--          <iframe-->
            <!--            width="100%"-->
            <!--            height="100%"-->
            <!--            :src="`https://www.youtube.com/embed/${video.youtubeId}`"-->
            <!--            frameborder="0"-->
            <!--            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"-->
            <!--            allowfullscreen-->
            <!--          ></iframe>-->

            <em v-if="video.playTime" class="btn-time">{{ video.playTime }}</em>
            <div v-if="video.isSeries" class="play">
              <span class="count">{{ video.series.length }}</span>
              <em class="icon-playlist"></em>
            </div>
          </div>
        </nuxt-link>

        <dl class="thumb-desc">
          <!-- TODO 두줄 이상인 경우 말줄임으로 나오게 해주세요 -->
          <nuxt-link
            :to="{
              name: 'videoDetail',
              params: {
                productCode: video.productCode,
                _id: video.isSeries ? video.series[0]._id : video._id,
                video: video,
              },
            }"
            tag="dt"
          >
            <i v-if="isNew(video.uploadDate)" class="icon-new">N</i>
            {{ !video.isSeries ? video.videoTitle : video.seriesTitle }}
          </nuxt-link>
          <dd>
            <!--            <template v-if="isNew(video.updateDate)">-->
            <!--              {{ dayDiff(video.uploadDate) }} 일전-->
            <!--            </template>-->
            <!--            <template v-else>-->
            <!--              {{ dateFormat(video.uploadDate) }}-->
            <!--            </template>-->
            <template>
              {{ convertDateFormat(video.uploadDate) }}
            </template>
            <span class="hit">조회 {{ video.viewCount }}</span>
          </dd>
          <dd v-if="isCheckEmp() || isAdmin()">
            {{ video.empName }} ({{ video.deptPath }})
            <!-- 작성자 / 제품관리자 / 관리자 -->
            <span
              v-if="isCheckWriter(video) || isStaff(video) || isAdmin()"
              class="administer"
              ><nuxt-link
                :to="{
                  name: 'videoEdit',
                  params: {
                    productCode: $route.params.productCode,
                    editType: 'edit',
                    type: video.isSeries ? 'series' : 'single',
                    _id: video._id,
                    video: video,
                  },
                }"
                >수정</nuxt-link
              ><a class="font-accent-color" @click="onclickRemove(video)"
                >삭제</a
              ></span
            >
          </dd>
        </dl>
      </li>
    </ul>
    <div v-if="isViewMore" class="btn-wrap mgb-80">
      <button type="button" class="btn-main small" @click="onclickMoreView">
        더보기
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import { dateFormat } from '~/utils/commonFuncs';
import { IStaff, IVideo, ListParams } from '@/store/modules/video';
import { IUser } from '@/store/modules/user';
import { IAlert } from '@/store/modules/common';

const Video = namespace('video');
const Common = namespace('common');

@Component
export default class LibraryVideoList extends Vue {
  @Video.Action('getVideosByProduct') videosByProductAction!: (payload: {
    data: IVideo;
    params: ListParams;
  }) => void;
  @Video.Action('removeVideo') removeVideoAction!: (
    _id: string
  ) => Promise<any>;
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;

  private readonly LIMIT: number = 5;

  get localVideosByProduct(): IVideo[] {
    return this.videosByProduct;
  }

  videosByProduct: IVideo[] = [];

  isViewMore: boolean = true;
  countMore: number = 1;
  total!: number;

  get user(): IUser {
    return this.$store.state.user.user;
  }

  isCheckEmp(): boolean {
    return this.user.authority === 'E';
  }

  isCheckWriter(video: IVideo): boolean {
    return this.user.loginId === video.empId;
  }

  isAdmin(): boolean {
    return this.user.authority === 'S';
  }

  isStaff(video: IVideo): boolean {
    if (
      this.user.loginId &&
      this.$store.state.download.selectedProduct.staffs !== undefined &&
      (this.user.authority === 'E' || this.user.authority === 'S')
    ) {
      return this.$store.state.download.selectedProduct.staffs.some(
        (staff: IStaff) => {
          return staff.empId === video.empId;
        }
      );
    } else {
      return false;
    }
  }

  created() {
    this.total = this.$store.state.video.totalSize;
    this.videosByProduct = this.$store.state.video.videosByProduct;

    if (this.total <= this.LIMIT) {
      this.isViewMore = false;
    }
  }

  onclickRemove(video: IVideo): void {
    const msg: string = video.isSeries
      ? '시리즈 내 모든 영상이 삭제됩니다. 삭제하시겠습니까?'
      : '동영상을 삭제하시겠습니까?';

    this.alertAction({
      type: 'question',
      isShow: true,
      msg,
    }).then(async (result) => {
      if (result.ok) {
        await this.removeVideoAction(video._id);
        this.initData();
      }
    });
  }

  initData(): void {
    this.videosByProduct = this.$store.state.video.videosByProduct;
    this.countMore = 1;
    this.isViewMore = true;
  }

  async onclickMoreView(): Promise<any> {
    this.countMore++;

    const params: ListParams = {
      skip: this.localVideosByProduct.length,
      limit: 5,
      sort: '-uploadDate',
    };

    await this.videosByProductAction({
      data: this.$store.state.video.selectedProduct,
      params,
    });

    this.videosByProduct = this.localVideosByProduct.concat(
      this.$store.state.video.videosByProduct
    );

    // 마지막 페이지일 경우 더보기 버튼 hide
    if (Math.ceil(this.total / this.LIMIT) === this.countMore) {
      this.isViewMore = false;
    }
  }

  isNew(updateDate: number): boolean {
    const standard = 1000 * 3600 * 24;
    // 7일 이내에 등록했을 경우 New 표시
    return (Date.now() - updateDate) / standard < 7;
  }

  convertDateFormat(time): string {
    return dateFormat(time);
  }
}
</script>

<style scoped></style>
