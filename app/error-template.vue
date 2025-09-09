<template>
  <div class="error-page__common" :class="{ 'error-page__common-center': error?.statusCode === 404 }">
    <h1 class="error-code">{{ error?.statusCode }}</h1>
    <h2 v-if="error?.statusCode === 404" class="error-status__message">{{ error?.statusMessage }}</h2>
    <p class="error-message">{{ error?.message }}</p>
    <div v-if="error?.statusCode !== 404" class="error-detail">
      <pre v-html="stackOnly"></pre>
    </div>
    <div v-if="error?.statusCode === 404" class="error-navigation">
      <NuxtLink to="/">
        {{ backHome }}
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useHead } from '#imports'

const error = useError()
const backHome = ref($t('go_back_home'))
const stackOnly = error?.value?.stack?.replace(/^.*?\r?\n/, '') || ''
useHead({
  title: `${error.value?.statusCode} - ${error.value?.statusMessage}`,
})
</script>
<style lang="scss" scoped>
.error-page__common {
  padding: 3rem 2.5rem;
  &.error-page__common-center {
    display: grid;
    min-height: 100vh;
    text-align: center;
    place-content: center;
    .error-code {
      font-size: 7rem;
    }
    .error-message {
      font-size: 1rem;
      font-weight: 400;
      padding-left: .5rem;
      padding-right: .5rem;
      margin-bottom: 1rem;
      color: var(--message-text);
    }
  }
  .error-code {
    font-size: 6rem;
    font-weight: 500;
    line-height: 1;
    margin-bottom: 1rem;
  }
  .error-status__message {
    font-size: 1.875rem;
    font-weight: 600;
    line-height: 2.25rem;
    margin-bottom: .5rem;
  }
  .error-message {
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 2rem;
    margin-bottom: 2rem;
  }
  .error-detail {
    background-color: var(--box-background);
    font-size: 1.25rem;
    font-weight: 300;
    line-height: 1.25;
    padding: 2rem;
  }
  .error-navigation {
    font-weight: 500;
    a {
      text-decoration: underline;
      text-underline-offset: 3px;
      font-size: .875rem;
      font-weight: 500;
      line-height: 1.25rem;
    }
  }
}
</style>
