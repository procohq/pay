/**
 * @proco/x402 — Facilitator client
 * Calls Proco's /verify and /settle endpoints
 */

import {
  VerifyRequest,
  VerifyResponse,
  SettleRequest,
  SettleResponse,
  PaymentRequiredHeader,
  ProcoEnv,
} from '../types'

const FACILITATOR_URLS: Record<ProcoEnv, string> = {
  sandbox: 'https://sandbox.api.procohq.com',
  production: 'https://api.procohq.com',
}

export class FacilitatorClient {
  private baseUrl: string
  private apiKey: string

  constructor(apiKey: string, env: ProcoEnv = 'production', facilitatorUrl?: string) {
    this.apiKey = apiKey
    this.baseUrl = facilitatorUrl ?? FACILITATOR_URLS[env]
  }

  async verify(req: VerifyRequest): Promise<VerifyResponse> {
    const res = await fetch(`${this.baseUrl}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(req),
    })

    if (!res.ok) {
      return {
        isValid: false,
        invalidReason: `Facilitator verify failed: ${res.status}`,
      }
    }

    return res.json() as Promise<VerifyResponse>
  }

  async settle(req: SettleRequest): Promise<SettleResponse> {
    const res = await fetch(`${this.baseUrl}/settle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(req),
    })

    if (!res.ok) {
      const body = await res.text()
      return {
        success: false,
        errorReason: `Facilitator settle failed: ${res.status} ${body}`,
      }
    }

    return res.json() as Promise<SettleResponse>
  }

  /**
   * Build a PaymentRequiredHeader for a given route config.
   * This is what gets sent in the 402 response to the agent.
   */
  buildPaymentRequiredHeader(params: {
    resource: string
    amountCents: number
    description?: string
    env: ProcoEnv
  }): PaymentRequiredHeader {
    const isMainnet = params.env === 'production'

    return {
      version: '1',
      scheme: 'exact',
      network: isMainnet ? 'base' : 'base-sepolia',
      maxAmountRequired: String(params.amountCents * 10_000), // USDC has 6 decimals; cents * 10000 = base units
      resource: params.resource,
      description: params.description,
      payTo: isMainnet
        ? '0xProcoSettlementAddress'          // replaced at deploy time
        : '0xProcoSettlementAddressSepolia',   // replaced at deploy time
      maxTimeoutSeconds: 60,
      asset: isMainnet
        ? '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'  // USDC on Base
        : '0x036CbD53842c5426634e7929541eC2318f3dCF7e',  // USDC on Base Sepolia
    }
  }
}
