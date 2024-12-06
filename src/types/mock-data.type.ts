/**
 * We need to a way for demonstration purposes to override the values that would be 
 * normally returned by the results from calls to third party systems. Provides control 
 * to emulate behaviors for testing purposes. 
 */

export default interface MockData{
    combinedCreditScore: number,
    criminalBgCheckScore: number,
    debitAmount: number, 
    incomeAmount: number,
}