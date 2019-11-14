<template>
  <div>
    <div>직원 전용 마이페이지</div>
    <div>
      <span>사용자 깃랩 토큰</span>
      <input v-model="gitlabToken" type="text" :disabled="!isEdit" />
      <input
        v-if="!isEdit"
        type="button"
        value="토큰 등록"
        @click="isEdit = !isEdit"
      />
      <input v-if="isEdit" type="button" value="확인" @click="register" />
      <input
        v-if="isEdit"
        type="button"
        value="취소"
        @click="isEdit = !isEdit"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';

const User = namespace('user');

@Component({
  components: {},
})
export default class UserInfo extends Vue {
  @User.Action('registerGitLabToken') gitlabTokenAction!: () => void;
  @User.Getter('getGtiLabToken') gitlabTokenGetter!: string;
  @User.Mutation('setGitLabToken') gitlabTokenMutation!: (string) => void;

  isEdit: boolean = false;

  get gitlabToken(): string {
    return this.gitlabTokenGetter;
  }

  set gitlabToken(value) {
    this.gitlabTokenMutation(value);
  }

  register(): void {
    this.gitlabTokenAction();
    this.isEdit = !this.isEdit;
  }
}
</script>

<style scoped></style>
