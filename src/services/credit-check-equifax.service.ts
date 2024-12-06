import CreditLenderResponse from "../types/credit-lender-response.type"
import LoanApplication from "../types/loan-application.type"
import {mockRandomDelay} from '../utils/mock-utils';


/** 
 * Emulates a call to a third paty API.
 */

const performCreditCheck = (loanApplicaiton: LoanApplication):CreditLenderResponse=>{
    
    // Emulate a call to a third party service, with a random delay.
    mockRandomDelay();
    return {
        callTimestamp: new Date(), 
        score: 800,
        notes: 'sample notes for request as returned by vendor....'
    };
}

export default performCreditCheck;

