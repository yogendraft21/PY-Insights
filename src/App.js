import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";


import Navbar from "./components/navbar";
import Checkout from "./pages/checkout";
import SearchResultPage from "./pages/searchResult";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="p-4 pl-10 pr-10 media">
          <Navbar />
          <Routes>
            <Route path="/" element={<SearchResultPage />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
