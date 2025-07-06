import { z } from "zod";

// Schéma de validation pour la création d'une association
export const associationCreateSchema = z.object({
  email: z.string({message: "L'email doit être une chaine de caractères"}).nonempty({message: "L'email ne peut pas être vide"}).email({message: "L'email n'a pas le bon format"}),
  name: z.string({message: "Le nom doit être une chaîne de caractères"}).nonempty({message: "Le nom ne peut pas être vide"}),
  password: z.string({message: "Le mot de passe doit être une chaîne de caractères"}).nonempty({message: "Le mot de passe ne peut pas être vide"}).min(6, {message: "Le mot de passe doit contenir au moins 6 caractères"}).max(20, {message: "Le mot de passe doit avoir 20 caractères maximum"}).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[+=#\[\]?!@$%^&*()\-]).{4,}$/, {message: "Le mot de passe doit contenir au minimum 1 minuscule, 1 majuscule, 1 chiffre et un caractère spécial parmi +=#[]?!@$%^&*()-]"}),
  confirmPassword: z.string(),
  address: z.string({message: "L'addresse doit être une chaine de caractères"}).nonempty({message: "L'addresse ne peut pas être vide"}),
  zip_code: z.string({message: "Le code postal doit être une chaine de caractères"}).nonempty({message: "Le code postal ne peut pas être vide"}).length(5, {message: "Le code postal doit contenir 5 chiffres (ex: 01310, 33100, 75000...)"}),
  city: z.string({message: "La ville doit être une chaîne de caractères"}).nonempty({message: "La ville ne peut pas être vide"}),
  phone_number: z.string({message: "Le téléphone doit être une chaîne de caractères"}).nonempty({message: "Le téléphone ne peut pas être vide"}).length(10, {message: "Le téléphone doit être de 10 chiffres (ex: 0478652857)"}),
  description: z.string({message: "La description doit être une chaîne de caractères"}).min(30, {message: "Description de 30 caractères minimum"}).max(250, {message: "Description de 250 caractères maximum"}),
  logo: z.string({message: "Le logo doit être une chaîne de caractères"}).nonempty({message: "Le logo ne peut pas être vide"}),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas.",
  path: ["confirmPassword"],
});

// export du type AssociationFormData
export type AssociationFormData = z.infer<typeof associationCreateSchema>; 

// Schéma de validation pour la mise à jour d'une association
export const associationUpdateSchema = z.object({
    email: z.string({message: "L'email doit être une chaine de caractères"}).nonempty({message: "L'email ne peut pas être vide"}).email({message: "L'email n'a pas le bon format"}),
    name: z.string({message: "Le nom doit être une chaîne de caractères"}).nonempty({message: "Le nom ne peut pas être vide"}),
    password: z.string({message: "Le mot de passe doit être une chaîne de caractères"}).nonempty({message: "Le mot de passe ne peut pas être vide"}).min(6, {message: "Le mot de passe doit contenir au moins 6 caractères"}).max(20, {message: "Le mot de passe doit avoir 20 caractères maximum"}).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[+=#\[\]?!@$%^&*()\-]).{4,}$/, {message: "Le mot de passe doit contenir au minimum 1 minuscule, 1 majuscule, 1 chiffre et un caractère spécial parmi +=#[]?!@$%^&*()-]"}),
    confirmPassword: z.string(),
    address: z.string({message: "L'addresse doit être une chaine de caractères"}).nonempty({message: "L'addresse ne peut pas être vide"}),
    zip_code: z.string({message: "Le code postal doit être une chaine de caractères"}).nonempty({message: "Le code postal ne peut pas être vide"}).length(5,{message: "Le code postal doit contenir 5 chiffres (ex: 01310, 33100, 75000...)"}),
    city: z.string({message: "La ville doit être une chaîne de caractères"}).nonempty({message: "La ville ne peut pas être vide"}),
    phone_number: z.string({message: "Le téléphone doit être une chaîne de caractères"}).nonempty({message: "Le téléphone ne peut pas être vide"}).length(10, {message: "Le téléphone doit être de 10 chiffres (ex: 0478652857)"}),
    description: z.string({message: "La description doit être une chaîne de caractères"}).min(30, {message: "La description doit avoir une longueur minimale de 30 caractères"}).max(250, {message: "La description doit avoir une longueur maximale de 250 caractères"}).trim(),
    logo: z.string({message: "Le logo doit être une chaine de caractères"}).nonempty({message: "Le logo ne peut être vide"})
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });
  
  export type AssociationUpdateFormData = z.infer<typeof associationUpdateSchema>;