import React from "react";

import Header from "./containers/Layout/Header/Header";
import Layout from "./components/Layout/Layout";
import Footer from "./containers/Layout/Footer/Footer";
import Posts from "containers/Pages/Posts/Posts";

import "./styles/_all.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <Layout>
        <Posts />
      </Layout>
      <Footer />
    </div>
  );
}

export default App;
