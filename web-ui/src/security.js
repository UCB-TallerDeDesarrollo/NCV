function issLoggin(obtainRole){
    let permiss = ""
    //let logginState= falselogginState =true
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
        
        
    }
    return permiss
}
export default issLoggin