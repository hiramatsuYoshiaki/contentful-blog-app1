<template lang="pug">
    div.card-wrape(:class="{ gaps: ( idx % 2 ) != 0 }")
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
  padding: 0 2rem;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: 786px) {
    width: 50%;
    margin: 5rem 0 15rem 0;
    padding: 0 2rem;
  }
  //   @media (min-width: 992px) {
  //     width: 50%;
  //     margin: 5rem 0 15rem 0;
  //     padding: 0 2rem;
  //   }
  @media (min-width: 1200px) {
    width: 50%;
    margin: 10rem 0 25rem 0;
    padding: 0 2rem;
  }
  @media (min-width: 1600px) {
    width: 50%;
    margin: 10rem 0 30rem 0;
    padding: 0 6rem;
  }
  //   border: 1px solid black;
}
.card-image {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
.card-content {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
.title {
  margin-bottom: 1rem;
}
.description {
  margin-bottom: 2rem;
}
.gaps {
  @media (min-width: 786px) {
    margin: 15rem 0 0 0;
  }
  //   @media (min-width: 992px) {
  //     margin: 15rem 0 0 0;
  //   }
  @media (min-width: 1200px) {
    margin: 25rem 0 0 0;
  }
  @media (min-width: 1600px) {
    margin: 30rem 0 0 0;
  }
}
</style>
