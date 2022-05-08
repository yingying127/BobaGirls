import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, products, lineitems, cart }) => (
  <div className="navbar">
    <nav>
      {isLoggedIn ? (
        <div className="nav-flex">
          {/* The navbar will show these links after you log in */}
          <div className='nav-first'>
            <ul className='nav-top-level'>
              <li><Link to="/home"> Home </Link></li>
              <li>Shop
                <ul className='nav-dropdown'>
                  <li><Link to='/teas'> Teas </Link></li>
                  <li><Link to='/toppings'> Toppings </Link></li>
                  <li><Link to='/syrups'> Syrups </Link></li>
                  <li><Link to='/milkpowder'> Milk Powder</Link></li>
                  <li><Link to='/merchandise'> Merchandise </Link></li>
                  <li><Link to='/products'> All Products </Link></li>
                </ul>
              </li>
            </ul>
          </div>
          <Link to="/home"> <img src="/images/logo-boba-girl.svg"/> </Link>        
          <div>
            <ul className='nav-top-level'>
              <li><Link to='/profile'> Profile </Link></li>
              <li><Link to='/orders'>Orders</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to='/checkout'> Check Out </Link></li>
              <li><a href="#" onClick={handleClick}>
                Logout
              </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="nav-flex">
          {/* The navbar will show these links before you log in */}
          <div className='nav-first'>
            <ul className='nav-top-level'>
              <li><Link to="/home"> Home </Link></li>
              <li>Shop
                <ul className='nav-dropdown'>
                  <li><Link to='/teas'> Teas </Link></li>
                  <li><Link to='/toppings'> Toppings </Link></li>
                  <li><Link to='/syrups'> Syrups </Link></li>
                  <li><Link to='/milkpowder'> Milk Powder</Link></li>
                  <li><Link to='/merchandise'> Merchandise </Link></li>
                  <li><Link to='/products'> All Products </Link></li>
                </ul>
              </li>
              <li><Link to='/about'>About</Link></li>
            </ul>
          </div>
          <Link to="/home"> <img src="/images/logo-boba-girl.svg"/> </Link>
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">  Cart</Link>
          </div>
        </div>
      )}
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
