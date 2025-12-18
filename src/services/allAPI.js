import commonAPI from "./commonAPI"
import SERVERURL from "./serverURL"

export const handleLoginAPI=async(reqbody)=>{
    return await commonAPI("post",`${SERVERURL}/login`,reqbody)
}

export const handleregisterAPI=async(reqbody)=>{
    return await commonAPI("post",`${SERVERURL}/register`,reqbody)
}

// -----------------Admin------------------

export const handleaddnewpet=async(reqbody,reqheader)=>{
    return await commonAPI("post",`${SERVERURL}/addnewpet`,reqbody,reqheader)
}