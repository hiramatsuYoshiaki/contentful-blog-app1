// state
export const state = () => ({
  contentfulData: []
})
// mutation
export const mutations = {
  setContentfulData(state, payload) {
    state.contentfulData = payload
  }
}
export const getters = {
  getContentfulData(state) {
    return state.contentfulData
  }
}
