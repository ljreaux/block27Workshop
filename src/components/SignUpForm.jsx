import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (username.length < 8) {
        throw new Error("Please enter a username longer than 8 characters");
      }
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );
      const result = await response.json();

      setToken(result.token);

      setUserName("");
      setPassword("");
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  }
  return (
    <div className="parent">
      <h2>Sign Up</h2>
      {error ? <p>{error}</p> : null}
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Username:
          <input
            required
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
              if (username.length < 8) {
                setError("Please enter a username longer than 8 characters");
              } else {
                setError(null);
              }
            }}
          />
        </label>
        <label>
          Password:
          <input
            required
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <br />
        <label>
          <button>Submit</button>
        </label>
      </form>
    </div>
  );
}
