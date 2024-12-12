"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CreditCard, MapPin, Truck } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    pincode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Order placed successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to process payment");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!session?.user) {
    router.push("/login");
    return null;
  }

  return (
    <div
      className="min-h-screen py-12 px-4"
      style={{ backgroundColor: session.user.team.colors.secondary }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <Input
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    required
                  />
                  <Input
                    placeholder="PIN Code"
                    value={formData.pincode}
                    onChange={(e) =>
                      setFormData({ ...formData, pincode: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Details
              </h2>
              <div className="space-y-4">
                <Input
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, cardNumber: e.target.value })
                  }
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={(e) =>
                      setFormData({ ...formData, expiryDate: e.target.value })
                    }
                    required
                  />
                  <Input
                    placeholder="CVV"
                    type="password"
                    maxLength={3}
                    value={formData.cvv}
                    onChange={(e) =>
                      setFormData({ ...formData, cvv: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span>Subtotal</span>
                  <span>₹2,499</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Shipping</span>
                  <span>₹99</span>
                </div>
                <div className="flex justify-between py-2 font-semibold">
                  <span>Total</span>
                  <span>₹2,598</span>
                </div>

                <Button
                  className="w-full mt-6"
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  style={{
                    backgroundColor: session.user.team.colors.primary,
                    color: "#fff",
                  }}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>

                <p className="text-sm text-gray-500 text-center mt-4">
                  By placing this order, you agree to our Terms of Service and
                  Privacy Policy
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
