<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTutorialAuth } from '@/composables/useTutorialAuth'

const props = defineProps<{
  seriesKey: string
  passwordHash: string
}>()

const emit = defineEmits<{
  authenticated: []
}>()

const { t } = useI18n()
const { authenticate } = useTutorialAuth()

const password = ref('')
const error = ref(false)
const loading = ref(false)

async function handleSubmit() {
  loading.value = true
  error.value = false

  const valid = await authenticate(props.seriesKey, password.value, props.passwordHash)

  if (valid) {
    emit('authenticated')
  } else {
    error.value = true
    password.value = ''
  }

  loading.value = false
}
</script>

<template>
  <div class="password-gate">
    <div class="password-gate__card">
      <div class="password-gate__icon">🔒</div>
      <h2 class="password-gate__title">{{ t('passwordGate.title') }}</h2>
      <p class="password-gate__desc">{{ t('passwordGate.description') }}</p>

      <form class="password-gate__form" @submit.prevent="handleSubmit">
        <input
          v-model="password"
          type="password"
          class="password-gate__input"
          :class="{ 'password-gate__input--error': error }"
          :placeholder="t('passwordGate.placeholder')"
          autofocus
        />
        <p v-if="error" class="password-gate__error">{{ t('passwordGate.error') }}</p>
        <button
          type="submit"
          class="password-gate__btn"
          :disabled="loading || !password"
        >
          {{ loading ? t('passwordGate.verifying') : t('passwordGate.submit') }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.password-gate {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: $space-6;
}

.password-gate__card {
  max-width: 420px;
  width: 100%;
  background-color: $color-card;
  border-radius: $radius-xl;
  padding: $space-12 $space-8;
  box-shadow: $shadow-lg;
  text-align: center;
}

.password-gate__icon {
  font-size: 3rem;
  margin-bottom: $space-4;
}

.password-gate__title {
  font-size: $font-size-2xl;
  font-weight: $font-weight-bold;
  color: $color-text;
  margin: 0 0 $space-3;
}

.password-gate__desc {
  font-size: $font-size-sm;
  color: $color-text-secondary;
  margin: 0 0 $space-8;
  line-height: $line-height-normal;
}

.password-gate__form {
  display: flex;
  flex-direction: column;
  gap: $space-3;
}

.password-gate__input {
  width: 100%;
  padding: $space-3 $space-4;
  font-size: $font-size-base;
  border: 2px solid $color-border;
  border-radius: $radius-lg;
  background-color: $color-bg;
  color: $color-text;
  outline: none;
  transition: border-color $transition-fast;
  box-sizing: border-box;

  &:focus {
    border-color: $color-primary;
  }

  &--error {
    border-color: $color-danger;

    &:focus {
      border-color: $color-danger;
    }
  }
}

.password-gate__error {
  font-size: $font-size-sm;
  color: $color-danger;
  margin: 0;
  text-align: left;
}

.password-gate__btn {
  width: 100%;
  padding: $space-3 $space-4;
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  color: $color-text-inverse;
  background: $gradient-primary;
  border: none;
  border-radius: $radius-lg;
  cursor: pointer;
  transition: opacity $transition-fast, transform $transition-fast;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
