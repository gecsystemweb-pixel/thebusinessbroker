import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
import { ToastProvider } from "./ToastContext.jsx";
import Home from "./pages/Home.jsx"; import Desks from "./pages/Desks.jsx"; import About from "./pages/About.jsx";
import How from "./pages/How.jsx"; import Network from "./pages/Network.jsx"; import Initiatives from "./pages/Initiatives.jsx"; import Contact from "./pages/Contact.jsx";

const Soon = ({ title }) => <main className="wrap section"><h1>{title}</h1><p className="lede">This page is next in the build.</p></main>;

export default function App() {
  return (<>
    <Navbar />
    <ToastProvider>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/>
          <Route path="/what-we-broker" element={<Desks/>}/><Route path="/how-we-work" element={<How/>}/>
          <Route path="/network" element={<Network/>}/>
          <Route path="/initiatives" element={<Initiatives/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="*" element={<Soon title="Page not found"/>}/>
        </Routes>
      </ErrorBoundary>
    </ToastProvider>
    <Footer />
  </>);
}
