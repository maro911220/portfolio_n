export type SendStatus = "idle" | "loading" | "success" | "error";

export type FormField = {
  id: string;
  name: string;
  label: string;
  type: "text" | "email" | "textarea";
  placeholder: string;
  rows?: number;
};

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};
