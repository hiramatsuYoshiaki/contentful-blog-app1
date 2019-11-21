// import client from '~/plugins/contentful'
// state
export const state = () => ({
  postAllData: [],
  postSingleData: null
})
// mutation
export const mutations = {
  setpostSingleData(state, payload) {
    state.postSingleData = payload
  },
  setpostAllData(state, payload) {
    state.postAllData = payload
  }
}
// action
// export const actions = {
//   async getPosts({ commit }) {
//     await client
//       .getEntries({
//         content_type: process.env.CTF_BLOG_POST_TYPE_ID,
//         order: '-fields.publishDate' // desc
//       })
//       .then((res) => commit('setPosts', res.items))
//       .catch(console.error)
//   }

//   getPageItems({ commit }, { env }) {
//     console.log(env)
//     client
//       .getEntries({
//         content_type: env.CTF_BLOG_POST_TYPE_ID,
//         order: '-fields.publishDate'
//       })
//       .then((res) => {
//         if (res) {
//           console.log(res.items)
//           const posts = res.items
//           commit('setpostAllData', posts)
//         }
//       })
//       .catch((err) => {
//         console.log('error', err)
//       })
//   }
// }
// mutation
export const getters = {
  getpostSingleData(state) {
    return state.postSingleData
  }
  //   getpostAllData(state) {
  //     return state.postAllData
  //   }
}
