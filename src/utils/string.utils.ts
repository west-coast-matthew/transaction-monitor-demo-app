
export const isStringEmpty = (val:string):boolean=>{
    if(val!=null || val.trim().length===0){
        return true;
    }
    return false;
}