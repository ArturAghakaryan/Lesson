import React, { Component } from "react";
import { BrowserRouter} from "react-router-dom";

import Header from "./containers/Layout/Header/Header";
import Layout from "./components/Layout/Layout";
import Footer from "./containers/Layout/Footer/Footer";
import AppRoutes from "routes/AppRoutes";
//import Icon from "components/Icon/Icon";

import "./styles/_all.scss";

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Layout>
          <AppRoutes />
        </Layout>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
