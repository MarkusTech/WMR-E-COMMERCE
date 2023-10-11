import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../server";

const Activation = () => {
  const { Activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${server}/activation`, {
            Activation_token,
          });
          console.log(res.data.message);
        } catch (error) {
          setError(true);
        }
      };
      activationEmail();
    }
  }, [Activation_token]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created suceessfully!</p>
      )}
    </div>
  );
};

export default Activation;
