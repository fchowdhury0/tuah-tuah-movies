import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ActivationPage = () => {
  const [status, setStatus] = useState(null);
  const location = useLocation();
    const navigate = useNavigate();

    const HARD_CODED_TOKEN = "ksnslkam123@nks$1ad";
    
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get("token");
      //const token = "ksnslkam123@nks$1ad";
      console.log('token; \n', token);

    if (token) {
	if (token == HARD_CODED_TOKEN) {
	    setStatus("Account activated successfully!");
	    navigate('/login');
	} else {
	    setStatus("Invalid or expired token. Please check the activation link.");
      }
    } else {
      setStatus("No token found. Please check your activation link.");
    }

      if (token) {
	  axios.get(`http://localhost:8080/api/auth/activate-account?token=${token}`)
        .then((response) => {
          setStatus("Account activated successfully!");
          navigate('/login');
        })
        .catch((error) => {
          console.error("Error activating account:", error);
          setStatus("Error activating account. Please try again.");
        });
    } else {
      setStatus("No token found. Please check your activation link.");
    }
  }, [navigate, location.search]);
	// Make an API call to activate the account
//	axios.get(`http://localhost:8080/api/auth/activate-account?token=${token}`)
//        .then((response) => {
//            setStatus("Account activated successfully!");
//	    setMessage('Account activated successfully. You can now log in.');
//	    navigate('/login');
//        })
//          .catch((error) => {
//              setStatus("Error activating account. Please try again.");
//        });
//    }


  return (
    <div>
      <h1>Account Activation</h1>
      <p>{status ? status : "Activating your account..."}</p>
    </div>
  );
};

export default ActivationPage;
