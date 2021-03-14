<template>
  <fieldset>
    <legend>请求掘金（master）</legend>
    <div>{{master}}</div>
  </fieldset>
  <fieldset>
    <legend>请求思否（sifou）</legend>
    <div>{{sifou}}</div>
  </fieldset>
  <fieldset>
    <legend>请求简书（jianshu）</legend>
    <div>{{jianshu}}</div>
  </fieldset>
</template>


<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';

import useGlobal from '@/hooks/useGlobal';

export default defineComponent({
  name: 'Home',

  // created(){
  //   this.$request.get();
  //   this.$request.get.sifou();
  //   this.$request.get.jianshu();
  // },

  setup(props, ctx) {
    const { $request } = useGlobal();
    const state = reactive<{ master: any; jianshu: any; sifou: any }>({
      master: null,
      jianshu: null,
      sifou: null
    });

    const requestMaster = async () => {
      const { err_no, data, err_msg } = await $request.get(
        'user_api/v1/author/recommend',
        {
          category_id: '',
          cursor: 0,
          limit: 5
        }
      );
      if (err_no === 0) {
        state.master = data;
      }
    };
    const requestSifou = async () => {
      const { status, data } = await $request.get.sifou('api/live/recommend');
      if (status === 0) {
        state.sifou = data;
      }
    };
    const requestJianshu = async () => {
      const { users } = await $request.get.jianshu('users/recommended', {
        seen_ids: '',
        count: 10,
        only_unfollowed: true
      });
      // 简书没有 code 和 message 相关 key
      state.jianshu = users;
    };

    // const requestMaster = async () => {
    //   const { err_no, data, err_msg } = await $request.get(
    //     'user_api/v1/author/recommend',
    //     {
    //       category_id: '',
    //       cursor: 0,
    //       limit: 5
    //     }
    //   );
    //   if (err_no === 0) {
    //     state.master = data;
    //   }
    // };
    // const requestSifou = async () => {
    //   const { status, data } = await $request.get.sifou('api/live/recommend');
    //   if (status === 0) {
    //     state.sifou = data;
    //   }
    // };
    // const requestJianshu = async () => {
    //   const { users } = await $request.get.jianshu('users/recommended', {
    //     seen_ids: '',
    //     count: 10,
    //     only_unfollowed: true
    //   });
    //   // 简书没有 code 和 message 相关 key
    //   state.jianshu = users;
    // };

    onMounted(() => {
      requestMaster();
      requestSifou();
      requestJianshu();
    });

    return {
      ...toRefs(state)
    };
  }
});
</script>

<style lang="less" scoped>
fieldset + fieldset {
  margin-top: 30px;
}
</style>