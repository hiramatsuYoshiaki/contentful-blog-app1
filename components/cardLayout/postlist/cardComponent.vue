<template lang="pug">
    div.card-wrape 
        div.card-image 
            slot(name="image")
        div.card-content 
            div.title-wrape
                slot(name="title")
            div.title-wrape
                slot(name="subTitle")
            div.title-wrape
                slot(name="date")
            div.title-wrape
                slot(name="stage")    
            div.title-wrape
                slot(name="category")
            
            div.title-wrape
                slot(name="tags")
            div.title-wrape
                slot(name="draft")
</template>
<style lang="scss" scoped>
.card-wrape {
  width: 100%;
  margin: 0 0 1rem 0;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  padding: 0;
  @media (min-width: 976px) {
    padding: 0 2rem 0 0;
  }
  //   @media (min-width: 992px) {
  //     padding: 0 2rem;
  //     flex-direction: row;
  //   }
  // border: 1px solid blue;
}
.card-image {
  width: 40%;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 0;
  // @media (min-width: 976px) {
  //   padding: 0 2rem;
  // }
  // border: 1px solid purple;
}
.card-content {
  width: 60%;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 0 0 0 2rem;
  @media (min-width: 976px) {
    padding: 0 2rem;
    width: 60%;
  }
  //   border: 1px solid limegreen;
}
</style>
