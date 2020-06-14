import Head from "next/head";
import Link from "next/link";

import { useState } from "react";

export default function Login() {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(formValues);
  };
  const handleOnChange = (value) => (evt) =>
    setFormValues({ ...formValues, [value]: evt.currentTarget.value });
  return (
    <div className="container">
      <Head>
        <title>Login</title>
      </Head>
      <div>
        <h1>Vendoo Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              onChange={handleOnChange("email")}
              value={formValues.email}
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={handleOnChange("password")}
              value={formValues.password}
            />
          </div>
          <button>Login</button>
        </form>
        <div>
          <strong>Need to Register?</strong>
          <br />
          <Link href="/register">
            <a>Create new account</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
