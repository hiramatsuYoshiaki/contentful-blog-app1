export default async ({ store }) => {
  if (!store.state.posts.length) await store.dispatch('getPosts')
  // if (!store.state.categories.length) await store.dispatch('getCategories')
  // await store.dispatch('getPosts')
  // await store.dispatch('getCategories')
}
