<template lang="pug">
    div.card-wrape
        div.card-content
            div.title
                slot(name="title")
            div.description
                slot(name="description")
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
  align-items: flex-end;
  flex-direction: column;

  // border: 1px solid yellow;
}
.title {
  margin-bottom: 1rem;
  // border: 1px solid blue;
}

.description {
  margin-bottom: 2rem;
}
</style>
