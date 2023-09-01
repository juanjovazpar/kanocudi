import React from "react";
import { IProduct } from "@/interfaces/Product.interface";
import Product from "./components/Product/Product";
import { PRODUCTS } from "../../../../mocks/Product.mock";
import { Link } from "react-router-dom";

function Products() {
  const products: IProduct[] = PRODUCTS;

  return (
    <section className="container">
      <div className="row g-3">
        <div className="col-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">NEW PRODUCT</h5>
              <p className="card-text">Create new product</p>
            </div>
          </div>
        </div>
        {products.map((product: IProduct, key: number) => (
          <Link to={product.id} key={key} className="col-3">
            <Product product={product} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Products;
