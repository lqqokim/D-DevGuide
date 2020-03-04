<template>
  <div class="view-page-side">
    <div class="view-page-side-content">
      <h1 class="tit-con-view">목차</h1>
      <div class="view-page-side-section">
        <ul>
          <li
            v-for="(toc, index) in $store.state.repository.tocArray"
            :key="index"
            :class="{ selected: index === selectedTagIndex }"
          >
            <a
              v-if="toc.type === 'h1'"
              @click="scrollToHTag('h1', toc.content, index)"
              >{{ toc.content }}</a
            >
            <ul v-else class="bul-round">
              <li>
                <a @click="scrollToHTag('h2', toc.content, index)">{{
                  toc.content
                }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class ProductRepositoryFileTOC extends Vue {
  selectedTagIndex: number = -1;

  scrollToHTag(tagName, content, index) {
    const scrollWidth = window.scrollX || document.documentElement.scrollWidth;
    const tags: NodeList = this.$el.parentNode!.querySelectorAll(
      '.tui-editor-contents > h1, h2'
    );
    const tagArray = Array.prototype.slice.call(tags);

    window.scrollTo(scrollWidth, tagArray[index].offsetTop + 310);
    document.documentElement.scrollTo(
      scrollWidth,
      tagArray[index].offsetTop + 310
    );
    this.selectedTagIndex = index;
  }
}
</script>

<style scoped></style>
