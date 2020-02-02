<template>
  <!--<div class="dbs-container">-->
  <!--&lt;!&ndash; search &ndash;&gt;-->
  <!--<div class="srch-wrap-bar mgt-60 mgb-60">-->
  <!--<div class="srch-wrap">-->
  <!--<input type="search" class="m-srch-bar" placeholder="검색어" />-->
  <!--<button type="button" class="btn-search">search</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="ui-tab mgb-60">-->
  <!--<div class="ui-tab-btns tab-3" role="tablist">-->
  <!--<a href="#" class="ui-tab-btn" data-tab="1"><i>개발자 문서</i></a>-->
  <!--<a href="#" class="ui-tab-btn" data-tab="2"><i>질문/답변</i></a>-->
  <!--<a href="#" class="ui-tab-btn active" data-tab="3"><i>자료실</i></a>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="tit-con-sub mgb-20">-->
  <!--자료실에서<em class="font-accent-color">검색어</em>에 대한 검색 결과 (총-->
  <!--10건)-->
  <!--</div>-->
  <!--<div class="search-top mgb-30">-->
  <!--동영상<span>총<em clas="font-accent-color">7</em>건</span>-->
  <!--</div>-->
  <!--<div class="tit-search-sub">-->
  <!--DEWS/UI<span><em class="font-accent-color">6</em>건</span>-->
  <!--</div>-->
  <!--<ul class="srch-result-list thumb-list search mgb-30">-->
  <!--<li>-->
  <!--<div class="thumb">-->
  <!--<img src="../../assets/images/mov_01.jpg" alt="" />-->
  <!--<em class="btn-time">10:23</em>-->
  <!--<div class="play">-->
  <!--<span class="count">12</span>-->
  <!--<em class="icon-playlist"></em>-->
  <!--</div>-->
  <!--</div>-->
  <!--<dl class="thumb-desc">-->
  <!--&lt;!&ndash; TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 &ndash;&gt;-->
  <!--<dt>-->
  <!--<i class="icon-new">N</i>2019-11-23 DEWS/UI 세미나 영상 제목이 긴-->
  <!--경우-->
  <!--</dt>-->
  <!--<dd>3일전<span class="hit">조회 300</span></dd>-->
  <!--</dl>-->
  <!--</li>-->
  <!--<li>-->
  <!--<div class="thumb">-->
  <!--<img src="../../assets/images/mov_02.jpg" alt="" />-->
  <!--</div>-->
  <!--<dl class="thumb-desc">-->
  <!--<dt>DEWS/UI 기초 교육 시리즈</dt>-->
  <!--<dd>2019-09-24<span class="hit">조회 1039</span></dd>-->
  <!--</dl>-->
  <!--</li>-->
  <!--<li>-->
  <!--<div class="thumb">-->
  <!--<img src="../../assets/images/mov_03.jpg" alt="" />-->
  <!--<em class="btn-time">1:30:41</em>-->
  <!--</div>-->
  <!--<dl class="thumb-desc">-->
  <!--<dt>DEWS 플랫폼 CM - UI편</dt>-->
  <!--<dd>2019-09-24<span class="hit">조회 1039</span></dd>-->
  <!--</dl>-->
  <!--</li>-->
  <!--<li>-->
  <!--<div class="thumb">-->
  <!--<img src="../../assets/images/mov_04.jpg" alt="" />-->
  <!--<em class="btn-time">10:23</em>-->
  <!--</div>-->
  <!--<dl class="thumb-desc">-->
  <!--<dt>2019 DEWS/UI 세미나 자료</dt>-->
  <!--<dd>2019-09-24<span class="hit">조회 1039</span></dd>-->
  <!--</dl>-->
  <!--</li>-->
  <!--<li>-->
  <!--<div class="thumb">-->
  <!--<img src="../../assets/images/mov_05.jpg" alt="" />-->
  <!--<em class="btn-time">1:30:41</em>-->
  <!--</div>-->
  <!--<dl class="thumb-desc">-->
  <!--<dt>DEWS/UI 고급자 교육 시리즈</dt>-->
  <!--<dd>2019-09-24<span class="hit">조회 300</span></dd>-->
  <!--</dl>-->
  <!--</li>-->
  <!--<li>-->
  <!--<div class="thumb">-->
  <!--<img src="../../assets/images/mov_03.jpg" alt="" />-->
  <!--<em class="btn-time">10:23</em>-->
  <!--</div>-->
  <!--<dl class="thumb-desc">-->
  <!--<dt>DEWS 플랫폼 CM - UI편</dt>-->
  <!--<dd>2019-09-24<span class="hit">조회 300</span></dd>-->
  <!--</dl>-->
  <!--</li>-->
  <!--</ul>-->
  <!--<div class="tit-search-sub">-->
  <!--DEWS/FD<span><em class="font-accent-color">1</em>건</span>-->
  <!--</div>-->
  <!--<ul class="srch-result-list thumb-list search mgb-60">-->
  <!--<li>-->
  <!--<div class="thumb">-->
  <!--<img src="../../assets/images/mov_01.jpg" alt="" />-->
  <!--<em class="btn-time">10:23</em>-->
  <!--</div>-->
  <!--<dl class="thumb-desc">-->
  <!--&lt;!&ndash; TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 &ndash;&gt;-->
  <!--<dt>-->
  <!--<i class="icon-new">N</i>2019-11-23 DEWS/UI 세미나 영상 제목이 긴-->
  <!--경우-->
  <!--</dt>-->
  <!--<dd>3일전<span class="hit">조회 300</span></dd>-->
  <!--</dl>-->
  <!--</li>-->
  <!--</ul>-->
  <!--<div class="search-top mgb-30">-->
  <!--문서<span>총<em cls="font-accent-color">7</em>건</span>-->
  <!--</div>-->
  <!--<div class="tit-search-sub">-->
  <!--DEWS/FD<span><em class="font-accent-color">6</em>건</span>-->
  <!--</div>-->
  <!--<ul class="srch-result-list thumb-list search mgb-60">-->
  <!--<li>-->
  <!--<div class="thumb">-->
  <!--<img src="../../assets/images/mov_05.jpg" alt="" />-->
  <!--<span class="btn-type btn-word">워드</span>-->
  <!--</div>-->
  <!--<dl class="thumb-desc">-->
  <!--&lt;!&ndash; TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 &ndash;&gt;-->
  <!--<dt>-->
  <!--<i class="icon-new">N</i>2019-11-23 DEWS/UI 세미나 발표 자료 제목이-->
  <!--긴 경우-->
  <!--</dt>-->
  <!--<dd>2019-09-24<span class="hit">조회 1039</span></dd>-->
  <!--</dl>-->
  <!--</li>-->
  <!--<li>-->
  <!--<div class="thumb">-->
  <!--<img src="../../assets/images/mov_05.jpg" alt="" />-->
  <!--<span class="btn-type btn-hwp">한글</span>-->
  <!--</div>-->
  <!--<dl class="thumb-desc">-->
  <!--<dt>2019-11-23 DEWS/UI 세미나 발표 자료 제목이 긴 경우</dt>-->
  <!--<dd>2019-09-24<span class="hit">조회 1039</span></dd>-->
  <!--</dl>-->
  <!--</li>-->
  <!--<li>-->
  <!--<div class="thumb">-->
  <!--<img src="../../assets/images/mov_05.jpg" alt="" />-->
  <!--<span class="btn-type btn-pdf">PDF</span>-->
  <!--</div>-->
  <!--<dl class="thumb-desc">-->
  <!--<dt>DEWS/FD Git 사용 매뉴얼</dt>-->
  <!--<dd>2019-09-24<span class="hit">조회 1039</span></dd>-->
  <!--</dl>-->
  <!--</li>-->
  <!--<li>-->
  <!--<div class="thumb">-->
  <!--<img src="../../assets/images/mov_05.jpg" alt="" />-->
  <!--<span class="btn-type btn-pdf">PDF</span>-->
  <!--</div>-->
  <!--<dl class="thumb-desc">-->
  <!--<dt>기초 데이터 설정 예시</dt>-->
  <!--<dd>2019-09-24<span class="hit">조회 1039</span></dd>-->
  <!--</dl>-->
  <!--</li>-->
  <!--<li>-->
  <!--<div class="thumb">-->
  <!--<img src="../../assets/images/mov_05.jpg" alt="" />-->
  <!--<span class="btn-type btn-ppt">PPT</span>-->
  <!--</div>-->
  <!--<dl class="thumb-desc">-->
  <!--<dt>-->
  <!--<i class="icon-new">N</i>2019-11-23 DEWS/UI 세미나 발표 자료 제목이-->
  <!--긴 경우-->
  <!--</dt>-->
  <!--<dd>2019-09-24<span class="hit">조회 1039</span></dd>-->
  <!--</dl>-->
  <!--</li>-->
  <!--<li>-->
  <!--<div class="thumb">-->
  <!--<img src="../../assets/images/mov_05.jpg" alt="" />-->
  <!--<span class="btn-type btn-excel">엑셀</span>-->
  <!--</div>-->
  <!--<dl class="thumb-desc">-->
  <!--<dt>DEWS Front Designer 초기 설정</dt>-->
  <!--<dd>2019-09-24<span class="hit">조회 1039</span></dd>-->
  <!--</dl>-->
  <!--</li>-->
  <!--</ul>-->
  <!--<div class="search-top mgb-30">-->
  <!--다운로드<span>총<em clas="font-accent-color">2</em>건</span>-->
  <!--</div>-->
  <!--<div class="tit-search-sub">-->
  <!--DEWS/UI<span><em class="font-accent-color">3</em>건</span>-->
  <!--</div>-->
  <!--<ul class="srch-result-list download mgb-40">-->
  <!--<li>-->
  <!--<div class="library-download">-->
  <!--<dl class="text">-->
  <!--<a href="#11"-->
  <!--&gt;<dt>-->
  <!--<strong-->
  <!--&gt;DEWS Back-end Framework v1.0 (Compressed) DEWS Back-end-->
  <!--Framework v1.0 (Compressed) 제목이 긴 경우 입니다 제목이 긴-->
  <!--경우 입니다.</strong-->
  <!--&gt;-->
  <!--</dt>-->
  <!--<dd>-->
  <!--DEWS/J Back-end Framework v1.0의 전체 바이너리 파일 입니다-->
  <!--내용이 길어진 경우 내용이 내용이 길어졌을 경우 입니다.<span-->
  <!--class="more"-->
  <!--&gt;더보기</span-->
  <!--&gt;-->
  <!--</dd>-->
  <!--</a>-->
  <!--</dl>-->
  <!--<p class="download-control">-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small download"-->
  <!--&gt;-->
  <!--다운로드-->
  <!--</button>-->
  <!--</p>-->
  <!--</div>-->
  <!--</li>-->
  <!--<li>-->
  <!--<div class="library-download">-->
  <!--<dl class="text">-->
  <!--<a href="#11"-->
  <!--&gt;<dt>-->
  <!--<strong-->
  <!--&gt;DEWS Back-end Framework v1.0 (Compressed) DEWS Back-end-->
  <!--Framework v1.0 (Compressed) 제목이 긴 경우 입니다 제목이 긴-->
  <!--경우 입니다.</strong-->
  <!--&gt;-->
  <!--</dt>-->
  <!--<dd>-->
  <!--DEWS/J Back-end Framework v1.0의 전체 바이너리 파일 입니다.-->
  <!--원하는 경로에 압축을 해제하고, 설정파일을 열어주세요. DEWS/J-->
  <!--Back-end Framework v1.0의 전체 바이너리 파일 입니다. 설정파일을-->
  <!--열어주세요. DEWS/J Back-end Framework v1.0의 전체 바이너리 파일-->
  <!--입니다. DEWS/J Back-end Framew ork v1.0의 전체 바이너리 파일-->
  <!--입니다 전체 바이너리 파일 파일입니다. 원하는 경로에 압축을-->
  <!--해제하고 설정파일을 열어주세요.설정파일을 열어주세요 주세요요요.-->
  <!--더보기를 클릭하면 모든 내용을 전부 보여 줍니다, 접기를 클릭하면-->
  <!--내용이 한줄로 접힙니다.<span class="more">접기</span>-->
  <!--</dd>-->
  <!--</a>-->
  <!--</dl>-->
  <!--<p class="download-control">-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small download"-->
  <!--&gt;-->
  <!--다운로드-->
  <!--</button>-->
  <!--</p>-->
  <!--</div>-->
  <!--</li>-->
  <!--<li>-->
  <!--<div class="library-download">-->
  <!--<dl class="text">-->
  <!--<a href="#11"-->
  <!--&gt;<dt>-->
  <!--<strong-->
  <!--&gt;DEWS Back-end Framework v1.0 (Compressed) DEWS Back-end-->
  <!--Framework v1.0v1.0v1.0 (Compressed)</strong-->
  <!--&gt;-->
  <!--</dt>-->
  <!--<dd>-->
  <!--DEWS/J Back-end Framework v1.0의 전체 바이너리 파일 입니다-->
  <!--바이너리 파일 입니다 전체 바이너리 파일 입니다.<span-->
  <!--class="more"-->
  <!--&gt;더보기</span-->
  <!--&gt;-->
  <!--</dd>-->
  <!--</a>-->
  <!--</dl>-->
  <!--<p class="download-control">-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small download"-->
  <!--&gt;-->
  <!--다운로드-->
  <!--</button>-->
  <!--</p>-->
  <!--</div>-->
  <!--</li>-->
  <!--</ul>-->
  <!--<div class="tit-search-sub">-->
  <!--DEWS/FD<span><em class="font-accent-color">1</em>건</span>-->
  <!--</div>-->
  <!--<ul class="srch-result-list download mgb-80">-->
  <!--<li>-->
  <!--<div class="library-download">-->
  <!--<dl class="text">-->
  <!--<a href="#11"-->
  <!--&gt;<dt>-->
  <!--<strong-->
  <!--&gt;DEWS Back-end Framework v1.0 (Compressed) DEWS Back-end-->
  <!--Framework v1.0 (Compressed) 제목이 긴 경우 입니다 제목이 긴-->
  <!--경우 입니다.</strong-->
  <!--&gt;-->
  <!--</dt>-->
  <!--<dd>-->
  <!--DEWS/J Back-end Framework v1.0의 전체 바이너리 파일 입니다-->
  <!--내용이 길어진 경우 내용이 내용이 길어졌을 경우 입니다.<span-->
  <!--class="more"-->
  <!--&gt;더보기</span-->
  <!--&gt;-->
  <!--</dd>-->
  <!--</a>-->
  <!--</dl>-->
  <!--<p class="download-control">-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small download"-->
  <!--&gt;-->
  <!--다운로드-->
  <!--</button>-->
  <!--</p>-->
  <!--</div>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</div>-->
  <library-search></library-search>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LibrarySearch from '@/components/librarySearch/index.vue';

@Component({
  layout: 'default',
  components: {
    LibrarySearch,
  },
  async fetch({ store, params }): Promise<any> {
    try {
      // 자료실 > 동영상
      await store.dispatch('video/searchVideos', {
        searchWord: params.searchWord,
      });
      // 자료실 > 다운로드
      await store.dispatch('download/searchDownloads', {
        searchWord: params.searchWord,
      });
      // 자료실 > 문서
      await store.dispatch('document/searchDocs', {
        searchWord: params.searchWord,
      });
    } catch (err) {
      console.error(err);
    }
  },
})
export default class extends Vue {}
</script>

<style scoped></style>
