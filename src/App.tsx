import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { ThemeProvider } from "./components/layout/theme-provider";
import { AuthContextProvider } from "./components/auth/auth-context";
import { RequiresAuth } from "./components/auth/require-auth";
import { ProfilePage } from "./pages/profile";
import "./App.css";
import { CallbackPage } from "./pages/callback";
import { Layout } from "./components/layout/layout";

const App = () => (
  <ThemeProvider storage={localStorage}>
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/callback" element={<CallbackPage />} />
            <Route path="/profile" element={<RequiresAuth redirectTo="/" />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </ThemeProvider>
);

export default App;
