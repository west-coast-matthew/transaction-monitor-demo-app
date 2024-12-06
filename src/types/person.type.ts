import Address from "./address.type";

export enum ETHNICITY{
    CAUCASION, 
    ASIAN,
    INDIAN,
    AFRICAN_AMERICAN,
    HISPANIC,
    OTHER,
    DECLINE_TO_SPECIFY
}

export default interface Person{
    firstName: string,
    lastName: string,
    ssn: string,
    enthicity: ETHNICITY,
    phoneNumber: string, 
    emailAddress: string,
    address: Address,
    birthdate: string,
}