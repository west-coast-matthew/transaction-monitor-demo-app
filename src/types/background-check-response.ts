export default interface BackgroundCheckResponse{
    executionDate: Date, 
    isValidAddress: boolean, 
    isValidSSNMatch: boolean, 
    isValidIdentity: boolean,
    notes: Array<string>
}