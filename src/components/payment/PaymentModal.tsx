import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Building2, Bitcoin, Copy, CheckCircle, QrCode } from "lucide-react";
import { Deal } from "@/components/deals/DealCard";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deal: Deal;
}

type PaymentMethod = "bank" | "crypto" | null;

export function PaymentModal({ open, onOpenChange, deal }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [investmentAmount, setInvestmentAmount] = useState(deal.minInvestment.toString());
  const [copied, setCopied] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const bankDetails = {
    bankName: "TOTO Finance Holdings Ltd",
    accountNumber: "1234567890",
    routingNumber: "021000021",
    reference: `INV-${deal.id}-${Date.now().toString(36).toUpperCase()}`,
  };

  const cryptoDetails = {
    btcAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    ethAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    usdtAddress: "TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-light">Invest in {deal.title}</DialogTitle>
          <DialogDescription>
            Choose your preferred payment method
          </DialogDescription>
        </DialogHeader>

        {/* Investment Amount */}
        <div className="space-y-2">
          <Label htmlFor="amount">Investment Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="amount"
              type="number"
              className="pl-7"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              min={deal.minInvestment}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Minimum: {formatCurrency(deal.minInvestment)}
          </p>
        </div>

        <Separator />

        {/* Payment Method Selection */}
        {!selectedMethod && (
          <div className="grid grid-cols-2 gap-4 animate-fade-in">
            <Card
              className="cursor-pointer hover:border-primary hover:shadow-gold transition-all"
              onClick={() => setSelectedMethod("bank")}
            >
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Bank Transfer</h3>
                  <p className="text-xs text-muted-foreground">Wire or ACH transfer</p>
                </div>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:border-primary hover:shadow-gold transition-all"
              onClick={() => setSelectedMethod("crypto")}
            >
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto">
                  <Bitcoin className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium">Cryptocurrency</h3>
                  <p className="text-xs text-muted-foreground">BTC, ETH, USDT</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Bank Transfer Details */}
        {selectedMethod === "bank" && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="font-medium flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                Bank Transfer Details
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedMethod(null)}>
                Change
              </Button>
            </div>

            <div className="space-y-3 bg-muted/50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-muted-foreground">Bank Name</p>
                  <p className="font-medium">{bankDetails.bankName}</p>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-muted-foreground">Account Number</p>
                  <p className="font-medium font-mono">{bankDetails.accountNumber}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(bankDetails.accountNumber)}
                >
                  {copied ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-muted-foreground">Routing Number</p>
                  <p className="font-medium font-mono">{bankDetails.routingNumber}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(bankDetails.routingNumber)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-muted-foreground">Reference Number (Required)</p>
                  <p className="font-medium font-mono text-primary">{bankDetails.reference}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(bankDetails.reference)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm">
              <p className="font-medium text-primary mb-2">Important Instructions:</p>
              <ul className="space-y-1 text-muted-foreground text-xs">
                <li>• Include the reference number in your transfer</li>
                <li>• Transfer amount: {formatCurrency(parseInt(investmentAmount))}</li>
                <li>• Processing time: 1-3 business days</li>
                <li>• You'll receive confirmation via email</li>
              </ul>
            </div>
          </div>
        )}

        {/* Crypto Payment Details */}
        {selectedMethod === "crypto" && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="font-medium flex items-center gap-2">
                <Bitcoin className="h-5 w-5 text-orange-600" />
                Crypto Payment
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedMethod(null)}>
                Change
              </Button>
            </div>

            {/* QR Code Placeholder */}
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                <QrCode className="h-16 w-16 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: "Bitcoin (BTC)", address: cryptoDetails.btcAddress },
                { label: "Ethereum (ETH)", address: cryptoDetails.ethAddress },
                { label: "Tether (USDT-TRC20)", address: cryptoDetails.usdtAddress },
              ].map((crypto) => (
                <div key={crypto.label} className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">{crypto.label}</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-mono text-xs truncate">{crypto.address}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0"
                      onClick={() => handleCopy(crypto.address)}
                    >
                      {copied ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm">
              <p className="font-medium text-primary mb-2">Payment Amount:</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>≈ 0.0425 BTC</p>
                <p>≈ 1.25 ETH</p>
                <p>≈ {parseInt(investmentAmount).toLocaleString()} USDT</p>
              </div>
            </div>
          </div>
        )}

        {/* Confirm Button */}
        {selectedMethod && (
          <Button
            onClick={() => {
              onOpenChange(false);
              setSelectedMethod(null);
            }}
            className="w-full bg-primary text-primary-foreground hover:bg-gold-light hover:shadow-gold"
          >
            I've Made the Payment
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
