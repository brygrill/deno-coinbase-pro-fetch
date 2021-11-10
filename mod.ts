import { config } from './deps.ts';

console.log('hi');
const jsonResponse = await fetch('https://api.github.com/users/denoland');
const jsonData = await jsonResponse.json();
console.log(jsonData);

const { GREETING } = config({ safe: true });

console.log(GREETING);
