import {mockRandomDelay} from '../utils/mock-utils';
import DebtSummary from '../types/debt-summary.type';
import logger from '../utils/logger';

/** 
 * Emulates a call to a third paty API.
 */

import BackgroundCheckResponse from "../types/background-check-response";
import Person from "../types/person.type";
import LoanApplication from '../types/loan-application.type';

const performBackgroundCheck = (loanApplication:LoanApplication):DebtSummary=>{
    
    //todo: fake debts
    
    const debtSummary:DebtSummary = {
        totalPendingDebt: ,
        debtLineItems: [],
    };

    logger.debug(debtSummary);
    return debtSummary;

}

export default performBackgroundCheck;