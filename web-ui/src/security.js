function issLoggin(obtainRole){
    let permiss = ""
    //let logginState= falselogginState =true
    if(obtainRole != null){

        switch (obtainRole) {
            case "Soporte":
                permiss="CompleteAccess"
                break;
            case "Administrador":
                permiss="CompleteAccess"
                break;
            case "Tia":
                permiss="RestriccionAccess"
                break;
            case "Equipo Tecnico":
                permiss="MediumAccess"
                break;        
            default:
                break;
        }
        
        
    }
    return permiss
}
export default issLoggin
/*
export function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    //debugger;
    console.log(jsonPayload);
    return JSON.parse(jsonPayload);
};
*/