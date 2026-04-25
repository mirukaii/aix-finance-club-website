// Rate limiting store - simple in-memory Map for tracking failed attempts
// Key: IP address, Value: { attempts: number, resetTime: number }
const rateLimitStore = new Map<
  string,
  { attempts: number; resetTime: number }
>()

const MAX_ATTEMPTS = 5
const BLOCK_DURATION_MS = 15 * 60 * 1000 // 15 minutes

/**
 * Check if the IP is rate limited (blocked due to too many failed attempts)
 * This does NOT increment the counter - use recordFailedAttempt for that
 */
export function checkRateLimit(ip: string): {
  allowed: boolean
  attemptsLeft: number
  resetInSeconds: number
} {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  // Clean up old records
  if (record && now > record.resetTime) {
    rateLimitStore.delete(ip)
    return { allowed: true, attemptsLeft: MAX_ATTEMPTS, resetInSeconds: 0 }
  }

  if (!record) {
    // No failed attempts recorded
    return { allowed: true, attemptsLeft: MAX_ATTEMPTS, resetInSeconds: 0 }
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    const resetInSeconds = Math.ceil((record.resetTime - now) / 1000)
    return {
      allowed: false,
      attemptsLeft: 0,
      resetInSeconds,
    }
  }

  return {
    allowed: true,
    attemptsLeft: MAX_ATTEMPTS - record.attempts,
    resetInSeconds: 0,
  }
}

/**
 * Record a failed login attempt for an IP address
 * Only call this AFTER verifying the password was wrong
 */
export function recordFailedAttempt(ip: string): void {
  const now = Date.now()
  const record = rateLimitStore.get(ip)
  
  if (record) {
    record.attempts += 1
  } else {
    rateLimitStore.set(ip, {
      attempts: 1,
      resetTime: now + BLOCK_DURATION_MS,
    })
  }
}

/**
 * Reset rate limit for an IP (e.g., after successful login)
 */
export function resetRateLimit(ip: string): void {
  rateLimitStore.delete(ip)
}
