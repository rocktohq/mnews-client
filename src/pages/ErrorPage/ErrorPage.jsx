import { Helmet } from "react-helmet-async";
import Container from "../../components/shared/Container";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import notFound from "../../assets/animation/notFound.json";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Helmet>
        <title>404</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-md mx-auto">
          <Lottie animationData={notFound} loop={false} />
        </div>
        <div className="mt-5 space-x-5">
          <button
            onClick={() => navigate(-1)}
            className="rounded btn btn-outline btn-primary"
          >
            <AiFillHome />
            &nbsp;Back
          </button>
          <Link to="/">
            <button className="rounded btn btn-primary">
              <AiFillHome />
              &nbsp;Go to Home
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default ErrorPage;
