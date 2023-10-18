import React from 'react';

import { IProduct } from '@/interfaces/Product.interface';
import { PRODUCTS } from '../../../../mocks/Product.mock';
import Matrix from '../Matrix/Matrix';

function Results() {
  const product: IProduct = PRODUCTS[4];

  return (
    <section className="container">
      <Matrix />
      <div className="row">
        <div className="col-4">
          <h3 className="text-center">MUST HAVE</h3>
          {product.features.slice(0, 3).map((feature, key) => (
            <div key={key} className="card mb-2">
              <div className="card-body">
                <h5 className="card-title">{feature.name}</h5>
                <p className="card-text">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="col-4">
          <h3 className="text-center">PERFORMANCE</h3>
          {product.features.slice(3, 6).map((feature, key) => (
            <div key={key} className="card mb-2">
              <div className="card-body">
                <h5 className="card-title">{feature.name}</h5>
                <p className="card-text">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="col-4">
          <h3 className="text-center">IRRELEVANT</h3>
          {product.features.slice(6, 10).map((feature, key) => (
            <div key={key} className="card mb-2">
              <div className="card-body">
                <h5 className="card-title">{feature.name}</h5>
                <p className="card-text">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Results;
