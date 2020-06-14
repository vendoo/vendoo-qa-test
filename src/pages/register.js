import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const securityQuestions = [
  { q: "1 + 4 = ?", a: 5 },
  { q: "6 - 2 = ?", a: 4 },
  { q: "5 + 9 = ?", a: 14 },
  { q: "7 + 6 = ?", a: 13 },
];

export default function Login() {
  const [formError, setFormError] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    security: "",
  });
  const [securityQuestion] = useState(() => {
    return securityQuestions[
      Math.floor(Math.random() * securityQuestions.length)
    ];
  });
  const handleSubmit = (evt) => {
    console.log(typeof formValues.security);
    if (formValues.security !== String(securityQuestion.a)) {
      setFormError("Incorrect Security Answer");
    } else if (!formValues.email) {
      setFormError("Missing Email");
    } else if (!formValues.password) {
      setFormError("Missing Password");
    } else {
      setFormError("");
    }
    evt.preventDefault();
  };
  const handleOnChange = (value) => (evt) =>
    setFormValues({ ...formValues, [value]: evt.currentTarget.value });
  return (
    <div className="container">
      <Head>
        <title>Register</title>
      </Head>
      <div>
        <h1>Vendoo Register</h1>
        <p>Create a new account</p>
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
          <div>
            <div>
              <label htmlFor="security" suppressHydrationWarning>
                (Security) {securityQuestion.q}
              </label>
            </div>
            <input
              type="number"
              id="security"
              placeholder="Please solve the math problem"
              onChange={handleOnChange("security")}
              value={formValues.security}
            />
          </div>
          {formError && (
            <div style={{ color: "red" }}>FORM ERROR: {formError}</div>
          )}
          <button>Register</button>
        </form>
        <div>
          <strong>Need to have an account?</strong>
          <br />
          <Link href="/">
            <a>Login</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
