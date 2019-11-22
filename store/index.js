import client from '~/plugins/contentful'
import defaultEyeCatch from '~/assets/img/defaultEyeCatch.png'
// state
export const state = () => ({
  posts: [],
  categories: [],
  single: null
})
// mutation
export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  },
  setCategories(state, payload) {
    state.categories = payload
  },
  setSingle(state, payload) {
    state.single = payload
  },
  setImgTransition(state, payload) {
    state.posts[payload.index].fields.transition = payload.boolean
  },
  setListTransition(state, payload) {
    state.posts[payload.index].fields.transitionPost = payload.boolean
  }
}
// action
export const actions = {
  async getPosts({ commit }) {
    await client
      .getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        order: '-fields.publishDate'
      })
      .then((res) => commit('setPosts', res.items))
      .catch(console.error)
  },
  async getCategories({ commit }) {
    await client
      .getEntries({
        content_type: 'category',
        order: 'fields.sort'
      })
      .then((res) => commit('setCategories', res.items))
      .catch(console.error)
  }
}
//
export const getters = {
  // relatedPosts: (state) => (category) => {
  //   const posts = []
  //   for (let i = 0; i < state.posts.length; i++) {
  //     const catId = state.posts[i].fields.category.sys.id
  //     if (category.sys.id === catId) posts.push(state.posts[i])
  //   }
  //   return posts
  // }
  relatedPosts: (state) => (category) => {
    return state.posts.filter(
      (post) => post.fields.category.sys.id === category.sys.id
    )
  },
  setEyeCatch: () => (post) => {
    if (!!post.fields.heroImage && !!post.fields.heroImage.fields)
      return {
        url: `https:${post.fields.heroImage.fields.file.url}`,
        title: post.fields.heroImage.fields.title
      }
    else return { url: defaultEyeCatch, title: 'defaultImage' }
    // if (!!post.fields.image && !!post.fields.image.fields)
    //   return {
    //     url: `https:${post.fields.image.fields.file.url}`,
    //     title: post.fields.image.fields.title
    //   }
    // else return { url: defaultEyeCatch, title: 'defaultImage' }
  }
}
