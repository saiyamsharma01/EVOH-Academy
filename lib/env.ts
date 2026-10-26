import { z } from "zod";

// Automatically load local .env file if DATABASE_URL is not yet populated
if (!process.env.DATABASE_URL && typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile();
  } catch {
    // Ignore in production/Vercel where env variables are provided by the platform
  }
}

const envSchema = z.object({
  // Fallback to placeholder so static page collection during 'next build' doesn't crash on Vercel/CI
  DATABASE_URL: z
    .string()
    .default(
      process.env.DATABASE_URL ||
        "postgresql://postgres:placeholder@localhost:5432/postgres"
    ),
  DIRECT_URL: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().default("http://localhost:3000"),

  // Supabase Auth & Storage
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .default(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
    ),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .default(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder_anon_key"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  SUPABASE_STORAGE_BUCKET_PRIVATE: z.string().default("evoh-private-notes"),
  SUPABASE_STORAGE_BUCKET_PUBLIC: z.string().default("evoh-public-assets"),

  // Razorpay Payments
  NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string().default("rzp_test_placeholder"),
  RAZORPAY_KEY_ID: z.string().default("rzp_test_placeholder"),
  RAZORPAY_KEY_SECRET: z.string().optional(),
  RAZORPAY_WEBHOOK_SECRET: z.string().optional(),
  PAYMENTS_MODE: z.enum(["test", "live"]).default("test"),

  // Email & Notifications
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().default("EVOH Academy <noreply@evohacademy.com>"),

  // Ops & Security
  SENTRY_DSN: z.string().optional(),
  ADMIN_BOOTSTRAP_TOKEN: z.string().default("evoh-bootstrap-dev-token"),
  CRON_SECRET: z.string().default("cron-secret-dev"),
  SIGNED_URL_TTL_SECONDS: z.coerce.number().default(60),

  // Optional Redis / Rate Limiting
  RATE_LIMIT_REDIS_URL: z.string().optional(),
  RATE_LIMIT_REDIS_TOKEN: z.string().optional(),

  // Cloudflare Turnstile
  TURNSTILE_SITE_KEY: z.string().optional(),
  TURNSTILE_SECRET: z.string().optional(),
});

export const env = envSchema.parse(process.env);
