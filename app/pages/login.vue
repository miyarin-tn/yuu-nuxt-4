<template>
  <div class="max-w-md mx-auto flex items-center justify-center min-h-70 h-[60vh]">
    <UForm
      :schema="schema"
      :state="state"
      class="center-form space-y-4"
      @submit="onSubmit"
    >
      <UFormField :label="$t('email')" name="email">
        <UInput v-model="state.email" :placeholder="$t('enter_email')" />
      </UFormField>

      <UFormField :label="$t('password')" name="password">
        <UInput v-model="state.password" type="password" :placeholder="$t('enter_password')" />
      </UFormField>

      <UButton type="submit" :disabled="loadingStore.isLoading">
        {{ $t('login') }}
      </UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import { login } from '~/services/user'
import { APP_ROUTES } from '~/constants/app-routes'

definePageMeta({
  middleware: ['unauth'],
})
useHead({
  title: $t('login'),
})

const loadingStore = useLoadingStore()

const schema = v.object({
  email: v.pipe(v.string(), v.email($t('invalid_email'))),
  password: v.pipe(v.string(), v.minLength(8, $t('password_length', { length: 8 }))),
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  email: 'user@example.com',
  password: '',
})

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const dataLogin = await login(state)
  toast.add({
    title: $t('success'),
    description: $t('login_success'),
    color: 'success',
  })
  useAuthorize(dataLogin)
  navigateTo(APP_ROUTES.HOME)
}
</script>
