import { z } from "zod";

export const pictureCreateSchema = z.object({
    url: z.string({message: "L'url doit être une chaîne de caractères"}).nonempty({message: "L'url ne peut être vide"}),  // à modifier quand ce sera un fichier !!!
    pet_id: z.number({message: "L'id animal doit être un nombre"}).positive({message: "L'id animal doit être positif"})
})

export const pictureUpdateSchema = z.object({
    url: z.string({message: "L'url doit être une chaîne de caractères"}).nonempty({message: "L'url ne peut être vide"}),
    pet_id: z.number({message: "L'id animal doit être un nombre"}).positive({message: "L'id animal doit être positif"})
})
