export enum ELIGIBILITY_STATUS{
    ELIGIBLE,
    HIGH_RISK, 
    DECLINED
}

export default interface LoanEligibilityStatus{ 
    eligibiliyStatusCode: ELIGIBILITY_STATUS,
    factors: Array<string>,
}