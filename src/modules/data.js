export default async function data(location){
    let apiKey = "B2LL9ARMA453U8WJBGW27QQPA";
    let api = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"

    try {
        let data = await fetch(`${api}${location}?unitGroup=metric&key=${apiKey}&include=hours,current&contentType=json`);
        let json = await data.json()

        return json;
    } catch(e) {
        console.log("ERRO!", e)
    }
}