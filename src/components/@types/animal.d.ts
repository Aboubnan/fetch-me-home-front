// export interface Animal {
//     id: number;
//     name: string;
//     race: string;
//     age: string;
//     location: string;
//     gender: '♂' | '♀';
//     img: string;
//     description: string;
//   } 

export interface Picture {
  id: number;
  url: string;
}

export interface Animal {
  id: number;
  name: string;
  race: string;
  age: string;
  location: string;
  gender: '♂' | '♀';
  description: string;
  pictures: Picture[]; // ✅ tableau d’images
  species?: {
    name: string;
  };
  association?: {
    name: string;
  };
}