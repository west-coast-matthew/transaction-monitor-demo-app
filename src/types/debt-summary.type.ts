export default interface DebtSummary{
    totalPendingDebt:number,
    debtLineItems: Map<String, number>,
}