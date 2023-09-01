import React from "react";
import { IProduct } from "@/interfaces/Product.interface";
import { PRODUCTS } from "../../../../mocks/Product.mock";
import { Link } from "react-router-dom";

function Invitations() {
  const product: IProduct = PRODUCTS[4];

  return (
    <section className="container">
      <div className="row g-3">
        <div className="col-7">
          <div className="card mb-2">
            <div className="card-body">
              <h5 className="card-title">New Invitation</h5>
            </div>
          </div>
          {product.invitations.map((invitation, key) => (
            <div key={key} className="card mb-2">
              <div className="card-body">
                <h5 className="card-title">{invitation.email}</h5>
              </div>
            </div>
          ))}
        </div>
        <div className="col-5">
          LINK TO SHARE
          <Link to="results">
            <button type="button" className="btn btn-primary">
              Next
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Invitations;
