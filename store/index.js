import client from '~/plugins/contentful'
import defaultEyeCatch from '~/assets/img/defaultEyeCatch.png'
// state
export const state = () => ({
  page: '/',
  fromPage: '/',
  transitionName: 'fromTop',
  posts: [],
  categories: [],
  tags: [],
  single: null
})
// mutation
export const mutations = {
  // page transition
  pagePathSet(state, payload) {
    state.page = payload
  },
  fromPageSet(state, payload) {
    state.fromPage = payload
  },
  transitionNameSet(state, payload) {
    state.transitionName = payload
  },
  // post
  setPosts(state, payload) {
    state.posts = payload
  },
  // setCategories(state, payload) {
  //   state.categories = payload
  // },
  setLinks(state, entries) {
    state.tags = []
    state.categories = []
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i]
      if (entry.sys.contentType.sys.id === 'tag') state.tags.push(entry)
      else if (entry.sys.contentType.sys.id === 'category')
        state.categories.push(entry)
    }
    state.categories.sort((a, b) => a.fields.sort - b.fields.sort)
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
      // .then((res) => {
      //   console.log(res)
      //   commit('setPosts', res.items)
      // })
      // .catch(console.error)
      .then((res) => {
        commit('setLinks', res.includes.Entry)
        commit('setPosts', res.items)
        // console.log('getpost run----------')
      })
      .catch(console.error)
  }
  // async getCategories({ commit }) {
  //   await client
  //     .getEntries({
  //       content_type: 'category',
  //       order: 'fields.sort'
  //     })
  //     .then((res) => commit('setCategories', res.items))
  //     .catch(console.error)
  // }
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
  },
  setEyeCatchImage: () => (post) => {
    if (!!post.fields.image && !!post.fields.image.fields)
      return {
        url: `https:${post.fields.image.fields.file.url}`,
        title: post.fields.image.fields.title
      }
    else return { url: defaultEyeCatch, title: 'defaultImage' }
  },
  setEyeCatchImage2: () => (post) => {
    if (!!post && !!post.fields)
      return {
        url: `https:${post.fields.file.url}`,
        title: post.fields.title
      }
    else return { url: defaultEyeCatch, title: 'defaultImage' }
  },
  draftChip: () => (post) => {
    if (post.fields.publishDate) return 'draftChip'
  },
  associatePosts: (state) => (currentTag) => {
    const posts = []
    for (let i = 0; i < state.posts.length; i++) {
      const post = state.posts[i]
      if (post.fields.tags) {
        const tag = post.fields.tags.find(
          (tag) => tag.sys.id === currentTag.sys.id
        )

        if (tag) posts.push(post)
      }
    }
    return posts
  }
}
