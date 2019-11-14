// state
export const state = () => ({
  isOpenMobileMenu: false
})
// mutations
export const mutations = {
  setOpenMobileMenu(state) {
    state.isOpenMobileMenu = !state.isOpenMobileMenu
  },
  closeMobileMenu(state) {
    state.isOpenMobileMenu = false
  },
  openMobileMenu(state) {
    state.isOpenMobileMenu = true
  }
}
