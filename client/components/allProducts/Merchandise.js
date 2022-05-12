import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "/client/store";

const Merchandise = ({ products, addToCart }) => {
  return (
    <div className="content">
      <h1 className="product1">Merchandise</h1>
      {
        <div>
            <ul className="teaproducts">
            {products
                .filter((product) => product.key === "merchandise")
                .map((product) => {
                return (
                    <li className="teadiv" key={product.id}>
                    <img src={product.imageUrl} />

                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                    <div className="teaprice">${product.price}</div>

                    <button
                        className="addtocart"
                        onClick={() => addToCart(product)}
                    >
                        Add To Cart
                    </button>
                    </li>
                );
                })}
            </ul>
        </div>
      }
    </div>
  );
}

const mapState = ({ products }) => {
  return {
    products,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    addToCart: (product, quantity) =>
      dispatch(addToCart(product, quantity, history)),
  };
};

export default connect(mapState, mapDispatch)(Merchandise);
