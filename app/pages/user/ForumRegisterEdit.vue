<template>
  <forum-register-edit />
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ForumRegisterEdit from '~/components/forumRegisterEdit/index.vue';

@Component({
  layout: 'default',
  components: {
    ForumRegisterEdit,
  },
  // middleware({ store, redirect, params, route }) {
  //   console.log('middleware :: ', store.state.user.user.loginId);
  //
  //   if (!store.state.user.user.loginId) {
  //     store
  //       .dispatch('common/alert', {
  //         type: 'warning',
  //         isShow: true,
  //         msg: '로그인이 필요한 페이지입니다.',
  //       })
  //       .then((result) => {
  //         console.log('result :: ', result);
  //         if (result.ok) {
  //           // location.href = '/html/Login.html';
  //           redirect('/login');
  //         } else {
  //           console.log('route :: ', route);
  //         }
  //       });
  //   }
  //
  //   // // @ts-ignore
  //   // store.app.router.beforeEach((to, from, next) => {
  //   //   console.log('to ::: ', to);
  //   // });
  // },
  async fetch({ store, params }) {
    try {
      if (!store.state.forum.producs) {
        await store.dispatch('forum/forumProducts');
      }

      if (!params.product) {
        // set selectedProduct by productCode
        await store.dispatch('forum/productByCode', params.productCode);
      }

      // init selectedDoc, selectedTemp
      await store.commit('forum/initState', 'selectedPost');
      // await store.commit('document/initState', 'selectedTemp');

      if (params.editType === 'edit') {
        if (!params.post) {
          await store.dispatch('forum/postDetail', params._id);
        } else {
          await store.commit('forum/selectedPost', params.post);
        }
      }
    } catch (e) {
      console.error(e);
    }
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
