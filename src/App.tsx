import { useEffect, useState } from "react";
import CHAWProjectPage from "./components/CHAWProjectPage";
import HomePage from "./components/HomePage";

const CHAW_ROUTE = "projects/chaw";

const getCurrentRoute = () =>
  window.location.hash.replace(/^#\/?/, "").replace(/\/$/, "");

const App = () => {
  const [route, setRoute] = useState(getCurrentRoute);

  useEffect(() => {
    const syncRoute = () => setRoute(getCurrentRoute());

    window.addEventListener("hashchange", syncRoute);
    return () => window.removeEventListener("hashchange", syncRoute);
  }, []);

  useEffect(() => {
    document.title = route === CHAW_ROUTE ? "CHAW | Mili Khatri" : "Mili Khatri";
    window.scrollTo(0, 0);
  }, [route]);

  const navigateHome = () => {
    window.history.pushState({}, "", window.location.pathname);
    setRoute("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (route === CHAW_ROUTE) {
    return <CHAWProjectPage onBack={navigateHome} />;
  }

  return <HomePage />;
};

export default App;
