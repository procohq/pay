/**
 * @proco/x402
 *
 * Proco's x402 facilitator — HTTP 402 payment verification and settlement for AI agents.
 * Built on the x402 open standard. Runs on Base/USDC.
 *
 * @see https://github.com/coinbase/x402
 * @see https://procohq.com
 */

export { procoX402Middleware } from './middleware/express'
export { FacilitatorClient } from './facilitator/client'
export { PolicyViolationError, isPolicyViolationError } from './policies'
export type {
  ProcoX402Config,
  PaymentRoute,
  PaymentRequiredHeader,
  PaymentProof,
  VerifyRequest,
  VerifyResponse,
  SettleRequest,
  SettleResponse,
  ProcoWalletPolicy,
  ProcoEnv,
} from './types'
