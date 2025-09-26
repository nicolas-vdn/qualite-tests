"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, User, Mail, Lock, CheckCircle } from "lucide-react";

interface FormData {
  username: string;
  email: string;
  password: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
}

export function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    // Validation du username
    if (!formData.username.trim()) {
      newErrors.username = "Le username est requis";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Le username doit contenir au moins 3 caractères";
    }

    // Validation de l'email
    if (!formData.email.trim()) {
      newErrors.email = "L'adresse email est requise";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Veuillez entrer une adresse email valide";
    }

    // Validation du mot de passe
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 8 caractères";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre";
    }

    return newErrors;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);

      // Simulation d'une soumission
      setTimeout(() => {
        console.log("Données du formulaire:", formData);
        setShowSuccessModal(true);
        setIsSubmitting(false);

        // Réinitialiser le formulaire
        setFormData({ username: "", email: "", password: "" });
      }, 1500);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-2 text-center pb-8">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <User className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-balance">
              Créer un compte
            </CardTitle>
            <CardDescription className="text-muted-foreground text-pretty">
              Rejoignez-nous en quelques étapes simples
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Champ username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Votre username"
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    className={`pl-10 h-12 ${
                      errors.username
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }`}
                  />
                </div>
                {errors.username && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.username}</span>
                  </div>
                )}
              </div>

              {/* Champ email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Adresse email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="text"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`pl-10 h-12 ${
                      errors.email
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }`}
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              {/* Champ mot de passe */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Mot de passe
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Votre mot de passe"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className={`pl-10 h-12 ${
                      errors.password
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }`}
                  />
                </div>
                {errors.password && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.password}</span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Au moins 8 caractères avec majuscule, minuscule et chiffre
                </p>
              </div>

              {/* Bouton de soumission */}
              <Button
                type="submit"
                className="w-full h-12 text-base font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Création en cours...
                  </div>
                ) : (
                  "Créer mon compte"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-xl font-bold text-green-800">
              Inscription réussie !
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">
              Votre compte a été créé avec succès. Vous pouvez maintenant vous
              connecter avec vos identifiants.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-6">
            <Button onClick={() => setShowSuccessModal(false)} className="px-8">
              Parfait !
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
