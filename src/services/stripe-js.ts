import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

export const getStripeJs = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);
  }
  return stripePromise;
};
