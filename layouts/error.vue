<template lang="pug">
  <div class="main-wrape">
    <div class="mainLayout">
        <div class="section-wrape">
            <h1 v-if="error.statusCode === 404">ページが見つかりません</h1>
            <h1 v-else>エラーが発生しました</h1>
        </div>
        <div class="section-wrape">
            <nuxt-link to="/">ホームへ戻る</nuxt-link>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'basicLayout',
  props: ['error']
}
</script>
<style lang="scss" scoped>
$header-bg-color: $header-color;
$header-text-color: $header-text;
$header-bar-height: $header-height;
$nuxt-link-color: $link-color-black;
.main-wrape {
  margin-top: $header-height;
}
.mainLayout {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - #{$header-height});

  //   @media (min-width: 992px) {
  //     flex-direction: row;
  //   }
}
.contents {
  //   width: 100%;
  //   height: calc(100vh - #{$header-height});
  //   @media (min-width: 992px) {
  //     width: 100%;
  //   }
}
.section-wrape {
  //   width: 100%;
  padding-top: $section-padding-top;
  padding-bottom: $section-padding-bottom;
  // padding-right: $section-padding-right;
  // padding-left: $section-padding-left;
  overflow-x: hidden;
}
img {
  width: 300px;
  height: 175px;
}
a {
  color: $nuxt-link-color;
}
</style>
