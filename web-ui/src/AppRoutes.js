// importing components from react-router-dom package
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomePageForm from './HomePageForm';  
import DataHealth from "./kidsFilesView/DataHealth";
  
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePageForm />} />
        <Route path="kidHealth/*" element={<DataHealth />} />
      </Routes>
    </BrowserRouter>
  );
}
  
export default AppRoutes;


