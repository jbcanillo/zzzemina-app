import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1 container mx-auto mt-12">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
