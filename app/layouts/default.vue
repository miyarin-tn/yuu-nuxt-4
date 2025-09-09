<template>
  <div class="wrapper">
    <div class="header-bar">
      <USelect
        v-model="value"
        :items="items"
        value-key="id"
        :avatar="avatar"
        :content="{ bodyLock: false }"
        class="w-48"
        @change="setLocale(value)"
      />
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'

const { setLocale, locale } = useI18n()

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
</script>

<style lang="scss" scoped>
.header-bar {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
