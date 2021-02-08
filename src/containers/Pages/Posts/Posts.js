import React, { Component } from "react";

import Box from "components/Box/Box";

import "./Posts.scss";

export class Posts extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((resJson) => {
        this.setState({
          posts: resJson,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="posts-inner">
          <div className="posts-items">
            {this.state.posts.map((el) => {
              return (
                <div key={el.id} className="posts-item">
                  <Box box={"post"} data={el} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
