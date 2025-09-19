import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./elements/LandingPage";
import NewsSection from "./elements/articles/NewsSection";
import NewsArticlePage from "./elements/articles/NewsArticlePage";

export default function App() {

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/news" element={<NewsSection />} />
        <Route path="/news/:slug" element={<NewsArticlePage />} />
      </Routes>
    </BrowserRouter>
  );
}
