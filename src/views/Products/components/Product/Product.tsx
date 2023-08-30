import React from "react";
import { IProduct } from "@/interfaces/Product.interface";

interface ProductProps {
  product?: IProduct;
}

function Product({ product }: ProductProps) {
  return (
    <div className={`card`}>
      <div className="card-body">
        <h5 className="card-title">{product?.name}</h5>
        <p className="card-text">{product?.description}</p>
      </div>
    </div>
  );
}

export default Product;
