import { IFilter } from "@/interfaces/Filter.interface";
import React from "react";
import { Outlet } from "react-router-dom";

function Authorized() {
  const filters: IFilter<string>[] = [
    {
      name: "name1",
      value: "value1",
    },
    {
      name: "name2",
      value: "value2",
    },
    {
      name: "name3",
      value: "value3",
    },
  ];

  return (
    <section className="container">
      <header>
        <h1>HEADER</h1>
      </header>
      <main>
        <section className="row">
          <h2>PRODUCTS</h2>
        </section>
        <section className="row mb-2">
          <div className="col-7 mb-2">
            <div className="input-group">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                Options
              </label>

              <input
                type="text"
                className="form-control"
                id="inputGroupSelect01"
              />
              <button className="btn btn-outline-secondary" type="button">
                Button
              </button>
            </div>
          </div>
          <div className="col-7">
            {filters.map((f) => (
              <span
                className="badge rounded-pill text-bg-primary me-1"
                key={f.value}
              >
                {f.name}
              </span>
            ))}
          </div>
        </section>
        <section className="row">
          <Outlet />
        </section>
      </main>
    </section>
  );
}

export default Authorized;
