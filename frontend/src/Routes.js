import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home/Home'

import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import UserDashboard from './user/UserDashboard/UserDashboard'
import AdminDashboard from './user/AdminDashboard/AdminDashboard'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import Shop from './core/Shop/Shop'
import Product from './core/Product/Product'
import Cart from './core/Cart/Cart'

import './styles/style.scss'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/signin' exact component={Signin} />
        <Route path='/signup' exact component={Signup} />
        <Route path='/shop' exact component={Shop} />
        <Route path='/cart' exact component={Cart} />
        <PrivateRoute path='/user/dashboard' exact component={UserDashboard} />
        <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
        <AdminRoute path='/create/category' exact component={AddCategory} />
        <AdminRoute path='/create/product' exact component={AddProduct} />
        <Route path='/product/:productId' exact component={Product} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
