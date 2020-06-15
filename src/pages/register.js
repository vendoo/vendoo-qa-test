import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import Firebase from "../firebase/app";

const securityQuestions = [
  { q: "1 + 4 = ?", a: 5 },
  { q: "6 - 2 = ?", a: 4 },
  { q: "5 + 9 = ?", a: 14 },
  { q: "7 + 6 = ?", a: 13 },
];

export default function Login() {
  const router = useRouter();
  const [formState, setFormState] = useState({ status: "idle" });
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
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const { security, email, password } = formValues;
    if (security !== String(securityQuestion.a)) {
      setFormError("Incorrect Security Answer");
    } else if (!email) {
      setFormError("Missing Email");
    } else if (!password) {
      setFormError("Missing Password");
    } else {
      setFormError("");
    }
    setFormState({ status: "submitting" });
    let uid;
    try {
      const res = await Firebase.actions.register(email, password);
      uid = res.user.uid;
    } catch (error) {
      setFormError(
        error.message
          ? error.message
          : "An submit error occured. Please try again."
      );
      setFormState({ status: "idle" });
      return;
    }
    try {
      if (!uid) throw new Error("Missing UID");
      await Firebase.firestore.doc("users/" + uid).set({ email });
    } catch (error) {
      console.log(error.message ? error.message : error);
      setFormError("Failed creating your account");
      setFormState({ status: "idle" });
      return;
    }
    // Go to inventory
    router.push("/inventory");
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
          {formState.status === "idle" && <button>Register</button>}
          {formState.status === "submitting" && <div>Submitting...</div>}
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
