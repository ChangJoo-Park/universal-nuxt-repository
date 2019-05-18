export default function ({ store, redirect }) {
  console.log('store.getters.authenticated', store.getters.authenticated)
  // If the user is not authenticated
  if (!store.getters.authenticated) {
    return redirect('/login')
  }
}
