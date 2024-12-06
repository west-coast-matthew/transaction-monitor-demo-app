/**
 * Encapsulates data from a response from an third party API
 * call used to get a credit score.
 */

export default interface CreditLenderResponse{

    callTimestamp: Date, 
    score: number,
    notes: string
}