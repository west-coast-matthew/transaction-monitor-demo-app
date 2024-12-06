import CreditLenderResponse from "./credit-lender-response.type";
import MockData from "./mock-data.type";
import Person from "./person.type";


export enum ApplicationStatus {
    PENDING, APPROVED, DENIED, EXCEPTION_DURING_PROCESSING
}
export default interface LoanApplication{
    applicationId: string,
    applicant: Person,
    applicationDate: Date,
    approvalDate?: Date,
    requestedAmount: number,
    requestedTermLength: number,
    applicationStatus?: ApplicationStatus,
    creditLenderResponses: Array<CreditLenderResponse>,
    mockData: MockData,
}