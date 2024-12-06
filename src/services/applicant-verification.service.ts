import Person from '../types/person.type';
import {mockRandomDelay} from '../utils/mock-utils';

/** 
 * Emulates a call to a third paty API.
 */
const validateApplicantIdentity = (applicant:Person) =>{
    console.log(`performing API call`);
    mockRandomDelay();

    if(applicant.firstName.toLowerCase()==""){
        throw `Failed to validate the applicants identity`;
    }
}

export default validateApplicantIdentity;