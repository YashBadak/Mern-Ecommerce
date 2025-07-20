
import { Route, Routes } from "react-router-dom"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import AdminLayout from "./components/admin-view/AdminLayout"
import AdminHeader from "./components/admin-view/AdminHeader"
import AdminSidebar from "./components/admin-view/AdminSidebar"
import AuthLayout from "./components/auth/AuthLayout"
import AdminDashboard from "./pages/admin-view/AdminDashboard"
import AdminFeatures from "./pages/admin-view/AdminFeatures"
import AdminOrders from "./pages/admin-view/AdminOrders"
import AdminProducts from "./pages/admin-view/AdminProducts"
import ShoppingLayout from "./components/shopping-view/ShoppingLayout"
import Account from "./pages/shopping-view/Account"
import CheckOut from "./pages/shopping-view/CheckOut"
import Home from "./pages/shopping-view/Home"
import Listing from "./pages/shopping-view/Listing"
import NotFound from "./pages/not-found/NotFound"
import CheckAuth from "./components/common/CheckAuth"
import UnAuth from "./pages/unauth-page/UnAuth"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./store/AuthSlice"
import { Skeleton } from "./components/ui/skeleton"
import PaypalReturn from "./pages/shopping-view/PaypalReturn"
import PaymentSuccess from "./pages/shopping-view/PaymentSuccess"
import Search from "./pages/shopping-view/Search"

function App() {
 

  const {user,isAuthenticated, isLoading}=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  useEffect(()=>{
dispatch(checkAuth())
  },[dispatch])
  if(isLoading) return <Skeleton className="h-[600px] w-[600px] rounded-full" />
  console.log(isLoading,user)
  return (
    <div className="flex flex-col overflow-hidden bg-white">
   <Routes>
    <Route path="/" element={
      <CheckAuth isAuthenticated={isAuthenticated} user={user}>
      </CheckAuth> }/>
    <Route path="/auth" element={
      <CheckAuth isAuthenticated={isAuthenticated} user={user}>
      <AuthLayout/>
      </CheckAuth>
      }>
    <Route path="login" element={<Login/>}/>
    <Route path="register" element={<Register/>}/>
    </Route>
    <Route path="/admin" element={
      <CheckAuth isAuthenticated={isAuthenticated} user={user}>
      <AdminLayout/>
      </CheckAuth>
      }>
    <Route path="dashboard" element={<AdminDashboard/>}/>
    <Route path="features" element={<AdminFeatures/>}/>
    <Route path="orders" element={<AdminOrders/>}/>
    <Route path="products" element={<AdminProducts/>}/>
    </Route>
    <Route path="/shop" element={
       <CheckAuth isAuthenticated={isAuthenticated} user={user}>
      <ShoppingLayout/>
      </CheckAuth>
      }>
    <Route path="account" element={<Account/>}/>
    <Route path="checkout" element={<CheckOut/>}/>
    <Route path="home" element={<Home/>}/>
    <Route path="listing" element={<Listing/>}/>
    <Route path="paypal-return" element={<PaypalReturn/>}/>
    <Route path="payment-success" element={<PaymentSuccess/>}/>
    <Route path="search" element={<Search/>}/>
    </Route>
    <Route path="*" element={<NotFound/>}/>
    <Route path="unauth-page" element={<UnAuth/>}/>
   </Routes>
   </div>
  )
}

export default App