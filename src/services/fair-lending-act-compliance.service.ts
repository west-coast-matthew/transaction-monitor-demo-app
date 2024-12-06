import LoanApplication from '../types/loan-application.type';
import {mockRandomDelay} from '../utils/mock-utils';
import logger from '../utils/logger';

/** 
 * Emulates a call to a third party API.
 */
const saveFairCreditAuditInfo = (loanApplication:LoanApplication)=>{
    logger.debug(`saving application history for fair credit act compliance....`);
    mockRandomDelay();
}