import { ref } from 'vue'
import { verifyPassword } from '@/utils/crypto'

const authenticatedSeries = ref<Set<string>>(new Set())

export function useTutorialAuth() {
  async function authenticate(seriesKey: string, password: string, hash: string): Promise<boolean> {
    const valid = await verifyPassword(password, hash)
    if (valid) {
      authenticatedSeries.value.add(seriesKey)
    }
    return valid
  }

  function isAuthenticated(seriesKey: string): boolean {
    return authenticatedSeries.value.has(seriesKey)
  }

  return { authenticate, isAuthenticated }
}
