import { getAgeFromBirthdate, mapApiAnimal } from './animalUtils';

const fakeApiAnimal = {
  id: 1,
  name: 'Rex',
  birthdate: '2020-01-01',
  sex: 'Male',
  species: { name: 'Chien' },
  association: { name: 'Lyon' },
  pictures: [{ url: '/src/assets/border-collie.jpg' }],
};

console.log(mapApiAnimal(fakeApiAnimal));
console.log(getAgeFromBirthdate(fakeApiAnimal.birthdate));