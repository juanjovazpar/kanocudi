import React from "react";

function SignUp() {
  const state = {
    username: "",
    email: "",
    password: "",
  };

  const handleChange = (e: any) => {};

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Signup Data:", state);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Sign Up</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={state.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={state.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
