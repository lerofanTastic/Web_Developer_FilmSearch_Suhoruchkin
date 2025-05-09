import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { Movie } from "./components/Movie/Movie";
import { Series } from "./components/Series/Series";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SingleTarget } from "./components/SingleTarget/SingleTarget";
// import { topAnime } from "./constants/topAnime";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/:id" element={<SingleTarget />} />
        <Route path="/series" element={<Series />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
