<template>
  <div class="wrapper">
    <div v-show="!loadingStore.isLoading" class="header-bar">
      <client-only>
        <USwitch
          v-model="isLight"
          unchecked-icon="i-lucide:sun-moon"
          checked-icon="i-lucide:sun-medium"
        />
      </client-only>
      <USelect
        v-model="value"
        :items="items"
        value-key="id"
        :avatar="avatar"
        :content="{ bodyLock: false }"
        class="w-48"
        @change="setLocale(value)"
      />
      <UIcon
        v-show="authStore.isAuthenticated"
        name="i-lucide:power"
        class="size-5 cursor-pointer"
        @click="logout"
      />
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'
import { APP_ROUTES } from '~/constants/app-routes'

const { setLocale, locale } = useI18n()
const loadingStore = useLoadingStore()
const authStore = useAuthStore()

loadingStore.setLoading(true)

const colorMode = useColorMode()
const isLight = computed({
  get: () => colorMode.value === 'light',
  set: (val: boolean) => {
    colorMode.preference = val ? 'light' : 'dark'
  },
})

const items = computed(() => [
  {
    id: 'en',
    label: $t('english'),
    avatar: {
      src: 'https://cdn-icons-png.flaticon.com/128/323/323310.png',
      alt: $t('english'),
    },
  },
  {
    id: 'vi',
    label: $t('vietnamese'),
    avatar: {
      src: 'https://cdn-icons-png.flaticon.com/128/197/197473.png',
      alt: $t('vietnamese'),
    },
  },
] satisfies SelectItem[])

const value = ref(locale.value || 'en')
const avatar = computed(() => items.value.find((item: any) => item.id === value.value)?.avatar)

onMounted(async () => {
  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
  await wait(200).then(() => loadingStore.setLoading(false))
})

const toast = useToast()
function logout() {
  useLogout()
  toast.clear()
  navigateTo(APP_ROUTES.LOGIN)
}
</script>

<style lang="scss" scoped>
.header-bar {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  :deep(.border-2) {
    border-width: 2px;
    border-color: transparent;
  }
}
</style>
