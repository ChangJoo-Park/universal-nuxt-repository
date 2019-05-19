export default function ({ store, error }) {
  // If the user is not authenticated
  if (!store.getters.admin) {
    return error('Page not found.')
  }
}
