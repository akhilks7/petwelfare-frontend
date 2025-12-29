
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
import { ToastContainer, Bounce } from "react-toastify";
import { useContext } from 'react'
import { userAuthContext } from './context/AuthContext'
import PaymentSucess from './user/pages/PaymentSucess'
import PaymentError from './user/pages/PaymentError'

function App() {
  const{role}=useContext(userAuthContext)
  if (!role) {
    return
  }
  return (
    <>
      <Routes>
        {/* ------common------- */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />

        {/* user */}
        {role=="user"&&
        <>
          <Route path='/UserDashboard' element={<UserDashboard />} />
          <Route path='/adoptpets' element={<PetAdoptions />} />
          <Route path='/userprofile' element={<UserProfile />} />
          <Route path='/petforsale' element={<PetForSale />} />
          <Route path='/lostpets' element={<LostPets />} />
          <Route path='/foundpets' element={<FoundPets />} />
          <Route path='/straylist' element={<StrayList />} />
          <Route path='/payment-success' element={<PaymentSucess />} />
          <Route path='/payment-error' element={<PaymentError />} />
        </>}

        {/* ----------------admin----------------- */}
        {role=="admin"&&
        <Route path='/admindashboard' element={<AdminDashboard />} />
        }
        <Route path='*' element={<Pnf />} />
      </Routes>

       <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  )
}

export default App
