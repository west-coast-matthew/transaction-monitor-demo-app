import {mockRandomDelay} from '../utils/mock-utils';


/** 
 * Emulates a call to a third paty API.
 */

import BackgroundCheckResponse from "../types/background-check-response";
import Person from "../types/person.type";

const performBackgroundCheck = (applicant:Person):BackgroundCheckResponse=>{
    return null;
}

export default performBackgroundCheck;