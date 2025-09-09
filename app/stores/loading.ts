export const useLoadingStore = defineStore('loading', () => {
  // state
  const isLoading = ref(false)

  // getter
  const getLoading = computed(() => isLoading.value)

  // action
  function setLoading(status: boolean) {
    isLoading.value = status
  }

  return { isLoading, getLoading, setLoading }
})
