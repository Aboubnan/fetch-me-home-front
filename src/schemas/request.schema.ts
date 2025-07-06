import { z } from "zod";

export const requestCreateSchema = z.object({
    // status: z.enum(["Nouveau", "En cours", "Accepté", "Refusé"], {message: "Le status doit être 'Nouveau', 'En cours', 'Accepté' ou 'Refusé'"}),
    request_text: z.string({message: "Le texte doit être une chaine de caractère"}).nonempty("Le texte ne peut être vide").min(30, {message: "Le texte doit être de 30 caractères min"}).max(250, {message: "Le texte doit être de 250 caractères max"}),
    starting_date: z.string({message: "La date de début doit être renseignée"}).date("La date de début doit être renseignée"),   
    ending_date: z.string({message: "La date de fin doit être renseignée"}).date("La date de fin doit être renseignée"),
    accept: z.boolean()   // pour gérer une valeur de la checkbox
    // user_id: z.number({message: "L'id bénévole doit être un nombre"}).positive({message: "L'id bénévole doit être positif"}),
    // pet_id: z.number({message: "L'id animal doit être un nombre"}).positive({message: "L'id animal doit être positif"}),
    // association_id: z.number({message: "L'id association doit être un nombre"}).positive({message: "L'id association doit être positif"})
})

export const requestUpdateSchema = z.object({
    status: z.enum(["Nouveau", "En cours", "Accepté", "Refusé"], {message: "Le status doit être 'Nouveau', 'En cours', 'Accepté' ou 'Refusé'"}),
    starting_date: z.string({message: "La date de début doit être renseignée"}).date("La date de début doit être de la forme AAAA-MM-JJ (ex: 2025-04-30)"),
    ending_date: z.string({message: "La date de fin doit être renseignée"}).date("La date de fin doit être de la forme AAAA-MM-JJ (ex: 2025-04-30)"),
    request_text: z.string({message: "Le texte doit être une chaine de caractère"}).nonempty("Le texte ne peut être vide").min(30, {message: "Le texte doit avoir une longueur minimale de 30 caractères"}).max(250, {message: "Le texte doit avoir une longueur maximale de 250 caractères"}),
    user_id: z.number({message: "L'id bénévole doit être un nombre"}).positive({message: "L'id bénévole doit être positif"}),
    pet_id: z.number({message: "L'id animal doit être un nombre"}).positive({message: "L'id animal doit être positif"}),
    association_id: z.number({message: "L'id association doit être un nombre"}).positive({message: "L'id association doit être positif"})
})
  