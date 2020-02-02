<template>
  <div class="container-panel">
    <div class="view-top">
      <p class="tit-con-text">
        {{ $store.state.forum.selectedProduct.productName }}
      </p>
    </div>
    <div class="topic-row">
      <div class="topic-wrap">
        <div class="topic-avatar">
          <div class="avatar-circle qna-circle question">Q</div>
          <div
            v-if="post.isComplete"
            class="avatar-circle result-circle finish"
          >
            완료
          </div>
        </div>
        <div class="topic-body">
          <dl>
            <dt class="topic-title">
              {{ post.title }}
            </dt>
            <dd class="user-info mgt-15 mgb-30">
              <span>{{ convertDateFormat(post.regDate) }}</span
              ><span>{{ post.userName }} ({{ post.userId }})</span
              ><span>조회 {{ post.viewCount }}</span>
              <button
                v-if="isStaff(user.loginId) && !post.isComplete"
                type="button"
                class="dbs-icon-button ico-left small confirm-line"
                style="margin-left: auto;"
                @click="onclickComplete"
              >
                완료처리
              </button>
            </dd>
            <!--            <dd class="qna-desc mgb-20">-->
            <!--              {{ post.contents }}-->
            <!--            </dd>-->
            <TuiEditorViewer :value="post.contents" />
          </dl>
          <!-- TODO data-filetype 확장자 앞에만 말줄임 -->
          <!--          <button type="button" class="btn-attachment single">-->
          <!--            <span class="file-name" data-filetype=".zip"-->
          <!--              ><em>Search Place 연동관련_첨부파일.zip</em></span-->
          <!--            ><span class="capacity">16KB</span>-->
          <!--          </button>-->
          <!--          <button type="button" class="btn-attachment single">-->
          <!--            <span class="file-name" data-filetype=".zip"-->
          <!--              ><em>Search Place 연동관련_첨부파일.zip</em></span-->
          <!--            ><span class="capacity">16KB</span>-->
          <!--          </button>-->
          <!--          <button type="button" class="btn-attachment single">-->
          <!--            <span class="file-name" data-filetype=".zip"-->
          <!--              ><em>Search Place 연동관련_첨부파일.zip</em></span-->
          <!--            ><span class="capacity">16KB</span>-->
          <!--          </button>-->
          <div class="topic-recommended">
            <span class="circle minus" @click="onclickLikeMinus"></span>
            <span class="num"
              ><em> {{ post.like }} </em>추천</span
            >
            <span class="circle plus" @click="onclickLikePlus"></span>
          </div>
          <div
            v-for="(subComment, index) in post.subComments"
            :key="subComment._id + index"
            class="comment-box mgt-20"
          >
            <p class="user-info mgb-5">
              <!--              <span>2시간전</span>-->
              <span>{{ subComment.userName }}({{ subComment.userId }})</span
              ><span>{{ convertDateFormat(subComment.regDate) }}</span>
            </p>
            <div class="comment qna-desc">
              <!--              <div class="comment-desc">-->
              <!--                아.. 오른쪽에 위치한 라벨 영역을 말씀하시는거군요.. 여기에는-->
              <!--                넘버포맷을 지정할 수 없습니다.-->
              <!--              </div>-->
              <TuiEditorViewer :value="subComment.contents" />
              <a
                v-if="isCommenter(subComment)"
                role="button"
                class="comment-delete"
                @click="onclickRemovePostSubComment(subComment)"
                >삭제</a
              >
            </div>
          </div>
          <a
            v-if="!post.isSubCommentEditing"
            role="button"
            class="comment-tool plus"
            @click="onclickAddPostSubComment('edit')"
          >
            댓글추가
          </a>
          <template v-else>
            <p class="comment-tool">댓글 작성</p>
            <TuiEditor ref="postSubCommentRef" mode="wysiwyg" />
            <div class="topic-button-wrap mgb-20">
              <span class="fr">
                <button
                  type="button"
                  class="dbs-icon-button ico-left small confirm"
                  @click="onclickSavePostSubComment"
                >
                  확인
                </button>
                <button
                  type="button"
                  class="dbs-icon-button ico-left small cancel"
                  @click="onclickAddPostSubComment('cancel')"
                >
                  취소
                </button>
              </span>
            </div>
          </template>
          <!--          <div class="comment-box mgt-20">-->
          <!--            <p class="user-info mgb-5">-->
          <!--              <span>2시간전</span><span>김고객(customer01)</span-->
          <!--              ><span>조회 14</span>-->
          <!--            </p>-->
          <!--            <div class="comment qna-desc">-->
          <!--              <div class="comment-desc">-->
          <!--                코드 피커에서 코드와 텍스트를 변경하여 바인딩을 하고 싶습니다.-->
          <!--                다른작성자의 코멘트입니다. 댓글이 긴 경우 두줄로 줄바꿈 합니다.-->
          <!--                삭제버튼 위치는 고정입니다. 코드 피커에서 코드와 텍스트를-->
          <!--                변경하여 바인딩을 하고 싶습니다. 다른작성자의 코멘트입니다.-->
          <!--                댓글이 긴 경우 두줄로 줄바꿈합니다.-->
          <!--              </div>-->
          <!--              <a role="button" class="comment-delete">삭제</a>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
      </div>
      <div class="topic-button-wrap mgb-30">
        <!--        <span v-if="isStaff()" class="fr">-->
        <!--          <button-->
        <!--            v-if="!post.isComplete"-->
        <!--            type="button"-->
        <!--            class="dbs-icon-button ico-left small confirm-line"-->
        <!--            @click="onclickComplete"-->
        <!--          >-->
        <!--            완료처리-->
        <!--          </button>-->
        <!--        </span>-->
        <span v-if="isWriter()" class="fr">
          <button
            v-if="!post.isComplete"
            type="button"
            class="dbs-icon-button ico-left small confirm-line"
            @click="onclickComplete"
          >
            완료처리
          </button>
          <button
            type="button"
            class="dbs-icon-button ico-left small modify"
            @click="onclickEditPost"
          >
            수정</button
          ><button
            type="button"
            class="dbs-icon-button ico-left small delete"
            @click="onclickRemovePost"
          >
            삭제
          </button>
        </span>
      </div>
    </div>
    <div v-if="post.comments.length" class="view-top mgb-20">
      <h1 class="tit-con-small">
        답변 <span class="font-accent-color"> {{ post.comments.length }}</span>
      </h1>
    </div>
    <!--    <div class="topic-row">-->
    <!--      <div class="topic-wrap">-->
    <!--        <div class="topic-avatar">-->
    <!--          <div class="avatar-circle qna-circle answer">A</div>-->
    <!--          <div class="avatar-circle result-circle progress">완료</div>-->
    <!--        </div>-->
    <!--        <div class="topic-body">-->
    <!--          <dl>-->
    <!--            <dd class="user-info mgt-10 mgb-10">-->
    <!--              <i class="badge-staff">STAFF</i><span>UI기술지원팀(dewsui01)</span-->
    <!--              ><span>2019.11.15 15:12</span>-->
    <!--            </dd>-->
    <!--            <dd class="qna-desc mgb-15">-->
    <!--              안녕하세요 DEWS UI 기술지원팀입니다. 주신 코드를 기반으로 제가-->
    <!--              테스트 해보았을때 숫자 셀에 정상적으로 천단위 콤마가 찍혀서-->
    <!--              보입니다. 아래 코드를 참고하세요. 문제가 해결되지 않으면 아래-->
    <!--              코드를 기반으로 html로 간단한 샘플을 보내주시기 바랍니다.-->
    <!--              감사합니다.-->
    <!--            </dd>-->
    <!--          </dl>-->
    <!--          <pre>코드 블럭 영역입니다.</pre>-->
    <!--          <div class="comment-box mgt-20">-->
    <!--            <p class="user-info mgb-5">-->
    <!--              <span>2시간전</span><span>김고객(customer01)</span-->
    <!--              ><span>조회 14</span>-->
    <!--            </p>-->
    <!--            <div class="comment qna-desc">-->
    <!--              <div class="comment-desc">-->
    <!--                코드 피커에서 코드와 텍스트를 변경하여 바인딩을 하고 싶습니다.-->
    <!--                다른작성자의 코멘트입니다.-->
    <!--              </div>-->
    <!--              <a role="button" class="comment-delete">삭제</a>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          <a role="button" class="comment-tool plus">-->
    <!--            댓글추가-->
    <!--          </a>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="topic-button-wrap mgb-30">-->
    <!--        <span class="fr">-->
    <!--          <button type="button" class="dbs-icon-button ico-left small dislike">-->
    <!--            채택취소-->
    <!--          </button>-->
    <!--        </span>-->
    <!--      </div>-->
    <!--    </div>-->
    <div v-for="comment in post.comments" :key="comment._id" class="topic-row">
      <div class="topic-wrap">
        <div class="topic-avatar">
          <div class="avatar-circle qna-circle answer">A</div>
          <div
            v-if="comment.isChoose"
            class="avatar-circle result-circle progress"
          >
            채택
          </div>
        </div>
        <div class="topic-body">
          <dl>
            <dd class="user-info mgt-10 mgb-10">
              <i v-if="isStaff(comment.userId)" class="badge-staff">STAFF</i
              ><span>{{ comment.userName }} ({{ comment.userId }}) </span>
              <!--              <span>2019.11.15 15:12</span>-->
              <span>{{ convertDateFormat(comment.regDate) }}</span>
            </dd>
            <TuiEditorViewer
              v-if="!comment.isEditing"
              :value="comment.contents"
            />
            <!--            <dd-->
            <!--              v-if="!comment.isEditing"-->
            <!--              class="qna-desc mgb-15"-->
            <!--              v-html="mdToHtml(comment.contents)"-->
            <!--            >-->
            <!--              &lt;!&ndash;            <dd class="qna-desc mgb-15" id="content">&ndash;&gt;-->
            <!--              &lt;!&ndash;              {{ mdToHtml(comment._id, comment.contents) }}&ndash;&gt;-->
            <!--            </dd>-->
            <template v-else>
              <TuiEditor
                ref="commentEditorRef"
                mode="wysiwyg"
                :value="comment.contents"
              />
            </template>
          </dl>
          <!--          <div class="comment-box mgt-20">-->
          <!--            <p class="user-info mgb-5">-->
          <!--              &lt;!&ndash;              <span>2시간전</span>&ndash;&gt;-->
          <!--              <span>김고객(customer01)</span><span>2020.01.02 18:55</span>-->
          <!--            </p>-->
          <!--            <div class="comment qna-desc">-->
          <!--              <div class="comment-desc">-->
          <!--                아.. 오른쪽에 위치한 라벨 영역을 말씀하시는거군요.. 여기에는-->
          <!--                넘버포맷을 지정할 수 없습니다.-->
          <!--              </div>-->
          <!--              <a role="button" class="comment-delete">삭제</a>-->
          <!--            </div>-->
          <!--          </div>-->
          <!--          TODO-->
          <!--          <a-->
          <!--            role="button"-->
          <!--            class="comment-tool plus"-->
          <!--            @click="onclickAddSubComment(comment)"-->
          <!--          >-->
          <!--            댓글추가-->
          <!--          </a>-->
          <!--          <template>-->
          <!--            <p class="comment-tool">댓글 작성</p>-->
          <!--            <TuiEditor />-->
          <!--            <div class="topic-button-wrap mgb-20">-->
          <!--              <span class="fr">-->
          <!--                <button-->
          <!--                  type="button"-->
          <!--                  class="dbs-icon-button ico-left small confirm"-->
          <!--                >-->
          <!--                  확인-->
          <!--                </button>-->
          <!--                <button-->
          <!--                  type="button"-->
          <!--                  class="dbs-icon-button ico-left small cancel"-->
          <!--                >-->
          <!--                  취소-->
          <!--                </button>-->
          <!--              </span>-->
          <!--            </div>-->
          <!--          </template>-->
        </div>
      </div>
      <div class="topic-button-wrap mgb-30">
        <div class="fr">
          <template v-if="!comment.isEditing">
            <template v-if="isWriter()">
              <button
                v-if="comment.isChoose"
                type="button"
                class="dbs-icon-button ico-left small dislike"
                @click="onclickChooseCancel(comment)"
              >
                채택취소
              </button>
              <button
                v-else
                type="button"
                class="dbs-icon-button ico-left small like"
                @click="onclickChoose(comment)"
              >
                채택하기
              </button>
            </template>

            <template v-if="isCommenter(comment)">
              <button
                type="button"
                class="dbs-icon-button ico-left small modify"
                @click="onclickEditComment(comment, 'edit')"
              >
                수정</button
              ><button
                type="button"
                class="dbs-icon-button ico-left small delete"
                @click="onclickRemoveComment(comment)"
              >
                삭제
              </button>
            </template>
          </template>
          <template v-else>
            <button
              type="button"
              class="dbs-icon-button ico-left small confirm"
              @click="onclickSaveEditComment(comment)"
            >
              확인</button
            ><button
              type="button"
              class="dbs-icon-button ico-left small cancel"
              @click="onclickEditComment(comment, 'cancel')"
            >
              취소
            </button>
          </template>
        </div>
      </div>
    </div>
    <div class="tit-con-small mgb-10">답변작성</div>
    <TuiEditor ref="tui" mode="wysiwyg" />
    <!--    TODO 답변 파일첨부 구현-->
    <!--    <div class="bg-gray add-file mgt-10">-->
    <!--      <button type="button" class="btn-attachment multi">-->
    <!--        Search Place 연동관련_첨부파일.zip<span class="capacity">16KB</span-->
    <!--        ><span class="closed"></span>-->
    <!--      </button>-->
    <!--      <button type="button" class="btn-attachment multi">-->
    <!--        머지된 컬럼에 대하여 값 edit 시 전체 row에 적용_첨부파일.zip<span-->
    <!--          >5KB</span-->
    <!--        ><span class="closed"></span>-->
    <!--      </button>-->
    <!--      <button type="button" class="btn-attachment multi">-->
    <!--        celDynamicStyles에서 criteria 로 특정 컬럼만 제외_첨부파일.zip<span-->
    <!--          class="capacity"-->
    <!--          >16KB</span-->
    <!--        ><span class="closed"></span>-->
    <!--      </button>-->
    <!--      <button type="button" class="btn-attachment multi">-->
    <!--        첨부파일.zip<span class="capacity">16KB</span-->
    <!--        ><span class="closed"></span>-->
    <!--      </button>-->
    <!--      <button type="button" class="btn-attachment multi">-->
    <!--        celDynamicStyles_첨부파일.zip<span class="capacity">16KB</span-->
    <!--        ><span class="closed"></span>-->
    <!--      </button>-->
    <!--    </div>-->
    <div class="topic-button-wrap mgb-55">
      <!--      <span class="fl">-->
      <!--        <button type="button" class="dbs-icon-button ico-left small upload">-->
      <!--          파일첨부-->
      <!--        </button>-->
      <!--      </span>-->
      <span class="fr">
        <button
          type="button"
          class="dbs-icon-button ico-left small confirm"
          @click="onclickSaveComments"
        >
          확인
        </button>
        <button type="button" class="dbs-icon-button ico-left small cancel">
          취소
        </button>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import marked from 'marked';
import TurndownService from 'turndown';
import { dateFormat } from '~/utils/commonFuncs';

import { IPost, IComment } from '~/store/modules/forum';
import { IUser } from '~/store/modules/user';
import { IAlert, ALERT_TYPE } from '~/store/modules/common';

const Forum = namespace('forum');
const Common = namespace('common');

@Component
export default class ForumProductDetail extends Vue {
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;
  @Forum.Action('updateViewCount') updateViewCountAction!: () => Promise<any>;
  @Forum.Action('updateLikeCount') updateLikeCountAction!: (
    arg0: string
  ) => void;
  @Forum.Action('createComment') createCommentAction!: (
    contents: string
  ) => Promise<any>;
  @Forum.Action('deletePost') deletePostAction!: () => Promise<any>;
  @Forum.Action('updateComment') updateCommentAction!: (payload: {
    comment: IComment;
    chooseType: boolean;
  }) => Promise<any>;
  @Forum.Action('postComplete') postCompleteAction!: (payload) => Promise<any>;
  @Forum.Action('deleteComment') deleteCommentAction!: (
    comment: IComment
  ) => Promise<any>;
  @Forum.Action('createPostSubComment') createPostSubCommentAction!: (
    contents: string
  ) => Promise<any>;
  @Forum.Action('removePostSubDocument') removePostSubDocumentAction!: (
    subComment: IComment
  ) => Promise<any>;
  @Forum.Mutation('commentEditMode') editMode!: ({
    comment: IComment,
    type: string,
  }) => void;
  @Forum.Mutation('postSubCommentEditMode') postSubCommentEdit!: (
    type: string
  ) => void;

  $refs!: {
    tui: any;
    commentRef: any;
    commentEditorRef: any;
    postSubCommentRef: any;
  };

  user!: IUser;

  get post(): IPost {
    return this.$store.state.forum.selectedPost;
  }

  created() {
    this.user = this.$store.state.user.user;

    // this.user = {
    //   loginId: 'kis4204',
    //   loginPw: '',
    //
    //   positionName: '',
    //   deptName: '',
    //   photoUrl: '',
    //   name: '김인수A',
    //   deptPath: '플랫폼개발1팀',
    //   compName: '',
    //
    //   authToken: 'E',
    //   gitlabToken: '',
    //   authority: '',
    //   _id: '',
    // };
    this.updateViewCountAction();
  }

  isWriter(): boolean {
    return this.post.userId === this.user.loginId;
  }

  isCommenter(comment: IComment): boolean {
    return comment.userId === this.user.loginId;
  }

  isStaff(userId): boolean {
    return this.$store.state.forum.selectedProduct.staffs.find(
      (staff) => staff.empId === userId
    );
  }

  // 질문 비추천 버튼 클릭
  async onclickLikeMinus(): Promise<any> {
    if (!this.user.loginId) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '로그인 이후에 이용하실 수 있습니다.',
      }).then((result) => {
        if (result.ok) {
          // next('/login');
          // DBS 고객 로그인 화면으로 이동
          location.href = '/html/Login.html';
        }
      });

      return;
    }

    if (this.post.dislikeUsers.includes(this.user.loginId)) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '비추천을 이미 눌렀습니다.',
      });

      return;
    }

    await this.updateLikeCountAction('minus');
  }

  // 질문 추천 버튼 클릭
  async onclickLikePlus(): Promise<any> {
    if (!this.user.loginId) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '로그인 이후에 이용하실 수 있습니다.',
      }).then((result) => {
        if (result.ok) {
          // next('/login');
          // DBS 고객 로그인 화면으로 이동
          location.href = '/html/Login.html';
        }
      });

      return;
    }

    if (this.post.likeUsers.includes(this.user.loginId)) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '추천을 이미 눌렀습니다.',
      });

      return;
    }

    await this.updateLikeCountAction('plus');
  }

  // 질문 완료 버튼 클릭
  onclickComplete(): void {
    this.post.isComplete = true;
    this.postCompleteAction(this.post);
  }

  // 질문의 서브 댓글 저장 버튼 클릭
  onclickSavePostSubComment(): void {
    const postSubCommentContents: string = this.$refs.postSubCommentRef.invoke(
      'getValue'
    );
    this.createPostSubCommentAction(postSubCommentContents);
  }

  // 질문의 서브 댓글 추가 버튼 클릭
  onclickAddPostSubComment(type: string): void {
    if (!this.user.loginId) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '로그인 이후에 이용하실 수 있습니다.',
      }).then((result) => {
        if (result.ok) {
          // next('/login');
          // DBS 고객 로그인 화면으로 이동
          location.href = '/html/Login.html';
        }
      });

      return;
    }

    this.postSubCommentEdit(type);
  }

  // 잘문의 서브 댓글 삭제 버튼 클릭
  onclickRemovePostSubComment(subComment: IComment): void {
    this.alertAction({
      type: 'question',
      isShow: true,
      msg: '댓글을 삭제하시겠습니까?',
    }).then((result) => {
      if (result.ok) {
        this.removePostSubDocumentAction(subComment);
      }
    });
  }

  // 질문 수정 버튼 클릭
  onclickEditPost(): void {
    this.$router.push({
      name: 'forumEdit',
      params: {
        editType: 'edit',
        productCode: this.$route.params.productCode,
        _id: this.$store.state.forum.selectedPost._id,
        post: this.$store.state.forum.selectedPost,
      },
    });
  }

  // 질문 삭제 버튼 클릭
  onclickRemovePost(): void {
    const msg: string = this.post.comments.length
      ? '질문에 답변이 있습니다. 삭제하시겠습니까?'
      : '질문을 삭제하시겠습니까?';

    this.alertAction({
      type: 'question',
      isShow: true,
      msg,
    }).then(async (result) => {
      if (result.ok) {
        await this.deletePostAction();
        this.redirectForumList();
      }
    });
  }

  // 댓글 채택 버튼 클릭
  onclickChoose(comment: IComment): void {
    if (
      this.post.comments.findIndex((item: IComment) => {
        return item.isChoose;
      }) > -1
    ) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '채택된 답변이 있습니다.',
      });

      return;
    }

    comment.isChoose = true;
    this.updateCommentAction({
      comment,
      chooseType: true,
    });
  }

  // 답변 수정 저장 버튼 클릭
  onclickSaveEditComment(comment: IComment): void {
    comment.contents = this.$refs.commentEditorRef[0].invoke('getValue');
    this.updateCommentAction({
      comment,
      chooseType: false,
    });
  }

  // 답변 채택 취소 버튼 클릭
  onclickChooseCancel(comment: IComment): void {
    comment.isChoose = false;
    this.updateCommentAction({
      comment,
      chooseType: true,
    });
  }

  // 답변 저장 버튼 클릭
  onclickSaveComments(): void {
    if (!this.user.loginId) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '로그인 이후에 이용하실 수 있습니다.',
      }).then((result) => {
        if (result.ok) {
          // next('/login');
          // DBS 고객 로그인 화면으로 이동
          location.href = '/html/Login.html';
        }
      });

      return;
    }

    // const ts = new TurndownService();
    // const contents: string = ts.turndown(this.$refs.tui.invoke('getHtml')); // html to md
    const contents: string = this.$refs.tui.invoke('getValue'); // get tui-editor md
    this.createCommentAction(contents);
  }

  // 댓글의 댓글 추가 버튼 클릭
  onclickAddSubComment(type: string): void {}

  // 댓글 수정 버튼 클릭
  onclickEditComment(comment: IComment, type: string): void {
    this.editMode({
      comment,
      type,
    });
  }

  // 댓글 삭제 버튼 클릭
  onclickRemoveComment(comment: IComment): void {
    const msg: string = comment.isChoose
      ? '채택된 답변입니다. 삭제하시겠습니까?'
      : '답변을 삭제하시겠습니까?';

    this.alertAction({
      type: 'question',
      isShow: true,
      msg,
    }).then(async (result) => {
      if (result.ok) {
        await this.deleteCommentAction(comment);
      }
    });
  }

  redirectForumList(): void {
    this.$router.push({
      name: 'forumList',
      params: {
        productCode: this.$route.params.productCode,
        product: this.$store.state.forum.selectedProduct,
      },
    });
  }

  //
  // convertCommentHtml() {
  //   // @ts-ignore
  //   this.$refs.map((ref, index) => {
  //     if (ref !== 'tui') {
  //       ref.innerHTML = marked(this.post.contents[index]);
  //     }
  //   });
  // }

  mdToHtml(contents): string {
    // console.log('refs :: ', this.$refs);
    // console.log('commentRef :: ', commentRef);
    // this.$refs[commentRef].innerHTML = marked(contents);
    return marked(contents);
  }

  convertDateFormat(time): string {
    return dateFormat(time);
  }
}
</script>

<style scoped></style>
