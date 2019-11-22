<template>
  <div class="main-wrape">
    <div class="mainLayout">
      <div class="section-wrape">
        <div v-if="error.statusCode === 404" class="error-message">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="90"
            height="90"
            fill="#9f9fa0"
            viewBox="0 0 48 48"
          >
            <path
              d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"
            />
          </svg>
          <h3>404 NOT FOUND</h3>
        </div>
        <div v-else class="error-message">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="90"
            height="90"
            fill="#9f9fa0"
            viewBox="0 0 48 48"
          >
            <path
              d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"
            />
          </svg>
          <h3>ERROR</h3>
        </div>
      </div>
      <div class="section-wrape">
        <nuxt-link to="/">BACK to HOME</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'basicLayout',
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>
<style lang="scss" scoped>
$header-bg-color: $header-color;
$header-text-color: $header-text;
$header-bar-height: $header-height;
$nuxt-link-color: #47494e;
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
// .contents {
//   width: 100%;
//   height: calc(100vh - #{$header-height});
//   @media (min-width: 992px) {
//     width: 100%;
//   }
// }
.section-wrape {
  //   width: 100%;
  padding-top: $section-padding-top;
  padding-bottom: $section-padding-bottom;
  // padding-right: $section-padding-right;
  // padding-left: $section-padding-left;
  overflow-x: hidden;
}
.error-message {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
h3 {
  color: #737475;
  //   color: #9f9fa0;
  margin-left: 1rem;
}
a {
  color: $nuxt-link-color;
}
</style>
