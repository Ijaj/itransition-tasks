// import { faker } from '@faker-js/faker';
import { faker as fakerMx } from '@faker-js/faker/locale/es_MX';
import { faker as fakerGb } from '@faker-js/faker/locale/en_GB';
import { faker as fakerRu } from '@faker-js/faker/locale/ru';
import { faker as fakerEn } from '@faker-js/faker/locale/en_US';

function getRandomPos(length){
  return Math.floor(Math.random() * length);
}

function addNewChar(text){
  const i = getRandomPos(text.length);
  const startPoint = Math.random() * 10 < 5 ? 65 : 97;
  const char = String.fromCharCode(startPoint + Math.floor(Math.random() * 26));
  return text.slice(0, i) + char + text.slice(i);
}

function removeChar(text){
  if(text.length === 0){
    return text;
  }

  const i = getRandomPos(text.length);
  return text.slice(0, i) + text.slice(i + 1);
}

function shuffleChar(text){
  if(text.length < 2){
    return text;
  }
  
  const halfIndex = Math.round(text.length * .5) - 1;
  const i1 = getRandomPos(halfIndex);
  const i2 = halfIndex + 1 + getRandomPos(halfIndex);

  let charArray = text.split('');
  charArray[i1] = text[i2];
  charArray[i2] = text[i1];

  return charArray.join('');
}

const errorfunctions = [addNewChar, removeChar, shuffleChar];

const simulateError = (text, errorCount) => {
  // change later
  for (let i = 0; i < errorCount; i++) {
    const rndIndex = Math.floor(Math.random() * errorfunctions.length);
    text = errorfunctions[rndIndex](text);
  }
  return text;
};

const generateUser = (errorRate, fakerInstance) => {
  const name = `${fakerInstance.person.firstName()} ${fakerInstance.person.lastName()}`;
  const address = `${fakerInstance.location.streetAddress()}, ${fakerInstance.location.city()}, ${fakerInstance.location.zipCode()}`;
  const phone = fakerInstance.phone.number();

  const errorCount = Math.floor(Math.random() * errorRate);

  return {
    id: fakerEn.string.uuid(),
    name: simulateError(name, errorCount),
    address: simulateError(address, errorCount),
    phone: simulateError(phone, errorCount),
  };
};

export function generateUsers (region, errorRate, seed, count, startIndex = 0) {
  let faker;
  switch (region) {
    case 'mexico':
      faker = fakerMx;
      break;
    case 'uk':
      faker = fakerGb;
      break;
    case 'russia':
      faker = fakerRu;
      break;
    default:
      faker = fakerEn;
  }
  faker.seed(seed + startIndex);
  return Array.from({ length: count }, () => generateUser(errorRate, faker));
};