import React from "react";
import { IProduct } from "@/interfaces/Product.interface";
import { PRODUCTS } from "../../../../mocks/Product.mock";
import { Link } from "react-router-dom";

function Products() {
  const product: IProduct = PRODUCTS[4];

  return (
    <section className="container">
      <div className="row g-3">
        <div className="col-7">
          <div className="card mb-2">
            <div className="card-body">
              <h5 className="card-title">New Feature</h5>
            </div>
          </div>
          {product.features.map((feature, key) => (
            <div key={key} className="card mb-2">
              <div className="card-body">
                <h5 className="card-title">{feature.name}</h5>
                <p className="card-text">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="col-5">
          <Link to="questions">
            <button type="button" className="btn btn-primary">
              Next
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Products;
