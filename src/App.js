import React from "react";

import Header from "./containers/Layout/Header/Header";
import Layout from "./components/Layout/Layout";
import Footer from "./containers/Layout/Footer/Footer";

import './styles/_all.scss';

function App() {
  return (
    <div className="App">
        <Header />
        <Layout>
          aaaa
        </Layout>
        <Footer />
    </div>
  );
}

export default App;
