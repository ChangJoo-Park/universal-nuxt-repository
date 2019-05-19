export default function ({ store, error }) {
  // If the user is not authenticated
  if (!store.getters.authenticated ||
    !store.getters.user ||
    store.getters.user.role !== 'admin') {
    return error('Page not found.')
  }
}
