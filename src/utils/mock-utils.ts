import LoanApplication from "../types/loan-application.type"
import Person, {ETHNICITY} from '../types/person.type';
import {ApplicationStatus} from '../types/loan-application.type';
import minifaker from 'minifaker';
import 'minifaker/locales/en';

export const getRandomNumber = (min:number=3, max:number=15):number=>{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const mockRandomDelay = async()=>{

    await new Promise((res)=>{
        setTimeout(res, getRandomNumber());
    });

}

/** 
 * Generate a mock application, by default we produce an application that will 
 * pass. Calling method can make use of the mock attribute to override this default
 * behavior in order to force application failures for specific reasons.
 *  
*/
export const getMockApplication = (instanceNumber:number):LoanApplication=>{
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    const application:LoanApplication = {
        applicationId: `${hour}-${minute}-${instanceNumber}`,
        applicationDate: new Date(),
        applicant: mockPerson(),
        approvalDate: undefined,
        requestedAmount: 0,
        requestedTermLength: 0,
        applicationStatus: ApplicationStatus.PENDING,
        creditLenderResponses: [],
        mockData:{
            combinedCreditScore: getRandomNumber(700,800),
            criminalBgCheckScore: getRandomNumber(0,10),
            debitAmount: getRandomNumber(0,5000), 
            incomeAmount: getRandomNumber(40000,140000),
        }
    }

    return application;
}

const mockPerson = ():Person=>{

    const person:Person = {
        firstName: minifaker.firstName(),
        lastName: minifaker.lastName(),
        ssn: `${getRandomNumber(100, 999)} ${getRandomNumber(10, 99)} ${getRandomNumber(1000, 9999)}`,
        enthicity: ETHNICITY.CAUCASION,
        birthdate: `${getRandomNumber(1, 12)}/${getRandomNumber(1, 28)}/${getRandomNumber(1970, 2005)}`,
        phoneNumber: minifaker.phoneNumber(),
        emailAddress: minifaker.email(),
        address: {
            street: minifaker.streetAddress(),
            city: minifaker.cityName(),
            state: minifaker.state(),
            postalCode: minifaker.zipCode()
        },
        

    };

    return person;
}