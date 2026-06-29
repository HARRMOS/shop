import { AccountDashboard } from "@/components/AccountDashboard";

export const metadata = { title: "Mon compte" };

export default function ComptePage() {
  return (
    <div className="py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AccountDashboard />
      </div>
    </div>
  );
}
