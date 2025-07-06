import { z } from "zod";

export const contactSchema = z.object({
  lastname: z.string().nonempty({ message: "Le nom est requis" }),
  firstname: z.string().nonempty({ message: "Le prénom est requis" }),
  mail: z.string({ message: "L'email doit être une chaine de caractères" }).nonempty({ message: "L'email est requis" }).email({ message: "L'email est invalide" }),
  subject: z.string().nonempty({ message: "Le sujet est requis" }),
  message: z.string().nonempty({ message: "Le message est requis" }).min(10, { message: "Le message doit faire au moins 10 caractères" }),
  role: z.enum(["visitor", "user", "association"], { message: "Veuillez sélectionner un rôle (visiteur, bénévole, association)" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
