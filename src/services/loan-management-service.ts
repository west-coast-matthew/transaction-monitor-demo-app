import LoanEligibilityStatus, { ELIGIBILITY_STATUS } from "../types/loan-eligibility-status.type";
import LoanTerms from '../types/loan-terms.type';
import LoanApplication, { ApplicationStatus } from '../types/loan-application.type';
import logger from '../utils/logger';
import {mockRandomDelay} from '../utils/mock-utils';
import validateSSN from '../services/ssn-validation.service';
import { validateAddress } from "./address-verification.service";
import validateApplicantIdentity from './applicant-verification.service';
import validateIncomeSources from './income-verification.service';
import getSocialMediaRiskScore from "./social-media-check.service";
import getCriminalOffenseScore from "./criminal-history-check.service";
import performEquifaxCreditCheck from './credit-check-equifax.service';
import performExperianCreditCheck from './credit-check-experian.service';
import CreditScores from "../types/credit-score.type";
import validateTaxReturns from "./tax-validation.service";
import MinCriteriaNotMetException from '../exceptions/min-criteria-not-met-exception';

export const getCreditScores = (application:LoanApplication):CreditScores =>{
    
    const scores:CreditScores = {
        equifaxScore: performEquifaxCreditCheck(application), 
        experianScore: performEquifaxCreditCheck(application), 
    }

    console.log(scores);

    return scores;
}

/**
 * Determine the terms for the loan. This will depend on the following:
 * Amount requested
 * Calculated risk
 * Credit scores
 * 
 */
const calculateLoanTerms = (loanApplication:LoanApplication):LoanTerms =>{
    const loanAmount:number = 0;
    const loanLength:number = 0;
    const monthlyPayment:number = 0;
    const grantedAmount:number = 0;
    const grantedRequestedLength:number = 0;

    return {
        loanAmount: loanAmount,
        loanLength: loanLength,
        monthlyPayment: monthlyPayment,
        grantedAmount: grantedAmount,
        grantedRequestedLength: grantedRequestedLength,
    };
}

/**
 * Process a loan application (Main routine)
 * 
 * Parent function responsible for coordinating with all required services. The goal 
 * here is to emulate a long chain of logic. Traditionally risk assement 
 * is strongly driven by credit scores from the 'big three' (equifax, experian,...)
 * however lenders are now incresingly using other sources of information
 * such as social media to furher perform risk asesssment.
 * 
 * The point here is to just illustrate that in fact there are a lot of decision
 * points behind the scenes. We do perform logging, but the information logged 
 * is low level, and not easy for an analyst to wokr with, so we instrument 
 * an agent into the calls to capture the decision making flow.
 * 
 * @param loanApplication 
 */
const processApplication = (loanApplication: LoanApplication)=>{
    logger.info(`Processing loan application`);

    try{

        // Validate that all required information is present
        logger.debug(`Validating required application fields`);
        validateRequiredFields(loanApplication);

        // Validate ssn
        logger.debug(`Asserting an SSN is provided`);
        validateSSN(loanApplication.applicant.ssn);

        // Validate that the address is present and is a valid address
        logger.debug(`Performing address validation`);
        validateAddress(loanApplication.applicant.address);

        // Validate that the name and address information 
        logger.debug(`Validating applicant identitity`);
        validateApplicantIdentity(loanApplication.applicant);

        // Validate that the income sources are legitimate organizations
        logger.debug(`Confirming employers are valid business entities`);
        validateIncomeSources(loanApplication);

        // Perform a third party call in order to get risk criteria from social media
        logger.debug(`Performing social media risk analysis`);
        const socialMediaRiskScore = getSocialMediaRiskScore(loanApplication.applicant);

        // Perform a criminal history check
        logger.debug(`Executing criminal history check`);
        const criminalRiskScore = getCriminalOffenseScore(loanApplication.applicant);

        // Perform traditional credit checks
        logger.debug(`Checking for credit scores`);
        const creditScores = getCreditScores(loanApplication);

        // Validate tax returns
        logger.debug(`Checking tax returns`);
        validateTaxReturns(loanApplication);

        // Validiate w2/payment statements
        logger.debug(`Reviewing W2 statements`);
        validateTaxReturns(loanApplication);

        // Calculate a risk score based off of debits, determine if the score meets the 
        // required criteria. Abort further steps if needed.
        logger.debug(`Analyzing debits`);

        // Determine the loan terms
        logger.debug(`Calculating loan terms`);
        const loanTerms:LoanTerms = calculateLoanTerms(loanApplication);

        // Update the application status and final information.
        logger.debug(`Finalizing application details`);

    }
    catch(e){
        
        if(e instanceof MinCriteriaNotMetException){
            loanApplication.applicationStatus = ApplicationStatus.DENIED;
            logger.debug(e);
        }
        else{
            loanApplication.applicationStatus = ApplicationStatus.EXCEPTION_DURING_PROCESSING;
            logger.warn(e);
        }
    }
    finally{
        /**
         * We always set timestamps and record compliance related data.
         */
        saveFairCreditAuditInfo(loanApplication);
        loanApplication.approvalDate = new Date();
    }


    logger.info("Loan application processing complete.");
}

/**
 * 
 */
const validateRequiredFields = (application:LoanApplication)=>{
    if(!application.applicant.firstName){
        throw `No value present for first name`;
    }
    if(!application.applicant.lastName){
        throw `No value present for last name`;
    }
}

/** 
 * Determine if the risk score meets the requirements for the requested amount, 
 * credit history, outstanding debits, etc....
 * 
 */
const getEligibilityStatus = (loanApplication:LoanApplication):LoanEligibilityStatus =>{

    let eligible:boolean = true;

    const eStatus:LoanEligibilityStatus = {
        eligibiliyStatusCode: ELIGIBILITY_STATUS.ELIGIBLE,
        factors: []
    };

    // Validate overall credit score
    let overallCreditCore = loanApplication.mockData.combinedCreditScore;
    if(overallCreditCore<500){
        logger.debug(`application denied to low credit score`);
        eStatus.eligibiliyStatusCode = ELIGIBILITY_STATUS.DECLINED,
        eStatus.factors.push(`Credit score below minimum: ${overallCreditCore}`);
    }
    else if(overallCreditCore<700){
        logger.debug(``);
        eStatus.eligibiliyStatusCode = ELIGIBILITY_STATUS.HIGH_RISK,
        eStatus.factors.push(`Credit score considered 'high risk': ${overallCreditCore}`);
    }
    else{
        logger.debug(`overall credit score passes`);
        eStatus.factors.push(`${overallCreditCore}`);	
    }

    // Validate criminal background score
    let criminalBgScore = loanApplication.mockData.criminalBgCheckScore;
    if(criminalBgScore<25){
        logger.debug(`Criminal background check had failed ${criminalBgScore}`);
        eStatus.eligibiliyStatusCode = ELIGIBILITY_STATUS.DECLINED,
        eStatus.factors.push(`Application declined, criminal background check did not pass: ${criminalBgScore}`);	
    }
    else{
        logger.debug(`Background criminal check passed`);
        eStatus.factors.push(`Criminal background score: ${criminalBgScore}`);	
    }

    // Validate income to debit ratio
    let incomeToDebtRatio = loanApplication.mockData.incomeAmount / loanApplication.mockData.debitAmount;

    if(incomeToDebtRatio<40){
        logger.debug(`Income to debt ratio is not met ${incomeToDebtRatio}`);
    }
    else{
        logger.debug(`Income to debt ratio passed: ${incomeToDebtRatio}`);
    }

    console.log(eStatus);

    return eStatus;
}

/**
 * Determine the interest based on all risk criteria.
 */
const getLoanApr = ():number=>{
    return 4.2;
}

/**
 * Determine the maximum available loan amount based on the requested 
 * amount and income level
 * 
 */
const getMaxLoanAmount = ():number=>{
    return 1.00;
}

export default processApplication;

function saveFairCreditAuditInfo(loanApplication: LoanApplication) {
    // throw new Error("Function not implemented.");
}
