import LoanApplication from '../types/loan-application.type';
import {mockRandomDelay} from '../utils/mock-utils';
/** 
 * Emulates a call to a third paty API.
 */
const validateTaxReturns = (loanApplication:LoanApplication)=>{
    console.log(`performing API call`);
    mockRandomDelay();
}

export default validateTaxReturns;