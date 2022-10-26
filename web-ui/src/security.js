function issLoggin(obtainRole){
    let permiss = ""
    let logginState= false
    if(obtainRole != null){

        switch (obtainRole) {
            case "Soporte":
                permiss="ComplitAcces"
                break;
            case "AdminUser":
                permiss="ComplitAcces"
                break;
            case "AuntUser":
                permiss="RestrinccionAcces"
                break;
            case "Cordinator":
                permiss="ComplitAcces"
                break;        
            default:
                break;
        }
        logginState =true
        
    }
    return permiss
}
export default issLoggin