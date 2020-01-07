<template lang="pug">
    div.card-wrape
        div.card-image
            slot(name="image")
        
</template>
<style lang="scss" scoped>
.card-wrape {
  width: 100%;
  margin: 0 0 1rem 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: 960px) {
    padding: 0 2rem;
  }
}
.card-image {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
