import { Link } from "react-router";
import Container from "../../../Components/Container/Container";
import logo from "../../../assets/AICraftLogo.png";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-neutral ">
      <Container>
        <footer className="footer sm:footer-horizontal p-10 text-white md:justify-around">
          <nav className="footer bg-black text-white border-base-300  border-y border-y-gray-500 px-10 py-2">
            <aside className="md:grid-flow-col items-center">
              <div>
                <img className="w-24 h-24 rounded-3xl" src={logo} alt="" />
              </div>
              <p>
                <span className="text-lg font-semibold"> Ai Craft Ltd.</span>
                <br />
                Trusted technology solutions since 1992
              </p>
            </aside>
            <div className="md:place-self-start md:justify-self-end">
              <div className="grid grid-flow-col gap-4">
                <a
                  href="https://github.com/RahidulRIP?tab=repositories"
                  target="_blank"
                >
                  <FaGithub
                    size={24}
                    className="hover:text-gray-700 transition-colors duration-200"
                  />
                </a>
                <a>
                  <FaXTwitter
                    size={24}
                    className="hover:text-gray-700 transition-colors duration-200"
                  />
                </a>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                </a>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </nav>
          <nav>
            <h6 className="footer-title">Services</h6>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav>
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav>
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </footer>
      </Container>
    </div>
  );
};

export default Footer;
