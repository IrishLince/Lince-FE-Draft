import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "react-router-dom";
import ClientLayout from "@/components/ClientLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

const categoryLevels = [
  "Paintings",
  "Sculptures",
  "Photography",
  "Digital Art",
  "Prints",
  "Mixed Media",
  "Ceramics",
  "Textiles",
];

export default function SellerApplication() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: user?.email || "",
    phone: "",
    category: "",
    background: "",
    agreesToTerms: false,
  });

  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [backgroundValid, setBackgroundValid] = useState(true);
  const [categoryValid, setCategoryValid] = useState(true);

  const validateName = (name) => {
    return /^[A-Za-z\s]+$/.test(name);
  };

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/.test(email);
  };

  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstName") {
      setFirstNameValid(validateName(value));
    }
    if (name === "lastName") {
      setLastNameValid(validateName(value));
    }

    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 11) return;
    }

    if (name === "background") {
      if (countWords(value) > 200) {
        setBackgroundValid(false);
        toast.error("Background must not exceed 200 words.");
      } else {
        setBackgroundValid(true);
      }
    }

    if (name === "email") {
      setEmailValid(validateEmail(value));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNameBlur = (name: "firstName" | "lastName") => {
    if (!validateName(formData[name])) {
      if (name === "firstName") {
        setFirstNameValid(false);
        toast.error("First name must contain only letters.");
      } else {
        setLastNameValid(false);
        toast.error("Last name must contain only letters.");
      }
    } else {
      if (name === "firstName") setFirstNameValid(true);
      if (name === "lastName") setLastNameValid(true);
    }
  };

  const handlePhoneBlur = () => {
    if (!/^09\d{9}$/.test(formData.phone)) {
      setPhoneValid(false);
      toast.error("Phone number must be exactly 11 digits and start with 09");
    } else {
      setPhoneValid(true);
    }
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
    setCategoryValid(true);
  };

  const handleCheckboxChange = (checked: boolean) => {
    if (!emailValid) {
      toast.error("Please enter a valid email before agreeing to the terms.");
      return;
    }
    setFormData((prev) => ({ ...prev, agreesToTerms: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category) {
      setCategoryValid(false);
      toast.error("Please select a main product category.");
      return;
    }

    if (!emailValid) {
      toast.error("Please enter a valid email.");
      return;
    }

    if (!formData.agreesToTerms) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }

    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Show success dialog instead of navigating immediately
      setShowSuccessDialog(true);
      
      // Success toast notification
      toast.success("Application submitted successfully");
    } catch (error) {
      toast.error("Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseDialog = () => {
    setShowSuccessDialog(false);
    navigate("/");
  };

  return (
    <ClientLayout>
      <div className="container max-w-4xl py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4 text-[#5A3A31]">Become a Seller</h1>
          <div className="w-20 h-1 bg-[#AA8F66] mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Complete this form to apply as a seller on our platform.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Provide your contact details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} onBlur={() => handleNameBlur("firstName")} required />
                  {!firstNameValid && <p className="text-red-500 text-sm">First name must contain only letters.</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} onBlur={() => handleNameBlur("lastName")} required />
                  {!lastNameValid && <p className="text-red-500 text-sm">Last name must contain only letters.</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" name="username" value={formData.username} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                  {!emailValid && <p className="text-red-500 text-sm">Please input registered email.</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={handlePhoneBlur}
                    required
                    className={!phoneValid ? "border-red-500" : ""}
                  />
                  {!phoneValid && <p className="text-red-500 text-sm">Invalid phone number.</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
              <CardDescription>Share your art experience and background.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Main Product Category</Label>
                  <Select value={formData.category} onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select main selling product" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!categoryValid && <p className="text-red-500 text-sm">Please select a product category.</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="background">What interests you in becoming a seller?</Label>
                  <Textarea
                    id="background"
                    name="background"
                    value={formData.background}
                    onChange={handleInputChange}
                    placeholder="Tell us about your art background, achievements, and experience..."
                    className="min-h-[100px]"
                    required
                  />
                  {!backgroundValid && (
                    <p className="text-red-500 text-sm">Background must not exceed 200 words.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreesToTerms}
                  onCheckedChange={handleCheckboxChange}
                  disabled={!emailValid || !firstNameValid || !lastNameValid}
                />
                <Label htmlFor="terms">I agree to the terms and conditions</Label>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="bg-[#AA8F66] hover:bg-[#9A805D] text-white"
              size="lg" 
              disabled={
                isSubmitting ||
                !formData.firstName || 
                !formData.lastName || 
                !formData.username || 
                !formData.email || 
                !formData.phone || 
                !formData.category || 
                !formData.background || 
                !formData.agreesToTerms ||
                !firstNameValid || 
                !lastNameValid || 
                !emailValid || 
                !phoneValid || 
                !backgroundValid || 
                !categoryValid
              }
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center flex flex-col items-center gap-4 pb-2">
              <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </div>
              <span className="text-xl">Application Submitted!</span>
            </DialogTitle>
            <DialogDescription className="text-center pt-2 pb-4">
              <p className="mb-4">
                Thank you for applying to become a seller on our platform.
              </p>
              <div className="bg-amber-50 p-4 rounded-lg mb-4">
                <div className="flex items-center gap-2 text-amber-700 font-medium mb-2">
                  <Clock className="h-5 w-5" />
                  <span>Pending Admin Approval</span>
                </div>
                <p className="text-sm text-amber-600 text-left">
                  Your application is now being reviewed by our admin team. This process typically takes 1-3 business days. 
                  You'll receive an email notification once your application has been approved.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-blue-700 font-medium mb-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>What's Next?</span>
                </div>
                <ul className="text-sm text-blue-600 text-left list-disc pl-5 space-y-1">
                  <li>Our team will review your profile and seller information</li>
                  <li>You may be contacted for additional information if needed</li>
                  <li>Once approved, you'll gain access to seller features</li>
                  <li>You can check your application status in your profile</li>
                </ul>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              className="w-full bg-[#AA8F66] hover:bg-[#9A805D] text-white" 
              onClick={handleCloseDialog}
            >
              Got it, thanks!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ClientLayout>
  );
}