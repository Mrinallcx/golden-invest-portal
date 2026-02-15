import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Shield, User, Mail, Phone, MapPin, Edit2 } from "lucide-react";
import { KYCModal } from "@/components/kyc/KYCModal";

const Profile = () => {
  const [showKYC, setShowKYC] = useState(false);

  const userProfile = {
    name: "Steven Gaertner",
    email: "steven@totofinance.co",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, New York, NY 10001",
    kycStatus: "Verified",
    memberSince: "August 2024",
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
        <div>
          <h1 className="text-3xl font-light tracking-tight">Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your account settings</p>
        </div>

        {/* Profile Header */}
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="" alt={userProfile.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  SG
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-light">{userProfile.name}</h2>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {userProfile.kycStatus}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-1">
                  Member since {userProfile.memberSince}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Personal Information
            </CardTitle>
            <CardDescription>Your basic account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={userProfile.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" className="pl-10" defaultValue={userProfile.email} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="phone" className="pl-10" defaultValue={userProfile.phone} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="address" className="pl-10" defaultValue={userProfile.address} />
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button className="bg-cta text-cta-foreground hover:bg-cta/90">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* KYC Status */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              KYC Verification
            </CardTitle>
            <CardDescription>Your identity verification status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-green-800">Verification Complete</p>
                  <p className="text-sm text-green-600">
                    Your identity has been verified successfully
                  </p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">Verified</Badge>
            </div>

            <div className="mt-4">
              <Button
                className="bg-cta text-cta-foreground hover:bg-cta/90"
                onClick={() => setShowKYC(true)}
              >
                Check KYC
              </Button>
            </div>

            <Separator className="my-6" />

            <div className="space-y-3">
              <h4 className="font-medium">Verified Documents</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {["Passport", "Proof of Address", "Selfie Verification"].map((doc) => (
                  <div
                    key={doc}
                    className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg"
                  >
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Security</CardTitle>
            <CardDescription>Manage your password and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Password</p>
                <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
              </div>
              <Button variant="outline">Change Password</Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Button variant="outline">Enable 2FA</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <KYCModal
        open={showKYC}
        onOpenChange={setShowKYC}
        onComplete={() => setShowKYC(false)}
      />
    </DashboardLayout>
  );
};

export default Profile;
