import Person from '../types/person.type';
import {mockRandomDelay} from '../utils/mock-utils';

/** 
 * Emulates a call to a third paty API.
 */
const getSocialMediaRiskScore = (applicant:Person) =>{
    console.log(`performing API call`);
    mockRandomDelay();

     return Math.floor(Math.random() * (100 - 75 + 1) + 75);
}

export default getSocialMediaRiskScore;