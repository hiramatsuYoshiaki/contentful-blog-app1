<template lang="pug">
    div.footerBarWrape 
        div.footerBar
            div.elementWrape brand
            div.elementWrape mobileMenu
            div.elementWrape loginMenu
</template>
<style lang="scss" scoped>
$header-bg-color: $header-color;
$header-text-color: $header-text;
$header-bar-height: $header-height;
.footerBarWrape {
  position: relative;
  width: 100%;
}
.footerBar {
  width: 100%;
  height: 100%;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: $header-bg-color;
  color: $header-text-color;
}
.elementWrape {
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
