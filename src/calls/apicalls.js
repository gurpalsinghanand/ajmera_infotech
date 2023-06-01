import axios from "axios";

export const fetchData = async(url) => {
    try{
        const data = await axios(url)
        return data;
    }catch(e){
        console.log(e)
    }
}

export const postData = async(url) => {
    try{
        const data = await axios(url,{method:'POST'})
        return data;
    }
    catch(e){
        console.log(e)
    }
}