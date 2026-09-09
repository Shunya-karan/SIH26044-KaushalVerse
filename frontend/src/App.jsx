import { BrowserRouter, Routes, Route } from "react-router-dom";

function Home() {
  return <h1>KaushalVerse Home</h1>;
}

function Login() {
  return <h1>Login Page</h1>;
}

function Dashboard() {
  return <h1>Dashboard Page</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;