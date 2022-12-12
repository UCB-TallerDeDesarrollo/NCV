import {viewsAcces} from './security';

let accesPermiss=sessionStorage.getItem("Access") 
function App() {
    return(viewsAcces(accesPermiss))
     
}

export default App
