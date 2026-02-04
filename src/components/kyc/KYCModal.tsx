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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Upload, User, CreditCard, FileCheck } from "lucide-react";

interface KYCModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

type KYCStep = 1 | 2 | 3;

export function KYCModal({ open, onOpenChange, onComplete }: KYCModalProps) {
  const [step, setStep] = useState<KYCStep>(1);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    phone: "",
    address: "",
    idType: "",
    idFrontUploaded: false,
    idBackUploaded: false,
    selfieUploaded: false,
  });

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => (prev + 1) as KYCStep);
    } else {
      onComplete();
      setStep(1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as KYCStep);
    }
  };

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Identity", icon: CreditCard },
    { number: 3, title: "Confirmation", icon: FileCheck },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-light">KYC Verification</DialogTitle>
          <DialogDescription>
            Complete verification to start investing
          </DialogDescription>
        </DialogHeader>

        {/* Progress */}
        <div className="space-y-4">
          <div className="flex justify-between">
            {steps.map((s) => (
              <div key={s.number} className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    step >= s.number
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > s.number ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <s.icon className="h-5 w-5" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{s.title}</span>
              </div>
            ))}
          </div>
          <Progress value={(step / 3) * 100} className="h-1" />
        </div>

        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Legal Name</Label>
              <Input
                id="fullName"
                placeholder="As shown on your ID"
                value={formData.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => updateField("dateOfBirth", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Street address, city, country"
                value={formData.address}
                onChange={(e) => updateField("address", e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Step 2: Identity Verification */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-2">
              <Label>ID Type</Label>
              <Select
                value={formData.idType}
                onValueChange={(value) => updateField("idType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select ID type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="drivers_license">Driver's License</SelectItem>
                  <SelectItem value="national_id">National ID</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Front of ID</Label>
              <div
                onClick={() => updateField("idFrontUploaded", true)}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  formData.idFrontUploaded
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-primary/50"
                }`}
              >
                {formData.idFrontUploaded ? (
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <CheckCircle className="h-5 w-5" />
                    <span>Uploaded successfully</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Upload className="h-8 w-8" />
                    <span>Click to upload front of ID</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Back of ID</Label>
              <div
                onClick={() => updateField("idBackUploaded", true)}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  formData.idBackUploaded
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-primary/50"
                }`}
              >
                {formData.idBackUploaded ? (
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <CheckCircle className="h-5 w-5" />
                    <span>Uploaded successfully</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Upload className="h-8 w-8" />
                    <span>Click to upload back of ID</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Selfie Verification</Label>
              <div
                onClick={() => updateField("selfieUploaded", true)}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  formData.selfieUploaded
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-primary/50"
                }`}
              >
                {formData.selfieUploaded ? (
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <CheckCircle className="h-5 w-5" />
                    <span>Uploaded successfully</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Upload className="h-8 w-8" />
                    <span>Take a selfie holding your ID</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Review Your Information</h3>
                <p className="text-sm text-muted-foreground">
                  Please confirm that all details are correct
                </p>
              </div>
            </div>

            <div className="space-y-3 bg-muted/50 rounded-lg p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Full Name</span>
                <span className="font-medium">{formData.fullName || "Steven Gaertner"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date of Birth</span>
                <span className="font-medium">{formData.dateOfBirth || "1990-01-15"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Phone</span>
                <span className="font-medium">{formData.phone || "+1 (555) 123-4567"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">ID Type</span>
                <span className="font-medium capitalize">{formData.idType?.replace("_", " ") || "Passport"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Documents</span>
                <span className="font-medium text-primary">3 uploaded</span>
              </div>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              By submitting, you confirm that all information is accurate and agree to our verification terms.
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            className="bg-primary text-primary-foreground hover:bg-gold-light"
          >
            {step === 3 ? "Submit Verification" : "Continue"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
