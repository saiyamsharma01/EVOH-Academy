import { describe, it, expect } from "vitest";
import { calculateTaxAndTotal } from "../server/commerce/tax-calculator";

describe("GST Tax & Pricing Engine (calculateTaxAndTotal)", () => {
  it("computes intra-state CGST + SGST split under TAX_INCLUSIVE mode", () => {
    // 599 INR = 59900 paise, 18% GST, same state (Delhi -> Delhi)
    const result = calculateTaxAndTotal({
      subtotalInPaise: 59900,
      discountInPaise: 0,
      sellerState: "Delhi",
      customerBillingState: "Delhi",
      taxRatePercent: 18,
      priceMode: "TAX_INCLUSIVE",
    });

    expect(result.isIntraState).toBe(true);
    expect(result.totalInPaise).toBe(59900); // Fixed inclusive total
    expect(result.taxableValueInPaise + result.taxTotalInPaise).toBe(59900);
    expect(result.cgstInPaise + result.sgstInPaise).toBe(result.taxTotalInPaise);
    expect(result.igstInPaise).toBe(0);
    // CGST and SGST split evenly (diff <= 1 paise)
    expect(Math.abs(result.cgstInPaise - result.sgstInPaise)).toBeLessThanOrEqual(1);
  });

  it("computes inter-state IGST under TAX_INCLUSIVE mode", () => {
    // Delhi seller -> Maharashtra buyer
    const result = calculateTaxAndTotal({
      subtotalInPaise: 100000, // 1000 INR
      discountInPaise: 0,
      sellerState: "Delhi",
      customerBillingState: "Maharashtra",
      taxRatePercent: 18,
      priceMode: "TAX_INCLUSIVE",
    });

    expect(result.isIntraState).toBe(false);
    expect(result.totalInPaise).toBe(100000);
    expect(result.cgstInPaise).toBe(0);
    expect(result.sgstInPaise).toBe(0);
    expect(result.igstInPaise).toBe(result.taxTotalInPaise);
    // 100000 / 1.18 = 84746 paise
    expect(result.taxableValueInPaise).toBe(84746);
    expect(result.taxTotalInPaise).toBe(15254);
  });

  it("applies discounts before computing tax", () => {
    const result = calculateTaxAndTotal({
      subtotalInPaise: 100000,
      discountInPaise: 20000, // 200 INR coupon
      sellerState: "Delhi",
      customerBillingState: "Delhi",
      taxRatePercent: 18,
      priceMode: "TAX_INCLUSIVE",
    });

    expect(result.totalInPaise).toBe(80000);
    expect(result.taxableValueInPaise + result.taxTotalInPaise).toBe(80000);
  });

  it("computes TAX_EXCLUSIVE mode by adding tax forwards", () => {
    const result = calculateTaxAndTotal({
      subtotalInPaise: 100000, // 1000 INR taxable
      discountInPaise: 0,
      sellerState: "Delhi",
      customerBillingState: "Haryana",
      taxRatePercent: 18,
      priceMode: "TAX_EXCLUSIVE",
    });

    expect(result.taxableValueInPaise).toBe(100000);
    expect(result.taxTotalInPaise).toBe(18000); // 180 INR
    expect(result.totalInPaise).toBe(118000); // 1180 INR total
    expect(result.igstInPaise).toBe(18000);
  });
});
