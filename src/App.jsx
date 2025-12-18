
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './common/pages/LandingPage'
import Pnf from './common/pages/Pnf'
import Auth from './common/pages/Auth'
import UserDashboard from './user/pages/UserDashboard'
import PetAdoptions from './user/pages/PetAdoptions'
import UserProfile from './user/pages/UserProfile'
import PetForSale from './user/pages/PetForSale'
import LostPets from './user/pages/LostPets'
import FoundPets from './user/pages/FoundPets'
import AdminDashboard from './admin/pages/AdminDashboard'
import StrayList from './user/pages/StrayList'

function App() {

  return (
    <>
      <Routes>
        {/* ------common------- */}
        <Route path='/' element={<LandingPage />} />
        <Route path='*' element={<Pnf />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />

        {/* user */}
        <Route path='/UserDashboard' element={<UserDashboard />} />
        <Route path='/adoptpets' element={<PetAdoptions />} />
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path='/petforsale' element={<PetForSale />} />
        <Route path='/lostpets' element={<LostPets />} />
        <Route path='/foundpets' element={<FoundPets />} />
        <Route path='/straylist' element={<StrayList />} />

        {/* ----------------admin----------------- */}
        <Route path='/admindashboard' element={<AdminDashboard />} />
      </Routes>
    </>
  )
}

export default App
