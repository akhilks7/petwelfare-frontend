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

// update pet status
export const handleupdatepetstaus=async(reqbody,reqheader)=>{
    return await commonAPI("put",`${SERVERURL}/admin-update-pet-status`,reqbody,reqheader)
}

// update user status
export const handleupdateuserstaus=async(reqbody,reqheader)=>{
    return await commonAPI("put",`${SERVERURL}/admin-update-user-status`,reqbody,reqheader)
}

// delete selling pet
export const handledeletesellpet=async(reqbody,reqheader)=>{
    return await commonAPI("delete",`${SERVERURL}/admin-delete-sell-pets`,reqbody,reqheader)
}

export const handledeletepet=async(reqbody,reqheader)=>{
    return await commonAPI("delete",`${SERVERURL}/admin-delete-pet`,reqbody,reqheader)
}

export const handledeleteuser=async(reqbody,reqheader)=>{
    return await commonAPI("delete",`${SERVERURL}/admin-delete-user`,reqbody,reqheader)
}

// get all admin adopting pets
export const handlegetadmdonatepets=async(reqheader)=>{
    return await commonAPI("get",`${SERVERURL}/admin-donate-pets`,{},reqheader)
}

// get all admin adopting pets
export const handlegetadmlostpets=async(reqheader)=>{
    return await commonAPI("get",`${SERVERURL}/admin-lost-pets`,{},reqheader)
}

// get all admin stray pets
export const handlegetadmstrayanimals=async(reqheader)=>{
    return await commonAPI("get",`${SERVERURL}/admin-stray-animals`,{},reqheader)
}

// get all admin found pets
export const handlegetadmfoundpets=async(reqheader)=>{
    return await commonAPI("get",`${SERVERURL}/admin-found-pets`,{},reqheader)
}

// get all admin users
export const handlegetalladminusers=async(reqheader)=>{
    return await commonAPI("get",`${SERVERURL}/admin-all-users`,{},reqheader)
}

// get all admin users
export const handlegetalladminpets=async(reqheader)=>{
    return await commonAPI("get",`${SERVERURL}/admin-all-pets`,{},reqheader)
}

// ---------------------user----------------------------------

// report found pet
export const reportfoundpetapi=async(reqbody,reqheader)=>{
    return await commonAPI("post",`${SERVERURL}/report-found-pet`,reqbody,reqheader)
}

// report adopt pet
export const reportadoptpetapi=async(reqbody,reqheader)=>{
    return await commonAPI("post",`${SERVERURL}/report-adopt-pet`,reqbody,reqheader)
}

// report lost pet
export const reportlostpetapi=async(reqbody,reqheader)=>{
    return await commonAPI("post",`${SERVERURL}/report-lost-pet`,reqbody,reqheader)
}

// report stray pet
export const reportstraypetapi=async(reqbody,reqheader)=>{
    return await commonAPI("post",`${SERVERURL}/report-stray-pet`,reqbody,reqheader)
}

// get all  selling pets
export const handlegetsellingpets=async(reqheader)=>{
    return await commonAPI("get",`${SERVERURL}/user-sell-pets`,{},reqheader)
}

// get all  donate pets
export const handlegetdonatepets=async(reqheader)=>{
    return await commonAPI("get",`${SERVERURL}/user-donate-pets`,{},reqheader)
}

// get all  stray pets
export const handlegetstraypets=async(reqheader)=>{
    return await commonAPI("get",`${SERVERURL}/user-stray-pets`,{},reqheader)
}

// get all  lost pets
export const handlegetlostpets=async(reqheader)=>{
    return await commonAPI("get",`${SERVERURL}/user-lost-pets`,{},reqheader)
}

// get all  found pets
export const handlegetfoundpets=async(reqheader)=>{
    return await commonAPI("get",`${SERVERURL}/user-found-pets`,{},reqheader)
}

export const handleupdateprofilepic=async(reqbody,reqheader)=>{
    return await commonAPI("post",`${SERVERURL}/update-profile-picture`,reqbody,reqheader)
}

export const handleupdateprofile = async (reqbody, reqheader) => {
    return await commonAPI("put", `${SERVERURL}/update-profile`, reqbody, reqheader);
}

export const updatepasswordapi = async (reqbody, reqheader) => {
    return await commonAPI("put", `${SERVERURL}/update-password`, reqbody, reqheader);
}

export const handlegetalluserpets=async(reqheader)=>{
    return await commonAPI("get",`${SERVERURL}/user-all-pets`,{},reqheader)
}

export const handlegetalluseradoptpets=async(reqheader)=>{
    return await commonAPI("get",`${SERVERURL}/user-all-adopt-pets`,{},reqheader)
}

export const handlegetalluserfoundpets=async(reqheader)=>{
    return await commonAPI("get",`${SERVERURL}/user-all-found-pets`,{},reqheader)
}

export const handlegetalluserlostpets=async(reqheader)=>{
    return await commonAPI("get",`${SERVERURL}/user-all-lost-pets`,{},reqheader)
}

export const handlegetalluserstraypets=async(reqheader)=>{
    return await commonAPI("get",`${SERVERURL}/user-all-stray-pets`,{},reqheader)
}


export const handlegetalluserhomeadoptpets=async(reqheader)=>{
    return await commonAPI("get",`${SERVERURL}/user-all-home-adopt-pets`,{},reqheader)
}

export const handlegetalluserhomesellpets=async(reqheader)=>{
    return await commonAPI("get",`${SERVERURL}/user-all-home-sell-pets`,{},reqheader)
}

export const handlegetalluserhomelostpets=async(reqheader)=>{
    return await commonAPI("get",`${SERVERURL}/user-all-home-lost-pets`,{},reqheader)
}

export const handlegetalluserhomefoundpets=async(reqheader)=>{
    return await commonAPI("get",`${SERVERURL}/user-all-home-found-pets`,{},reqheader)
}

export const updateuserpetapi = async (reqbody, reqheader) => {
    return await commonAPI("put", `${SERVERURL}/updatepet`, reqbody, reqheader);
}

export const handledeleteuserpet=async(reqbody,reqheader)=>{
    return await commonAPI("delete",`${SERVERURL}/user-delete-pet`,reqbody,reqheader)
}

export const UsermakePaymentAPI = async (reqbody, reqheader) => {
    return await commonAPI("put", `${SERVERURL}/user-make-payment`, reqbody, reqheader);
}