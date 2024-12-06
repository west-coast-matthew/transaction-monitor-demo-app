import CreditLenderResponse from "../types/credit-lender-response.type"
import LoanApplication from "../types/loan-application.type"
import Person from "../types/person.type";
import {mockRandomDelay} from '../utils/mock-utils';

/** 
 * Emulates a call to a third paty API.
 */

const getCriminalOffenseScore = (applicant: Person):number=>{
    
    mockRandomDelay();
    
    return 0;
}

export default getCriminalOffenseScore;

