import LoanApplication from './types/loan-application.type';
import {getMockApplication} from './utils/mock-utils';
import processApplication from './services/loan-management-service';
import logger from './utils/logger';

/**
 * Main application:
 *  Execution will mock a series of data for 50 loan applicants, and then run them through 
 * the core routine for the loan approval use case. The approval process is 'instrumented' 
 * to publish events to a resource (an observer) which will interpret the overall set of 
 * events and present a user friendly report.  
 * 
 **/

//Generate mock data, it is assumed that all records will qualify for loans.
const applications: Array<LoanApplication> = [];

for(let x=0;x<50;x++){
    applications.push(getMockApplication(x));
}

//Now let's tweak a few of the first records to fail fo various reasons.

    // Incomplete application information

    // Fake applicant name
    // firstname fake

    // invalid state reference

    // Min age not met
    
    // exceed debit check 

    // requested load amount too high (need to adj possibly amount to borrow)

//And finally, execute routine main routine
applications.forEach((application)=>{
    processApplication(application);
});


