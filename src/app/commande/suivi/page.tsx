import { OrderTracking } from "@/components/OrderTracking";

export const metadata = { title: "Suivi de commande" };

export default function OrderTrackingPage() {
  return (
    <div className="py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl lg:text-4xl text-charcoal mb-2">
            Suivi de commande
          </h1>
          <p className="text-charcoal-light text-sm">
            Entrez votre numéro de commande et votre email
          </p>
        </div>
        <OrderTracking />
      </div>
    </div>
  );
}
