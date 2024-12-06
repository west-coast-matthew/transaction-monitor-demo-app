export default class MinCriteriaNotMetException extends Error {
    constructor(message: string) {
      super(message);
      this.name = "MinCriteriaNotMetException"; 
    }
  }