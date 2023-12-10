export interface Duck {
    name: string;
    numLegs: number;
    makeSound: (sound: string) => void;
}

//using let to declare a variable with specific types
//let data: number | string = 42
//data = '42'
//console.log(data)


const duck1 : Duck = {
    name: 'huey',
    numLegs: 2,
    makeSound: (sound: string) => console.log(sound) //note you should specify the type for sound param 'any' type is not allowed   
}

const duck2: Duck = {
    name: 'duey',
    numLegs: 2,
    makeSound: (sound: string) => console.log(sound)//note you should specify the type for sound param 'any' type is not allowed   
}

duck1.makeSound('quack')
duck2.makeSound('sound')
//duck1.name = '1'; //shold be a string not number type

export const ducks = [duck1, duck2]


