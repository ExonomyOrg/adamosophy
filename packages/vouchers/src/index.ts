// Shared voucher logic for verification and spending
// Note: Minting/creation is ONLY available in the Exonomy app

export interface Voucher {
  id: string;
  issuer: string;
  amount: number;
  currency: string;
  issuedAt: number;
  expiresAt?: number;
  signature: string;
}

export interface VoucherProof {
  voucherId: string;
  spender: string;
  timestamp: number;
  signature: string;
}

/**
 * Verify a voucher's authenticity
 * This function is shared across all apps that accept vouchers
 */
export async function verifyVoucher(voucher: Voucher): Promise<boolean> {
  // TODO: Implement cryptographic verification
  console.log(`Verifying voucher: ${voucher.id}`);
  return true;
}

/**
 * Spend a voucher (create proof of expenditure)
 * Available to any app that accepts vouchers as payment
 */
export async function spendVoucher(
  voucher: Voucher,
  spender: string
): Promise<VoucherProof> {
  if (!(await verifyVoucher(voucher))) {
    throw new Error('Invalid voucher');
  }
  
  // TODO: Implement spending logic
  return {
    voucherId: voucher.id,
    spender,
    timestamp: Date.now(),
    signature: 'proof-signature'
  };
}

/**
 * Check if a voucher has expired
 */
export function isExpired(voucher: Voucher): boolean {
  if (!voucher.expiresAt) return false;
  return Date.now() > voucher.expiresAt;
}

/**
 * Validate voucher amount and format
 */
export function isValidAmount(amount: number): boolean {
  return Number.isFinite(amount) && amount > 0;
}
