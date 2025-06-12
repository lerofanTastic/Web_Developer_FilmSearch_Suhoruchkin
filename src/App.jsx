import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { Movie } from "./components/Movie/Movie";
import { Series } from "./components/Series/Series";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SingleTarget } from "./components/SingleTarget/SingleTarget";
import { ThemeProvider } from "./context/Theme/themeContext";
import { Thanks } from "./components/Thanks/Thanks";
import { Error } from "./components/Error/Error";

function App() {
  return (
    <ThemeProvider>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/movie/:id" element={<SingleTarget />} />
          <Route path="/series" element={<Series />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
export default App;
