<template lang="pug">
    div.card-wrape
        div.card-content
            div.card-image
                slot(name="image")
            div.title
                slot(name="title")
            div.date
                slot(name="date")
            div.body
                slot(name="body")
            div.description
                slot(name="description")
            div.category
                slot(name="category")
            div.tags
                slot(name="tags")
            div.content
                slot(name="link")
</template>
<style lang="scss" scoped>
.card-wrape {
  width: 100%;
  height: 100%;
  margin: 0 0 1rem 0;
  padding: 0 2rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (min-width: 976px) {
    padding: 0 2rem;
  }
  @media (min-width: 992px) {
    padding: 0 2rem;
  }
}
.card-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: 976px) {
    height: 100%;
  }
  //   border: 1px solid red;
}
.card-image {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 0;
  // @media (min-width: 976px) {
  //   padding: 0 2rem;
  // }
}
.title {
  margin-top: 1rem;
}
.header {
  margin-bottom: 0.5rem;
}
.content {
  margin-bottom: 0.5rem;
}
</style>
