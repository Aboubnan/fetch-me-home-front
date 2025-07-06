import { z } from "zod";

// Definition du schema de validation pour la création d'une association
export const petCreateSchema = z.object({
    name: z.string({message: "Le nom doit être une chaîne de caractères"}).nonempty({message: "Le nom ne peut être vide"}),
    birthdate: z.string({message: "La date doit être renseignée"}).date("La date doit être du format AAAA-MM-JJ (ex: 2025-04-30)"), // prop message directement dans la fonction date donc on ne le met pas commme les autres !
    sex: z.enum(['Male', 'Femelle'], {message: "Le sexe doit être 'Male' ou 'Femelle'"}),
    description: z.string({message: "La description doit être une chaîne de caractères"}).nonempty("La description ne peut être vide").min(30, {message: "La description doit avoir une longueur minimale de 30 caractères"}).max(250, {message: "La description doit avoir une longueur maximale de 250 caractères"}),
    is_available: z.boolean({message: "La disponibilité doit être un booléen"}),
    association_id: z.number({message: "L'id association doit être un nombre"}).positive({message: "L'id association doit être positif"}),
    species_id: z.number({message: "L'id espèce doit être un nombre"}).positive({message: "L'id espèce species doit être positif"})
});

// Definition du schema de validation pour la mise à jour d'un pet
export const petUpdateSchema = z.object({
    name: z.string({message: "Le nom doit être une chaîne de caractères"}).nonempty({message: "Le nom ne peut être vide"}),
    birthdate: z.string({message: "La date doit être renseignée"}).date("La date doit être du format AAAA-MM-JJ (ex: 2025-04-30)"), // prop message directement dans la fonction date donc on ne le met pas commme les autres !
    sex: z.enum(['Male', 'Femelle'], {message: "Le sexe doit être 'Male' ou 'Femelle'"}),
    description: z.string({message: "La description doit être une chaîne de caractères"}).nonempty("La description ne peut être vide").min(30, {message: "La description doit avoir une longueur minimale de 30 caractères"}).max(250, {message: "La description doit avoir une longueur maximale de 250 caractères"}),
    is_available: z.boolean({message: "La disponibilité doit être un booléen"}),
    association_id: z.number({message: "L'id association doit être un nombre"}).positive({message: "L'id association doit être positif"}),
    species_id: z.number({message: "L'id espèce doit être un nombre"}).positive({message: "L'id espèce species doit être positif"})
});
  