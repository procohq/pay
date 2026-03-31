/**
 * @proco/x402 — Core types
 */

export interface PaymentRoute {
  amount: number          // in cents (e.g. 1_00 = $1.00 USDC)
  currency: 'USDC'
  description?: string
}

export interface ProcoX402Config {
  apiKey: string
  routes: Record<string, PaymentRoute>
  env?: 'sandbox' | 'production'
  facilitatorUrl?: string
}

export interface PaymentRequiredHeader {
  version: string
  scheme: 'exact'
  network: 'base' | 'base-sepolia'
  maxAmountRequired: string   // in base units (6 decimals for USDC)
  resource: string
  description?: string
  mimeType?: string
  payTo: string               // facilitator settlement address
  maxTimeoutSeconds: number
  asset: string               // USDC contract address
  extra?: Record<string, unknown>
}

export interface PaymentProof {
  scheme: 'exact'
  network: string
  payload: string             // base64-encoded signed payment
}

export interface VerifyRequest {
  paymentHeader: string       // raw X-PAYMENT header value
  paymentRequiredHeader: PaymentRequiredHeader
}

export interface VerifyResponse {
  isValid: boolean
  invalidReason?: string
  payer?: string              // agent wallet address
}

export interface SettleRequest {
  paymentHeader: string
  paymentRequiredHeader: PaymentRequiredHeader
}

export interface SettleResponse {
  success: boolean
  txHash?: string
  networkId?: string
  errorReason?: string
  payer?: string
}

export interface ProcoWalletPolicy {
  dailyCap?: number           // in cents
  perTx?: number              // in cents
  vendors?: string[]          // allowlisted vendor domains
  hoursActive?: [number, number]  // [startHour, endHour] UTC
  currency: 'USDC'
}

export type ProcoEnv = 'sandbox' | 'production'
