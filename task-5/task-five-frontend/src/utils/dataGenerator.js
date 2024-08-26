import { faker as fakerAF_ZA } from '@faker-js/faker/locale/af_ZA';
import { faker as fakerAR } from '@faker-js/faker/locale/ar';
import { faker as fakerAZ } from '@faker-js/faker/locale/az';
import { faker as fakerBASE } from '@faker-js/faker/locale/base';
import { faker as fakerCS_CZ } from '@faker-js/faker/locale/cs_CZ';
import { faker as fakerDA } from '@faker-js/faker/locale/da';
import { faker as fakerDE } from '@faker-js/faker/locale/de';
import { faker as fakerDE_AT } from '@faker-js/faker/locale/de_AT';
import { faker as fakerDE_CH } from '@faker-js/faker/locale/de_CH';
import { faker as fakerDV } from '@faker-js/faker/locale/dv';
import { faker as fakerEL } from '@faker-js/faker/locale/el';
import { faker as fakerEN } from '@faker-js/faker/locale/en';
import { faker as fakerEN_AU } from '@faker-js/faker/locale/en_AU';
import { faker as fakerEN_AU_ocker } from '@faker-js/faker/locale/en_AU_ocker';
import { faker as fakerEN_BORK } from '@faker-js/faker/locale/en_BORK';
import { faker as fakerEN_CA } from '@faker-js/faker/locale/en_CA';
import { faker as fakerEN_GB } from '@faker-js/faker/locale/en_GB';
import { faker as fakerEN_GH } from '@faker-js/faker/locale/en_GH';
import { faker as fakerEN_HK } from '@faker-js/faker/locale/en_HK';
import { faker as fakerEN_IE } from '@faker-js/faker/locale/en_IE';
import { faker as fakerEN_IN } from '@faker-js/faker/locale/en_IN';
import { faker as fakerEN_NG } from '@faker-js/faker/locale/en_NG';
import { faker as fakerEN_US } from '@faker-js/faker/locale/en_US';
import { faker as fakerEN_ZA } from '@faker-js/faker/locale/en_ZA';
import { faker as fakerEO } from '@faker-js/faker/locale/eo';
import { faker as fakerES } from '@faker-js/faker/locale/es';
import { faker as fakerES_MX } from '@faker-js/faker/locale/es_MX';
import { faker as fakerFA } from '@faker-js/faker/locale/fa';
import { faker as fakerFI } from '@faker-js/faker/locale/fi';
import { faker as fakerFR } from '@faker-js/faker/locale/fr';
import { faker as fakerFR_BE } from '@faker-js/faker/locale/fr_BE';
import { faker as fakerFR_CA } from '@faker-js/faker/locale/fr_CA';
import { faker as fakerFR_CH } from '@faker-js/faker/locale/fr_CH';
import { faker as fakerFR_LU } from '@faker-js/faker/locale/fr_LU';
import { faker as fakerFR_SN } from '@faker-js/faker/locale/fr_SN';
import { faker as fakerHE } from '@faker-js/faker/locale/he';
import { faker as fakerHR } from '@faker-js/faker/locale/hr';
import { faker as fakerHU } from '@faker-js/faker/locale/hu';
import { faker as fakerHY } from '@faker-js/faker/locale/hy';
import { faker as fakerID_ID } from '@faker-js/faker/locale/id_ID';
import { faker as fakerIT } from '@faker-js/faker/locale/it';
import { faker as fakerJA } from '@faker-js/faker/locale/ja';
import { faker as fakerKA_GE } from '@faker-js/faker/locale/ka_GE';
import { faker as fakerKO } from '@faker-js/faker/locale/ko';
import { faker as fakerLV } from '@faker-js/faker/locale/lv';
import { faker as fakerMK } from '@faker-js/faker/locale/mk';
import { faker as fakerNB_NO } from '@faker-js/faker/locale/nb_NO';
import { faker as fakerNE } from '@faker-js/faker/locale/ne';
import { faker as fakerNL } from '@faker-js/faker/locale/nl';
import { faker as fakerNL_BE } from '@faker-js/faker/locale/nl_BE';
import { faker as fakerPL } from '@faker-js/faker/locale/pl';
import { faker as fakerPT_BR } from '@faker-js/faker/locale/pt_BR';
import { faker as fakerPT_PT } from '@faker-js/faker/locale/pt_PT';
import { faker as fakerRO } from '@faker-js/faker/locale/ro';
import { faker as fakerRO_MD } from '@faker-js/faker/locale/ro_MD';
import { faker as fakerRU } from '@faker-js/faker/locale/ru';
import { faker as fakerSK } from '@faker-js/faker/locale/sk';
import { faker as fakerSR_RS_latin } from '@faker-js/faker/locale/sr_RS_latin';
import { faker as fakerSV } from '@faker-js/faker/locale/sv';
import { faker as fakerTH } from '@faker-js/faker/locale/th';
import { faker as fakerTR } from '@faker-js/faker/locale/tr';
import { faker as fakerUK } from '@faker-js/faker/locale/uk';
import { faker as fakerUR } from '@faker-js/faker/locale/ur';
import { faker as fakerVI } from '@faker-js/faker/locale/vi';
import { faker as fakerYO_NG } from '@faker-js/faker/locale/yo_NG';
import { faker as fakerZH_CN } from '@faker-js/faker/locale/zh_CN';
import { faker as fakerZH_TW } from '@faker-js/faker/locale/zh_TW';
import { faker as fakerZU_ZA } from '@faker-js/faker/locale/zu_ZA';

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
    id: fakerEN_US.string.uuid(),
    name: simulateError(name, errorCount),
    address: simulateError(address, errorCount),
    phone: simulateError(phone, errorCount),
  };
};

export function generateUsers (region, errorRate, seed, count, startIndex = 0) {
  let faker;
  switch (region) {
	  case 'af_ZA': faker = fakerAF_ZA; break;
	  case 'ar': faker = fakerAR; break;
	  case 'az': faker = fakerAZ; break;
	  case 'base': faker = fakerBASE; break;
	  case 'cs_CZ': faker = fakerCS_CZ; break;
	  case 'da': faker = fakerDA; break;
	  case 'de': faker = fakerDE; break;
	  case 'de_AT': faker = fakerDE_AT; break;
	  case 'de_CH': faker = fakerDE_CH; break;
	  case 'dv': faker = fakerDV; break;
	  case 'el': faker = fakerEL; break;
	  case 'en': faker = fakerEN; break;
	  case 'en_AU': faker = fakerEN_AU; break;
	  case 'en_AU_ocker': faker = fakerEN_AU_ocker; break;
	  case 'en_BORK': faker = fakerEN_BORK; break;
	  case 'en_CA': faker = fakerEN_CA; break;
	  case 'en_GB': faker = fakerEN_GB; break;
	  case 'en_GH': faker = fakerEN_GH; break;
	  case 'en_HK': faker = fakerEN_HK; break;
	  case 'en_IE': faker = fakerEN_IE; break;
	  case 'en_IN': faker = fakerEN_IN; break;
	  case 'en_NG': faker = fakerEN_NG; break;
	  case 'en_US': faker = fakerEN_US; break;
	  case 'en_ZA': faker = fakerEN_ZA; break;
	  case 'eo': faker = fakerEO; break;
	  case 'es': faker = fakerES; break;
	  case 'es_MX': faker = fakerES_MX; break;
	  case 'fa': faker = fakerFA; break;
	  case 'fi': faker = fakerFI; break;
	  case 'fr': faker = fakerFR; break;
	  case 'fr_BE': faker = fakerFR_BE; break;
	  case 'fr_CA': faker = fakerFR_CA; break;
	  case 'fr_CH': faker = fakerFR_CH; break;
	  case 'fr_LU': faker = fakerFR_LU; break;
	  case 'fr_SN': faker = fakerFR_SN; break;
	  case 'he': faker = fakerHE; break;
	  case 'hr': faker = fakerHR; break;
	  case 'hu': faker = fakerHU; break;
	  case 'hy': faker = fakerHY; break;
	  case 'id_ID': faker = fakerID_ID; break;
	  case 'it': faker = fakerIT; break;
	  case 'ja': faker = fakerJA; break;
	  case 'ka_GE': faker = fakerKA_GE; break;
	  case 'ko': faker = fakerKO; break;
	  case 'lv': faker = fakerLV; break;
	  case 'mk': faker = fakerMK; break;
	  case 'nb_NO': faker = fakerNB_NO; break;
	  case 'ne': faker = fakerNE; break;
	  case 'nl': faker = fakerNL; break;
	  case 'nl_BE': faker = fakerNL_BE; break;
	  case 'pl': faker = fakerPL; break;
	  case 'pt_BR': faker = fakerPT_BR; break;
	  case 'pt_PT': faker = fakerPT_PT; break;
	  case 'ro': faker = fakerRO; break;
	  case 'ro_MD': faker = fakerRO_MD; break;
	  case 'ru': faker = fakerRU; break;
	  case 'sk': faker = fakerSK; break;
	  case 'sr_RS_latin': faker = fakerSR_RS_latin; break;
	  case 'sv': faker = fakerSV; break;
	  case 'th': faker = fakerTH; break;
	  case 'tr': faker = fakerTR; break;
	  case 'uk': faker = fakerUK; break;
	  case 'ur': faker = fakerUR; break;
	  case 'vi': faker = fakerVI; break;
	  case 'yo_NG': faker = fakerYO_NG; break;
	  case 'zh_CN': faker = fakerZH_CN; break;
	  case 'zh_TW': faker = fakerZH_TW; break;
	  case 'zu_ZA': faker = fakerZU_ZA; break;
	  default: faker = fakerEN; // Default to English
}
  faker.seed(seed + startIndex);
  return Array.from({ length: count }, () => generateUser(errorRate, faker));
};