/**
 * @proco/x402 — Policy violation error
 * Thrown before any on-chain transaction when a policy is breached.
 */

export class PolicyViolationError extends Error {
  readonly reason: string
  readonly code:
    | 'DAILY_CAP_EXCEEDED'
    | 'PER_TX_LIMIT_EXCEEDED'
    | 'VENDOR_NOT_ALLOWED'
    | 'OUTSIDE_ACTIVE_HOURS'
    | 'INSUFFICIENT_BALANCE'

  constructor(
    reason: string,
    code: PolicyViolationError['code']
  ) {
    super(reason)
    this.name = 'PolicyViolationError'
    this.reason = reason
    this.code = code
  }
}

export function isPolicyViolationError(err: unknown): err is PolicyViolationError {
  return err instanceof PolicyViolationError
}
