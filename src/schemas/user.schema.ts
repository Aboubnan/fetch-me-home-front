import { z } from "zod";

// Definition du schema de validation pour la création d'un user
/*export const userCreateSchema = z.object({
    email: z.string({message: "L'email doit être une chaîne de caractères"}).nonempty({message: "L'email ne peut pas être vide"}).email({message: "L'email doit avoir un format correct"}),
    first_name: z.string({message: "Le prénom doit être une chaîne de caractères"}).nonempty({message: "Le prénom ne peut être vide"}),
    last_name: z.string({message: "Le nom doit être une chaîne de caractères"}).nonempty({message: "Le nom ne peut être vide"}),
    password: z.string({message: "Le mot de passe doit être une chaîne de caractères"}).nonempty({message: "Le mot de passe ne peut pas être vide"}).min(6, {message: "Le mot de passe doit avoir une longueur minimale de 6 caractères"}).max(20, {message: "Le mot de passe doit avoir une longueur maximale de 20 caractères"}).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[+=\[#\]?!@$%^&*\)\(-]).{4,}$/, {message: "Le mot de passe doit contenir au minimum 1 minuscule, 1 majuscule, 1 chiffre et un caractère spécial parmi +=#[]?!@$%^&*()-]"}),
    address: z.string({message: "L'adresse doit être une chaîne de caractères"}).nonempty({message: "L'adresse ne peut pas être vide"}),
    zip_code: z.string({message: "Le code postal doit être une chaîne de caractères"}).nonempty({message: "Le code postal ne peut pas être vide"}).length(5,{message: "Le code postal doit être composé de 5 chiffres (ex: 01310)"}),
    city: z.string({message: "La ville doit être une chaîne de caractères"}).nonempty({message: "La ville ne peut pas être vide"}),
    phone_number: z.string({message: "Le téléphone doit être une chaîne de caractères"}).nonempty({message: "Le téléphone ne peut pas être vide"}).length(10, {message: "Le téléphone doit être composé de 10 chiffres (ex: 0478652857)"}),
    is_admin: z.boolean({message: "isAdmin doit être un booléen"}) 
});*/

// Definition du schema de validation pour la mise à jour d'un user
/*export const userUpdateSchema = z.object({
    email: z.string({message: "L'email doit être une chaîne de caractères"}).nonempty({message: "L'email ne peut pas être vide"}).email({message: "L'email doit avoir un format correct"}),
    first_name: z.string({message: "Le prénom doit être une chaîne de caractères"}).nonempty({message: "Le prénom ne peut être vide"}),
    last_name: z.string({message: "Le nom doit être une chaîne de caractères"}).nonempty({message: "Le nom ne peut être vide"}),
    password: z.string({message: "Le mot de passe doit être une chaîne de caractères"}).nonempty({message: "Le mot de passe ne peut pas être vide"}).min(6, {message: "Le mot de passe doit avoir une longueur minimale de 6 caractères"}).max(20, {message: "Le mot de passe doit avoir une longueur maximale de 20 caractères"}).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[+=\[#\]?!@$%^&*\)\(-]).{4,}$/, {message: "Le mot de passe doit contenir au minimum 1 minuscule, 1 majuscule, 1 chiffre et un caractère spécial parmi +=#[]?!@$%^&*()-]"}),
    address: z.string({message: "L'adresse doit être une chaîne de caractères"}).nonempty({message: "L'adresse ne peut pas être vide"}),
    zip_code: z.string({message: "Le code postal doit être une chaîne de caractères"}).nonempty({message: "Le code postal ne peut pas être vide"}).length(5,{message: "Le code postal doit être composé de 5 chiffres (ex: 01310)"}),
    city: z.string({message: "La ville doit être une chaîne de caractères"}).nonempty({message: "La ville ne peut pas être vide"}),
    phone_number: z.string({message: "Le téléphone doit être une chaîne de caractères"}).nonempty({message: "Le téléphone ne peut pas être vide"}).length(10, {message: "Le téléphone doit être composé de 10 chiffres (ex: 0478652857)"}),
    is_admin: z.boolean({message: "isAdmin doit être un booléen"}) 
});*/


// Definition du schema de validation pour la création d'un user
export const userCreateSchema = z.object({
  email: z.string({message: "L'email doit être une chaîne de caractères"}).nonempty({message: "L'email ne peut pas être vide"}).email({message: "L'email doit avoir un format correct"}),
  first_name: z.string({message: "Le prénom doit être une chaîne de caractères"}).nonempty({message: "Le prénom ne peut être vide"}),
  last_name: z.string({message: "Le nom doit être une chaîne de caractères"}).nonempty({message: "Le nom ne peut être vide"}),
  password: z.string({message: "Le mot de passe doit être une chaîne de caractères"}).nonempty({message: "Le mot de passe ne peut pas être vide"}).min(6, {message: "Le mot de passe doit avoir une longueur minimale de 6 caractères"}).max(20, {message: "Le mot de passe doit avoir une longueur maximale de 20 caractères"}).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[+=#\[\]?!@$%^&*()\-]).{4,}$/, {message: "Le mot de passe doit contenir au minimum 1 minuscule, 1 majuscule, 1 chiffre et un caractère spécial parmi +=#[]?!@$%^&*()-]"}),
  confirmPassword: z.string(),
  address: z.string({message: "L'adresse doit être une chaîne de caractères"}).nonempty({message: "L'adresse ne peut pas être vide"}),
  zip_code: z.string({message: "Le code postal doit être une chaîne de caractères"}).nonempty({message: "Le code postal ne peut pas être vide"}).length(5, {message: "Le code postal doit être composé de 5 chiffres (ex: 01310)"}),
  city: z.string({message: "La ville doit être une chaîne de caractères"}).nonempty({message: "La ville ne peut pas être vide"}),
  phone_number: z.string({message: "Le téléphone doit être une chaîne de caractères"}).nonempty({message: "Le téléphone ne peut pas être vide"}).length(10, {message: "Le téléphone doit être composé de 10 chiffres (ex: 0478652857)"}),
  is_admin: z.boolean({message: "isAdmin doit être un booléen"}).catch(false).transform(val => Boolean(val)),// catch(false) et transform(val => Boolean(val)) permet de garantir le type boolean
}).refine((data) => data.password === data.confirmPassword, { // .refine permet d'ajouter une validation personnalisée sur le schéma 
  message: "Les mots de passe ne correspondent pas.",
  path: ["confirmPassword"],
});
// Export du type UserFormData
export type UserFormData = z.infer<typeof userCreateSchema>; 

// Definition du schema de validation pour la mise à jour d'un user
export const userUpdateSchema = z.object({
  email: z.string({message: "L'email doit être une chaîne de caractères"}).nonempty({message: "L'email ne peut pas être vide"}).email({message: "L'email doit avoir un format correct"}),
  first_name: z.string({message: "Le prénom doit être une chaîne de caractères"}).nonempty({message: "Le prénom ne peut être vide"}),
  last_name: z.string({message: "Le nom doit être une chaîne de caractères"}).nonempty({message: "Le nom ne peut être vide"}),
  password: z.string({message: "Le mot de passe doit être une chaîne de caractères"}).nonempty({message: "Le mot de passe ne peut pas être vide"}).min(6, {message: "Le mot de passe doit avoir une longueur minimale de 6 caractères"}).max(20, {message: "Le mot de passe doit avoir une longueur maximale de 20 caractères"}).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[+=#\[\]?!@$%^&*()\-]).{4,}$/, {message: "Le mot de passe doit contenir au minimum 1 minuscule, 1 majuscule, 1 chiffre et un caractère spécial parmi +=#[]?!@$%^&*()-]"}),
  confirmPassword: z.string(),
  address: z.string({message: "L'adresse doit être une chaîne de caractères"}).nonempty({message: "L'adresse ne peut pas être vide"}),
  zip_code: z.string({message: "Le code postal doit être une chaîne de caractères"}).nonempty({message: "Le code postal ne peut pas être vide"}).length(5,{message: "Le code postal doit être composé de 5 chiffres (ex: 01310)"}),
  city: z.string({message: "La ville doit être une chaîne de caractères"}).nonempty({message: "La ville ne peut pas être vide"}),
  phone_number: z.string({message: "Le téléphone doit être une chaîne de caractères"}).nonempty({message: "Le téléphone ne peut pas être vide"}).length(10, {message: "Le téléphone doit être composé de 10 chiffres (ex: 0478652857)"}),
  is_admin: z.boolean({message: "isAdmin doit être un booléen"}) 
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas.",
  path: ["confirmPassword"],
});

export type UserUpdateFormData = z.infer<typeof userUpdateSchema>;