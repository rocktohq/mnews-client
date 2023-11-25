import Container from "../Container";

const Footer = () => {
  return (
    <footer className="py-8">
      <Container>
        <div>
          <p className="text-center">
            Copyright &copy;{" "}
            <span className="text-primary font-semibold">m</span>
            <span className="font-semibold">News</span>&trade; 2023. All right
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
