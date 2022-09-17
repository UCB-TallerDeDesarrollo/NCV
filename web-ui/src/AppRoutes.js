// importing components from react-router-dom package
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import HomePageForm from './HomePageForm'
import DataHealth from './kidsFilesView/DataHealth'
import ViewListKids from './kidsFilesView/temporaryViewListKids'

function AppRoutes () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePageForm />} />
        <Route path="kidHealth" element={<DataHealth />} />
        <Route path="listKids" element={<ViewListKids />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
