
import './App.css';
import Header from "./components/header/Header";
import {Route, Switch} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import UserRegistration from "./pages/user-registration/UserRegistration";
import Product from "./pages/product/Product";
import ProductOverview from "./pages/product-overview/ProductOverview";
import ProductForm from "./pages/product-form/ProductForm";
import PersonInfoForm from "./pages/person-info-form/PersonInfoForm";
import Footer from "./components/footer/Footer";
import Order from "./pages/order/Order";



function App() {

  return (
    <>
        <Header/>
        <div className="body-content">
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/seeds">
                    <ProductOverview/>
                </Route>
                <Route exact path="/seeds/:productId">
                    <Product/>
                </Route>
                <Route exact path="/registration">
                    <UserRegistration/>
                </Route>
                <Route exact path="/personinfo/">
                    <PersonInfoForm/>
                </Route>
                <Route path="/profile">
                    <Profile/>
                </Route>
                <Route exact path="/login">
                    <Login/>
                </Route>
                <Route exact path="/product-form">
                    <ProductForm/>
                </Route>
                <Route>
                    <Order/>
                </Route>
            </Switch>
            <Footer/>
        </div>




    </>
  );
}

export default App;
