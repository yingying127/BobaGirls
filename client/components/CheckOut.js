import React from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";
import { createShipping } from "../store/checkout";
import { Link } from "react-router-dom";

class CheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.user ? this.props.user.firstName : "",
      lastName: this.props.user ? this.props.user.lastName : "",
      email: this.props.user ? this.props.user.email : "",
      creditCard: this.props.user ? this.props.user.creditCard : "",
      address: this.props.user ? this.props.user.address : "",
      city: this.props.user ? this.props.user.city : "",
      state: this.props.user ? this.props.user.state : "",
      zipCode: this.props.user ? this.props.user.zipCode : "",
    };
    this.checkout = this.checkout.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.fetchCart();
  }
  checkout(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    this.props.createShipping({ ...this.state });
    this.setState(
      (this.state = {
        firstName: "",
        lastName: "",
        email: "",
        creditCard: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
      })
    );
  }
  render() {
    const { firstName, lastName, email, creditCard, address, city, state, zipCode } = this.state;
    const { cart, user } = this.props;
     const { checkout, handleSubmit } = this;
    return (
      <div>
        {cart.length !== 0 ? (
            <div>
              {/* {console.log('lineitem here', item)} */}
              {/* {console.log('cart here', cart)} */}
              {cart.isCart === true && cart.lineitems.length > 0 ? (
                <div>
                   {/* {console.log('inside in here')} */}
                  You have {cart.lineitems.length} items in your
                  <Link to={"/cart"}> Cart </Link>
                  <div> Your total is $</div>
                  <div> To continue checking out, fill out the below. </div>
                  <br/>
                  <div> SHIPPING INFORMATION </div>
                  <form
                    id="checkout"
                    className="checkout"
                    onSubmit={handleSubmit}
                  >
                    <label htmlFor="firstName"> First Name*: </label>
                    <input
                      name="firstName"
                      onChange={checkout}
                      value={firstName}
                      placeholder="First Name"
                      required
                    />
                    <br />
                    <label htmlFor="lastName"> Last Name*: </label>
                    <input
                      name="lastName"
                      onChange={checkout}
                      value={lastName}
                      placeholder="Last Name"
                      required
                    />
                    <br />
                    <label htmlFor="email"> Email*: </label>
                    <input
                      type="email"
                      name="email"
                      onChange={checkout}
                      value={email}
                      placeholder="E-mail"
                      required
                    />
                    <br />
                    <label htmlFor="creditCard"> Credit Card*: </label>
                    <input
                      name="creditCard"
                      onChange={checkout}
                      value={creditCard}
                      placeholder="Credit Card Number"
                      required
                    />
                    <br />
                    <label htmlFor="address"> Address*: </label>
                    <input
                      name="address"
                      onChange={checkout}
                      value={address}
                      placeholder="Address"
                      required
                    />
                    <br />
                    <label htmlFor="city"> City*: </label>
                    <input
                      name="city"
                      onChange={checkout}
                      value={city}
                      placeholder="City"
                      required
                    />
                    <br />
                    <label htmlFor="state"> State*: </label>
                    <input
                      name="state"
                      onChange={checkout}
                      value={state}
                      placeholder="State"
                      required
                    />
                    <br />
                    <label htmlFor="zipCode"> Zip-code*: </label>
                    <input
                      name="zipCode"
                      onChange={checkout}
                      value={zipCode}
                      placeholder="Zip-code"
                      required
                    />
                    <br />
                    <button type="submit"> Complete Purchase </button>
                  </form>
                </div>
              ) : (
                <div>
                  {/* {console.log('in here')} */}
                  No items in your <Link to={"/cart"}> Cart </Link>! 
                  Try some of our <Link to={"/products"}> Products! </Link>
                </div>
              )}
            </div>
          ) : (
          <div>
              {/* {console.log('no out here')} */}
          No items in your <Link to={"/cart"}> Cart </Link>! 
          Try some of our <Link to={"/products"}> Products! </Link>
        </div>
        )} 
      </div>
    );
  }
}

const mapState = ({cart, users}, {match}) => {
  const user = users.find(user => user.id === match.params.id*1);
  return {
    user,
    cart,
  }
};

const mapDispatch = (dispatch, { history }) => ({
  fetchCart: (userId) => dispatch(fetchCart(userId)),
  createShipping: (information) => dispatch(createShipping(information, history)),
});

export default connect(mapState, mapDispatch)(CheckOut);
