"use server";

import { supabase } from "@/app/lib/supabase";

export interface LeadFormState {
  success: boolean;
  message: string;
  errors?: {
    name?: string;
    email?: string;
    details?: string;
  };
}

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const company = (formData.get("company") as string)?.trim() || null;
  const details = (formData.get("details") as string)?.trim();

  // ── Server-side validation ──────────────────────────
  const errors: LeadFormState["errors"] = {};

  if (!name || name.length < 2) {
    errors.name = "Name is required (min 2 characters).";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!details || details.length < 10) {
    errors.details = "Please describe your project (min 10 characters).";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors,
    };
  }

  // ── Insert into Supabase ────────────────────────────
  try {
    const { error } = await supabase.from("leads").insert([
      {
        name,
        email,
        company,
        details,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return {
        success: false,
        message: "Something went wrong. Please try again later.",
      };
    }

    return {
      success: true,
      message: "Thank you! We'll be in touch within 24 hours.",
    };
  } catch (err) {
    console.error("Unexpected error:", err);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
