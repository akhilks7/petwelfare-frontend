import axios from "axios";

const commonAPI = async (httprequest, url, reqbody, reqheader) => {
    const config = {
        method: httprequest,
        url,
        data: reqbody,
        headers: reqheader
    }
    return await axios(config).then(res => {
        return res
    }).catch(error => {
        console.log(`API error : ${error.response}`);
        return error.response
    })
}

export default commonAPI