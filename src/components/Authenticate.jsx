import { useState } from "react";

export default function Authenticate({ token }) {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUserName] = useState(null);

  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setSuccessMessage(result.message);
      setUserName(result.data.username);
    } catch (error) {
      setError(error);
    }
  }
  return (
    <div className="parent">
      <h2>Authenticate</h2>
      {error && <p>{error}</p>}
      <button onClick={handleClick} disabled={!token}>
        Autenticate Token
      </button>
      {successMessage && <p>{`${username} Has Been ${successMessage}`}</p>}
    </div>
  );
}
