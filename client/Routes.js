// library
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
// component
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import Cart from './components/Cart';
import Products from './components/Products';
import Product from'./components/Product';
import About from './components/About';
import Orders from './components/Orders';
import Order from './components/Order';
import CheckOut from './components/CheckOut';
import Profile from './components/Profile';
//products
import Merchandise from './components/allProducts/Merchandise';
import MilkPowders from './components/allProducts/MilkPowders';
import Syrups from './components/allProducts/Syrups';
import Teas from './components/allProducts/Teas';
import Toppings from './components/allProducts/Toppings';
// store
import { me, fetchCart, fetchProducts, fetchUsers, fetchOrders } from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    this.props.loadProducts();
    this.props.loadCart();
    this.props.loadOrders();
  }
  componentDidUpdate(){
    // STANNIE:: switch to socketio, its easier
    this.props.loadUsers();
    const url = window.location.origin;
    console.log(url);
    window.socket = new WebSocket(url.replace('http', 'ws'));
    window.socket.addEventListener('message', () => { 
      window.socket.send(JSON.stringify(window.localStorage.getItem('token')));
    });
    window.socket.addEventListener('message', ()=> {
      const message = JSON.parge(e.data);
      if (message.to){
        const action = {type: 'NEW_MESSAGE', message};
        this.props.dispatchAction(action);
      }
    })
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <main>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/products" exact component={Products} />
            <Route path="/products/:id" component={Product} />

            <Route path="/merchandise" component={Merchandise} />
            <Route path="/milkpowder" component={MilkPowders} />
            <Route path="/syrups" component={Syrups} />
            <Route path="/teas" component={Teas} />
            <Route path="/toppings" component={Toppings} />

            <Route path="/about" component={About} />            
            <Route path='/orders' component={Orders} />
            <Route path='/order/:id' component={Order} />
            <Route path='/checkout' component={CheckOut} />
            <Route path='/profile' component={Profile} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/about" component={About} />
            <Route path="/products" exact component={Products} />
            <Route path="/products/:id" component={Product} />

            <Route path="/merchandise" component={Merchandise} />
            <Route path="/milkpowder" component={MilkPowders} />
            <Route path="/syrups" component={Syrups} />
            <Route path="/teas" component={Teas} />
            <Route path="/toppings" component={Toppings} />

            <Route path="/cart" component={Cart} />
            <Route path="/about" component={About} />
          </Switch>
        )}
      </main>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  //console.log('state', state);
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    products: state.productsReducer,
    orders: state.ordersReducer
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    loadCart: () => dispatch(fetchCart()),
    loadProducts: () => dispatch(fetchProducts()),
    loadUsers: () => dispatch(fetchUsers()),
    loadOrders: () => dispatch(fetchOrders()),
    dispatchAction: (action) => dispatch(action),
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
