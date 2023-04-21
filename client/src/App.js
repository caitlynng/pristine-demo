import { BrowserRouter, Routes, Route} from "react-router-dom";

import { Error, Landing } from "./pages";
import {
  SharedLayout,
  Analytics,
  Reports,
  Statements,
  Settings,
  Uploads,
  Dashboard
} from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/demo"
          element={
              <SharedLayout />
          }
        >
          <Route index element={<Analytics />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="statements" element={<Statements />}></Route>
          <Route path="reports" element={<Reports />}></Route>
          <Route path="uploads" element={<Uploads />}></Route>
          <Route path="settings" element={<Settings />}></Route>
        </Route>
        <Route path="/landing" element={<Landing />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
