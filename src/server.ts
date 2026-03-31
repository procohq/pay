/**
 * @proco/x402 — Self-hosted facilitator server
 *
 * Run your own Proco x402 facilitator.
 * Exposes /verify, /settle, and /health endpoints.
 *
 * Set env vars in .env (see .env.example)
 */

import express from 'express'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3402

/**
 * Health check
 */
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', version: '0.1.0', network: process.env.NETWORK || 'base-sepolia' })
})

/**
 * POST /verify
 *
 * Validates a signed payment payload from an agent.
 * Returns { isValid, invalidReason?, payer? }
 */
app.post('/verify', async (req, res) => {
  const { paymentHeader, paymentRequiredHeader } = req.body

  if (!paymentHeader || !paymentRequiredHeader) {
    return res.status(400).json({ error: 'Missing paymentHeader or paymentRequiredHeader' })
  }

  try {
    // TODO: Implement on-chain verification
    // 1. Decode the paymentHeader (base64 JSON with EIP-712 signature)
    // 2. Recover the signer address
    // 3. Verify the amount, recipient, and deadline match paymentRequiredHeader
    // 4. Check the payment hasn't been used before (replay protection)

    // Stub response for open-source reference implementation
    res.json({
      isValid: true,
      payer: '0x0000000000000000000000000000000000000000',
    })
  } catch (err) {
    res.status(500).json({ isValid: false, invalidReason: String(err) })
  }
})

/**
 * POST /settle
 *
 * Submits a verified payment to Base.
 * Returns { success, txHash, networkId, payer? }
 */
app.post('/settle', async (req, res) => {
  const { paymentHeader, paymentRequiredHeader } = req.body

  if (!paymentHeader || !paymentRequiredHeader) {
    return res.status(400).json({ error: 'Missing paymentHeader or paymentRequiredHeader' })
  }

  try {
    // TODO: Implement on-chain settlement
    // 1. Re-verify the payment (prevent settling unverified payments)
    // 2. Submit USDC transferFrom transaction using settlement key
    // 3. Wait for transaction confirmation
    // 4. Return txHash

    // Stub response for open-source reference implementation
    res.json({
      success: true,
      txHash: '0x' + '0'.repeat(64),
      networkId: process.env.NETWORK || 'base-sepolia',
      payer: '0x0000000000000000000000000000000000000000',
    })
  } catch (err) {
    res.status(500).json({ success: false, errorReason: String(err) })
  }
})

app.listen(PORT, () => {
  console.log(`Proco x402 facilitator running on port ${PORT}`)
  console.log(`Network: ${process.env.NETWORK || 'base-sepolia'}`)
  console.log(`Health: http://localhost:${PORT}/health`)
})

export default app
