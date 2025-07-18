import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";

function AppContent() {
  return (
    <div className="min-h-screen">
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
