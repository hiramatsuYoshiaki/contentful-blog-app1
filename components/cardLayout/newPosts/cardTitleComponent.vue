<template lang="pug">
    div.card-wrape
        div.card-content
            div.header
                slot(name="title")
            div.content
                slot(name="date")
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
  // border: 1px solid red;
}
.header {
  margin-bottom: 2rem;
}
.content {
  margin-bottom: 2rem;
}
</style>
