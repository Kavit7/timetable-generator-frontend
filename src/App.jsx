import { useEffect, useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";
import AppRoute from "./routes/AppRoute";
import Splash from "./pages/Splash";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Splash />;
  }

  return (
    <AuthProvider>
      <AppRoute />
    </AuthProvider>
  );
}
export default App;
