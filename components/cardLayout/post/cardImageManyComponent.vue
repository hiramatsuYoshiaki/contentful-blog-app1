<template lang="pug">
    //- div.card-wrape(:class="{ gapsRight: ( idx % 2 ) != 0 }")
    div.card-wrape(:class=" (( idx % 2 ) != 0) ? 'gapsRight' : 'gapsLeft'")
        div.card-image
            slot(name="image")
        div.card-content
            div.header
                slot(name="title")
            div.content
                slot(name="description")
           
</template>
<script>
export default {
  props: {
    idx: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style lang="scss" scoped>
.card-wrape {
  width: 100%;
  margin: 0 0 0 0;
  padding: 0 2rem 2rem 2rem;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 2rem;
  @media (min-width: 960px) {
    width: 50%;
    padding: 0 2rem 8rem 2rem;
  }
}
.card-image {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
.card-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}

.header,
.content {
  width: 100%;
  overflow: hidden;
}
.gapsLeft {
  @media (min-width: 960px) {
    margin: -8rem 0 0 0;
  }
  @media (min-width: 1200px) {
    margin: -10rem 0 0 0;
  }
  @media (min-width: 1600px) {
    margin: -16rem 0 0 0;
  }
}
.gapsRight {
  @media (min-width: 960px) {
    margin: 0rem 0 0 0;
    // margin: 8rem 0 0 0;
  }
  @media (min-width: 1200px) {
    margin: 0rem 0 0 0;
    // margin: 10rem 0 0 0;
  }
  @media (min-width: 1600px) {
    margin: 0rem 0 0 0;
    // margin: 16rem 0 0 0;
  }
}
</style>
