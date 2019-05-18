import createRepository from '~/api/repository'

export default (ctx, inject) => {
  const repositoryWithAxios = createRepository(ctx.$axios)

  const repositories = {
    post: repositoryWithAxios.post,
    auth: repositoryWithAxios.auth,
    user: repositoryWithAxios.user
  }
  inject('repositories', repositories)
}
