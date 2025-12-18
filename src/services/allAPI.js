import commonAPI from "./commonAPI"
import SERVERURL from "./serverURL"

export const handleLoginAPI=async(reqbody)=>{
    return await commonAPI("post",`${SERVERURL}/login`,reqbody)
}

export const handleregisterAPI=async(reqbody)=>{
    return await commonAPI("post",`${SERVERURL}/register`,reqbody)
}

// -----------------Admin------------------
// add new selling pet
export const handleaddnewpet=async(reqbody,reqheader)=>{
    return await commonAPI("post",`${SERVERURL}/addnewpet`,reqbody,reqheader)
}
// get all admin selling pets
export const handlegetadminsellingpets=async(reqheader)=>{
    return await commonAPI("get",`${SERVERURL}/admin-sell-pets`,{},reqheader)
}
// update selling pet
export const handleupdatenewpet=async(reqbody,reqheader)=>{
    return await commonAPI("put",`${SERVERURL}/admin-update-sell-pets`,reqbody,reqheader)
}