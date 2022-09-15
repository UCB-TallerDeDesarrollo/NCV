export function saludar(){
    console.log("Holi Mundo");
    return "Uwu";
}
  
export function getKid(name, ci){
    var kido = [name, ci];
    return kido;
}
  
export function getListKids(){
    var urlKids = "https://ncv-api.herokuapp.com/api/kids";
    var listKids = fetch(urlKids)
    .then(res => res.json())
    .then(
      (result) => {
        listKids = result;
      }
    )
    return listKids;
}
  