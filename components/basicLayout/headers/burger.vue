<template>
  <div class="wrape">
    <div
      id="toggle"
      :class="{ on: isOpenMobileMenu }"
      @click="openMobileMenu()"
    >
      <div class="one" />
      <div class="two" />
      <div class="three" />
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  // data() {
  //   return {
  //     isOpenMobileMenu: false
  //   }
  // },
  computed: {
    ...mapState('headerBar', ['isOpenMobileMenu'])
    // ...mapState(store/directory,state)
  },
  methods: {
    ...mapMutations({ open: 'headerBar/setOpenMobileMenu' }),
    // ...mapMutation({ name: store(directory)/mutations})
    openMobileMenu() {
      // this.isOpenMobileMenu = !this.isOpenMobileMenu
      // this.$store.commit('headerBar/setOpenMobileMenu')
      this.open()
    }
  }
}
</script>
<style scoped lang="scss">
.wrape {
  margin: 0;
  padding: 0;
}
//mobile menu
#toggle {
  width: 28px;
  height: 30px;
  margin: 10px auto;
  cursor: pointer;
}
#toggle div {
  width: 100%;
  height: 4px;
  background: $header-color;
  margin: 4px auto;
  transition: all 0.3s;
  backface-visibility: hidden;
}
#toggle div.one {
  width: 14px;
  height: 4px;
  margin-left: 14px;
}
#toggle div.two,
#toggle div.three {
  width: 100%;
  height: 4px;
}

//click move element tggtl class on
#toggle.on .one {
  transform: rotate(45deg) translate(5px, 5px);
  width: 28px;
  margin: 0;
}

#toggle.on .two {
  opacity: 0;
}

#toggle.on .three {
  transform: rotate(-45deg) translate(7px, -8px);
}
</style>
