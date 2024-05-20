import { API_KEY } from "./API/apiKey"

const apiUrl = `https://pixabay.com/api/?key=${API_KEY}`

   const formatUrl =(params) => {
        let url = apiUrl + "&per_page=25&safesearch=true&editors_choice=true"
        if(!params) {
            return url;
        }

        let paramsKey = Object.keys(params)
        paramsKey.map((key)=>{
            let value = key == 'q' ? encodeURIComponent(params[key]) : params[key];
            url += `&${key}=${value}`
        })
        console.log("got final url :", url)
        return url;

}


export const apiCall = async (params) => {
    try {
        const response = await fetch(formatUrl(params))
        const  data  = await response.json();
        return { success: true, data }
    } catch (error) {
        console.log("got error", error.message)
        return { success: false, msg: error.message }
    }
}