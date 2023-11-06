import {Route, Routes} from "react-router-dom";

import Markets from "./pages/Markets";
import Coin from "./pages/Coin";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Markets />} />
        <Route path="/coinXplore/coins/:id" element={<Coin />} />
        <Route path="/coinXplore/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
