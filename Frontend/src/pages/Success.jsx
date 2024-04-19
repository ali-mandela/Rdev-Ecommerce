import { Link } from "react-router-dom";


const Success = () => {
    return (
        <div className="ppage" >
          <h1>Payment Successful!</h1>
          <p>Thank you for your payment.</p>
          <Link to="/">Click to Go back to home</Link>
        </div>
      );
    };
export default Success