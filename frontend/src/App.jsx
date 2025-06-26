import "./App.css";
import Goals from "./components/Goals";
import Home from "./components/Home";
import About from "./components/About";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./components/NavBar";
import UpdateGoal from "./components/UpdateGoal";
import Profile from "./components/Profile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/goals",
      element: (
        <div className="app">
          <header className="app-header">
            <NavBar />
          </header>
          <main className="app-main">
            <div className="container">
              <Goals />
            </div>
          </main>
        </div>
      ),
    },
    {
      path: "/update",
      element: (
        <div className="app">
          <header className="app-header">
            <NavBar />
          </header>
          <main className="app-main">
            <div className="container">
              <UpdateGoal />
            </div>
          </main>
        </div>
      ),
    },
    {
      path: "/",
      element: (
        <div className="app">
          <header className="app-header">
            <NavBar />
          </header>
          <main className="app-main">
            <Home />
          </main>
        </div>
      ),
    },
    {
      path: "/signup",
      element: (
        <div className="app">
          <header className="app-header">
            <NavBar />
          </header>
          <main className="app-main form-page">
            <div className="form-container">
              <SignUp />
            </div>
          </main>
        </div>
      ),
    },
    {
      path: "/signin",
      element: (
        <div className="app">
          <header className="app-header">
            <NavBar />
          </header>
          <main className="app-main form-page">
            <div className="form-container">
              <SignIn />
            </div>
          </main>
        </div>
      ),
    },
    {
      path: "/aboutme",
      element: (
        <div className="app">
          <header className="app-header">
            <NavBar />
          </header>
          <main className="app-main">
            <div className="container">
              <Profile/>
            </div>
          </main>
        </div>
      ),
    },
    {
      path: "*",
      element: (
        <div className="app">
          <main className="app-main">
            <div className="container">
              <div className="error-page">
                <h1>404</h1>
                <h3>Page not found</h3>
                <p>The page you're looking for doesn't exist.</p>
              </div>
            </div>
          </main>
        </div>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
