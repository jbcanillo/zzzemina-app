const Footer = () => {
  return (
    <footer className="footer bg-base-200 text-base-content p-5">
      <aside>
        <svg
          fill="#000000"
          version="1.1"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          className="fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 297.136 297.136"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          enable-background="new 0 0 297.136 297.136"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <path d="m232.515,264.944l-28.297-8.784 28.131-8.732c8.664-2.823 13.4-12.137 10.578-20.8-2.824-8.665-12.137-13.4-20.801-10.577l-73.559,22.834-73.558-22.835c-8.664-2.823-17.977,1.912-20.801,10.577-2.822,8.663 1.914,17.977 10.578,20.8l28.131,8.732-28.297,8.784c-8.664,2.822-13.4,12.136-10.576,20.799 2.822,8.664 12.135,13.4 20.799,10.577l73.725-22.886 73.725,22.886c8.664,2.823 17.977-1.913 20.799-10.577 2.824-8.663-1.913-17.976-10.577-20.798z"></path>{" "}
              <path d="m121.648,209.237c0-40.52 27.011-79.78 27.011-79.78s27.017,39.26 27.017,79.78c79.605,0 75.389-79.648 56.217-120.303-4.033-8.553-15.586-10.06-21.662-2.817-15.578,18.572-34.005,29.066-34.005,29.066s14.598-42.873-14.38-86.78c-8.439-12.789-21.273-21.456-32.278-26.998-8.696-4.379-18.991,2.018-18.813,11.754 0.755,41.521-29.282,66.196-43.839,88.024-27.014,40.521-13.509,108.054 54.732,108.054z"></path>{" "}
            </g>{" "}
          </g>
        </svg>
        <p>
          <b>CaveMan Tech Ltd.</b>
          <br />
          <span className="text-xs">
            <i>Providing innovative solutions since Ice Age</i>
            <br />© {new Date().getFullYear()} All Rights Reserved.
          </span>
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Web Design</a>
        <a className="link link-hover">App Development</a>
        <a className="link link-hover">Consultancy</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact us</a>
        <a className="link link-hover">Jobs</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Refund policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
