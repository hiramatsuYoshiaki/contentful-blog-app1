<template lang="pug">
    div.card-wrape
        div.card-content
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
  @media (min-width: 786px) {
    width: 30%;
  }
  // border: 1px solid purple;
}
.card-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  // border: 1px solid yellow;
}
.title {
  margin-bottom: 1rem;
}
.date {
  margin-bottom: 2rem;
  @media (min-width: 786px) {
    margin-bottom: 6rem;
  }
}
.body {
  margin-bottom: 2rem;
}
.description {
  margin-bottom: 2rem;
}
.category {
  margin-bottom: 2rem;
}
.tags {
  margin-bottom: 2rem;
}
</style>
