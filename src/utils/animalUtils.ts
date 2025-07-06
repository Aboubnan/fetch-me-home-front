import type { Animal } from '../components/@types/animal';

export function getAgeFromBirthdate(birthdate: string): string {
    if (!birthdate) return '';
  const birth = new Date(birthdate);//On convertit la chaîne "2020-01-01" en un objet Date utilisable par JS.
  const now = new Date();
  const years = now.getFullYear() - birth.getFullYear();
  return years > 1 ? `${years} ans` : years === 1 ? `${years} an` : "Moins d'un an";
}
  
export function mapApiAnimal(apiAnimal: any): Animal {
  return {
    id: apiAnimal.id,
    name: apiAnimal.name,
    race: apiAnimal.species?.name || '',
    age: getAgeFromBirthdate(apiAnimal.birthdate),
    location: apiAnimal.association?.city || '',
    gender: apiAnimal.sex === 'Male' ? '♂' : '♀',
    description: apiAnimal.description || '',
    association: apiAnimal.association,  // pour avoir l'association !
    pictures: apiAnimal.pictures
  };
}