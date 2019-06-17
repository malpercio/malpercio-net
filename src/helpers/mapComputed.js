export default function(store, prop, getter, mutation) {
  return {
    [prop]: {
      get() {
        return store.getters[getter];
      },
      set(value) {
        store.commit(mutation, value);
      }
    }
  };
}
