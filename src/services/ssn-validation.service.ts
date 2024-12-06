import {mockRandomDelay} from '../utils/mock-utils';

/** 
 * Emulates a call to a third paty API.
 */
const validateSSN = (ssn:string) =>{
    mockRandomDelay();

    if(ssn.startsWith("000")){
        throw `Invalid SSN 000**-****`;
    }
}

export default validateSSN;