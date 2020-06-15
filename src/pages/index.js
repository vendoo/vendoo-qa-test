import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { useState } from "react";

import Firebase from "../firebase/app";

export default function Login() {
  const router = useRouter();
  const [formError, setFormError] = useState("");
  const [formState, setFormState] = useState({ status: "idle" });
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const { email, password } = formValues;
    if (!email) {
      setFormError("Missing Email");
    } else if (!password) {
      setFormError("Missing Password");
    } else {
      setFormError("");
    }
    setFormState({ status: "submitting" });
    try {
      const res = await Firebase.auth.signInWithEmailAndPassword(
        email,
        password
      );
      if (res.user.uid) {
        router.push("/inventory");
      }
    } catch (error) {
      setFormError(error.message ? error.message : "An error occured");
      setFormState({ status: "idle" });
      return;
    }
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
          {formError && (
            <div style={{ color: "red" }}>FORM ERROR: {formError}</div>
          )}
          {formState.status === "submitting" && <div>Submitting...</div>}
          {formState.status === "idle" && <button>Login</button>}
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
