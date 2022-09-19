export function isDatePassed(date){
    var today = Date.now()
    if(today > date){
        return true
    }
    return false
}