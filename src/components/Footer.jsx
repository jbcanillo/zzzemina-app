const Footer = () => {
  return (
    <footer className="footer bg-base-200 text-base-content text-neutral-content p-10">
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
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
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
      </nav>
    </footer>

    // <footer className="footer bg-base-200 text-base-content p-5 flex flex-col lg:flex-row justify-between">
    //   <aside>
    //     <svg
    //       fill="#000000"
    //       version="1.1"
    //       width="50"
    //       height="50"
    //       viewBox="0 0 24 24"
    //       xmlns="http://www.w3.org/2000/svg"
    //       fillRule="evenodd"
    //       clipRule="evenodd"
    //       className="fill-current"
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 297.136 297.136"
    //     >
    //       <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    //       <g
    //         id="SVGRepo_tracerCarrier"
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //       ></g>
    //       <g id="SVGRepo_iconCarrier">
    //         {" "}
    //         <g>
    //           {" "}
    //           <path d="m232.515,264.944l-28.297-8.784 28.131-8.732c8.664-2.823 13.4-12.137 10.578-20.8-2.824-8.665-12.137-13.4-20.801-10.577l-73.559,22.834-73.558-22.835c-8.664-2.823-17.977,1.912-20.801,10.577-2.822,8.663 1.914,17.977 10.578,20.8l28.131,8.732-28.297,8.784c-8.664,2.822-13.4,12.136-10.576,20.799 2.822,8.664 12.135,13.4 20.799,10.577l73.725-22.886 73.725,22.886c8.664,2.823 17.977-1.913 20.799-10.577 2.824-8.663-1.913-17.976-10.577-20.798z"></path>{" "}
    //           <path d="m121.648,209.237c0-40.52 27.011-79.78 27.011-79.78s27.017,39.26 27.017,79.78c79.605,0 75.389-79.648 56.217-120.303-4.033-8.553-15.586-10.06-21.662-2.817-15.578,18.572-34.005,29.066-34.005,29.066s14.598-42.873-14.38-86.78c-8.439-12.789-21.273-21.456-32.278-26.998-8.696-4.379-18.991,2.018-18.813,11.754 0.755,41.521-29.282,66.196-43.839,88.024-27.014,40.521-13.509,108.054 54.732,108.054z"></path>{" "}
    //         </g>{" "}
    //       </g>
    //     </svg>
    //     <p>
    //       <b>CaveMan Tech Ltd.</b>
    //       <br />
    //       <span className="text-xs">
    //         <i>Providing innovative solutions since Ice Age</i>
    //         <br />© {new Date().getFullYear()} All Rights Reserved.
    //       </span>
    //     </p>
    //   </aside>
    //   <nav>
    //     <h6 className="footer-title">Legal</h6>
    //     <a className="link link-hover">Terms of use</a>
    //     <a className="link link-hover">Privacy policy</a>
    //     <a className="link link-hover">Refund policy</a>
    //   </nav>
    // </footer>
  );
};

export default Footer;
