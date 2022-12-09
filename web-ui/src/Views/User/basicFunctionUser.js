export function TranslateRole(nameRole){
    var answer=""
    switch (nameRole) {
        case "AuntUser":
            answer="Tia"
            break;
        case "AdminUser":
            answer="Administrador"
            break;
        case "Cordinator":
            answer="Cordinador"
        case "Soporte":
            answer="Soporte"
            break;
        default:
            answer=nameRole
            //answer="----"
            break;
    }
    return answer
}


export function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    //debugger;
    console.log(jsonPayload);
    return JSON.parse(jsonPayload);
}