export type PriceMode = "TAX_INCLUSIVE" | "TAX_EXCLUSIVE";

export interface TaxCalculationInput {
  subtotalInPaise: number;
  discountInPaise?: number;
  sellerState: string;
  customerBillingState?: string | null;
  taxRatePercent: number; // e.g. 18 for 18%
  priceMode: PriceMode;
}

export interface TaxCalculationResult {
  subtotalInPaise: number;
  discountInPaise: number;
  taxableValueInPaise: number;
  cgstInPaise: number;
  sgstInPaise: number;
  igstInPaise: number;
  taxTotalInPaise: number;
  totalInPaise: number;
  isIntraState: boolean;
  rateAppliedPercent: number;
}

/**
 * Pure, integer paise tax calculation adhering to GST Place-of-Supply rules.
 * PRD Section 14.
 */
export function calculateTaxAndTotal(input: TaxCalculationInput): TaxCalculationResult {
  const subtotal = Math.max(0, input.subtotalInPaise);
  const discount = Math.min(subtotal, Math.max(0, input.discountInPaise ?? 0));
  const rate = Math.max(0, input.taxRatePercent);

  // Normalize state names for comparison
  const sellerStateNorm = input.sellerState.trim().toLowerCase();
  const customerStateNorm = (input.customerBillingState || input.sellerState).trim().toLowerCase();
  const isIntraState = sellerStateNorm === customerStateNorm;

  if (rate === 0) {
    const net = subtotal - discount;
    return {
      subtotalInPaise: subtotal,
      discountInPaise: discount,
      taxableValueInPaise: net,
      cgstInPaise: 0,
      sgstInPaise: 0,
      igstInPaise: 0,
      taxTotalInPaise: 0,
      totalInPaise: net,
      isIntraState,
      rateAppliedPercent: 0,
    };
  }

  let taxableValueInPaise: number;
  let taxTotalInPaise: number;
  let totalInPaise: number;

  if (input.priceMode === "TAX_INCLUSIVE") {
    // Total includes tax: Net total is fixed, extract tax backwards
    totalInPaise = subtotal - discount;
    // Formula: Taxable = Total / (1 + rate/100) = (Total * 10000) / (10000 + rate * 100)
    taxableValueInPaise = Math.round((totalInPaise * 10000) / (10000 + rate * 100));
    taxTotalInPaise = totalInPaise - taxableValueInPaise;
  } else {
    // Tax exclusive: Catalog subtotal is taxable, add tax forwards
    taxableValueInPaise = subtotal - discount;
    taxTotalInPaise = Math.round((taxableValueInPaise * rate) / 100);
    totalInPaise = taxableValueInPaise + taxTotalInPaise;
  }

  let cgstInPaise = 0;
  let sgstInPaise = 0;
  let igstInPaise = 0;

  if (isIntraState) {
    // Split equally between CGST and SGST
    cgstInPaise = Math.floor(taxTotalInPaise / 2);
    sgstInPaise = taxTotalInPaise - cgstInPaise; // Handle odd paise rounding safely
  } else {
    igstInPaise = taxTotalInPaise;
  }

  return {
    subtotalInPaise: subtotal,
    discountInPaise: discount,
    taxableValueInPaise,
    cgstInPaise,
    sgstInPaise,
    igstInPaise,
    taxTotalInPaise,
    totalInPaise,
    isIntraState,
    rateAppliedPercent: rate,
  };
}
