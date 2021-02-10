import React, { Component } from "react";

import Box from "components/Box/Box";
import service from "api/service";

import "./Posts.scss";
import Button from "components/Button/Button";

export class Posts extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    service.getPosts(0,6).then((data) => {
      this.setState({
        posts: data,
      });
    });
  }

  createPost = () => {
    service
      .createPost({
        title: "foo",
        body: "bar",
        userId: 1,
      })
      .then((data) => {
        this.setState({
          posts: [...this.state.posts, data],
        });
      });
  };

  updatePost = () => {
    service.updatePost(1, { title: "New Title" }).then((data) => {
      const newPost = this.state.posts.map((el) => {
        if (el.id === data.id) {
          return data;
        }
        return el;
      });

      this.setState({
        posts: newPost,
      });
    });
  };

  deletePost = () => {
    service.deletePost(1).then((data) => {
      const newPost = this.state.posts

     newPost.splice(1, 1)

      this.setState({
        posts: newPost,
      });
    });
  };

  render() {
    return (
      <div className="container">
        <div className="posts-inner">
          <div className="posts-settings-buttons">
            <Button className="btn-post" onClick={this.createPost}>
              Create post
            </Button>
            <Button className="btn-post" onClick={this.updatePost}>
              Update post
            </Button>
            <Button className="btn-post" onClick={this.deletePost}>
              Delete post
            </Button>
          </div>
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
