
async function GetFetch(url) {
    var responseFetch;
    var resFetch;
    resFetch = await fetch(url);
    if(resFetch.status != "404"){
        responseFetch = await resFetch.json();
    }else{
        responseFetch = resFetch;
    }
    console.log("respuesta del fetch");
    console.log(responseFetch);
    return responseFetch;
}
export {GetFetch}
