import React from "react";
import { IProduct } from "@/interfaces/Product.interface";
import { PRODUCTS } from "../../../../mocks/Product.mock";
import { Link } from "react-router-dom";

function Questions() {
  const product: IProduct = PRODUCTS[4];

  return (
    <section className="container">
      <div className="row g-3">
        <div className="col-6">
          <div className="card mb-2">
            <div className="card-body">
              <h5 className="card-title">New Feature</h5>
            </div>
          </div>
        </div>
      </div>
      {product.features.map((feature, key) => (
        <div key={key} className="row g-3">
          <div className="col-6">
            <div className="card mb-2">
              <div className="card-body">
                <h5 className="card-title">{feature.pos_quest}</h5>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card mb-2">
              <div className="card-body">
                <h5 className="card-title">{feature.neg_quest}</h5>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Link to="../invitations">
        <button type="button" className="btn btn-primary">
          Next
        </button>
      </Link>
    </section>
  );
}

export default Questions;
