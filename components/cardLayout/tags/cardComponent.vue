<template lang="pug">
    div.card-wrape 
        div.card-image 
            slot(name="image")
        div.card-content 
            div.title-wrape.text-ellipsis
                slot(name="title")
            div.title-wrape
                slot(name="date")
            div.title-wrape
                slot(name="link")
            //- div.title-wrape
            //-     slot(name="category")
            //- div.title-wrape
            //-     slot(name="tags")
            //- div.title-wrape
            //-     slot(name="draft")
</template>
<style lang="scss" scoped>
$card-height: 8rem;
$card-height-laptop: 12rem;
.card-wrape {
  width: 480px;
  height: $card-height;
  margin: 0 0 1rem 0;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  padding: 0;
  @media (min-width: 960px) {
    width: 960px;
    height: $card-height-laptop;
  }
  border: 1px solid $grey;
}
.card-image {
  width: calc(#{$card-height} * 1.6);
  height: $card-height;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0;
  @media (min-width: 960px) {
    width: calc(#{$card-height-laptop} * 1.6);
    height: $card-height-laptop;
  }
}
.card-content {
  width: calc(480px - (#{$card-height} * 1.6));
  height: $card-height;
  display: block;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 0.5rem 0 0.5rem 2rem;
  @media (min-width: 960px) {
    width: calc(960px - #{$card-height-laptop} * 1.6);
    height: $card-height-laptop;
  }
}
</style>
