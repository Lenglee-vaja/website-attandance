import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";
const Layout = ({ children }) => {
  return (
    <div>
        <Header />
      <div style={{ minHeight: "100%" }}>{children}</div>
        <Footer />
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.node,
};
export default Layout;
