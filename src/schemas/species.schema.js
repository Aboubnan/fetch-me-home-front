import { z } from "zod";

export const speciesCreateSchema = z.object({
    name: z.string({message:"Le nom doit être une chaîne de caractères"}).nonempty({message: "L'espèce ne peut pas être vide"}).min(3, {message:"Le nom doit avoir au moins 3 caractères"}).max(20, min(3, {message:"Le nom doit avoir au max 20 caractères"}))
});

export const speciesUpdateSchema = z.object({
    name: z.string({message:"Le nom doit être une chaîne de caractères"}).nonempty({message: "L'espèce ne peut pas être vide"}).min(3, {message:"Le nom doit avoir au moins 3 caractères"}).max(20, min(3, {message:"Le nom doit avoir au max 20 caractères"}))
});
  