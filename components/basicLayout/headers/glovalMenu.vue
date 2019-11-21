<template>
  <div class="wrape">
    <ul>
      <li v-for="(item, key) of nav" :key="key">
        <nuxt-link :to="item.to.name">{{ item.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    nav: {
      type: Array,
      default: null
    }
  }
}
</script>
<style scoped lang="scss">
.wrape {
  width: 100%;
  height: 100%;
}
li {
  display: inline;
  padding: 0 2rem;
}
a {
  color: $body-text;
  text-decoration: none;
}
</style>
