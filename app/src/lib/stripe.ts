import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  // In dev without keys we still let the module load so build works.
  // The checkout route will return a 500 if it's actually called.
  console.warn("STRIPE_SECRET_KEY is not set — checkout will fail until it is.");
}

export const stripe = new Stripe(key ?? "sk_test_placeholder", {
  apiVersion: "2025-09-30.clover",
});
