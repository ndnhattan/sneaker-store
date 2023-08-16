import { Outlet } from "react-router-dom";
import { Footer, Header, Bubble } from "../../components/general";

const Public = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <Bubble />
    </div>
  );
};

export default Public;
