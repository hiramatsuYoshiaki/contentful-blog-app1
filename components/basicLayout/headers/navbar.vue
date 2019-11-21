<template>
  <div class="wrape">
    <!-- <div>1</div>
    <div>2</div>-->
    <slot name="brand" class="slots brand" />
    <slot name="burger" class="slots burger" />
    <slot name="menu" class="slots menu" />
    <slot name="login" class="slots login" />
  </div>
</template>
<style scoped lang="scss">
.wrape {
  //   display: flex;
  display: inline;
  border: 1px solid white;
}
.slots {
  display: inline;
}
</style>
