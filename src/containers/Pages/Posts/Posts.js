import React, { Component } from "react";

import Button from "components/Button/Button";
import Box from "components/Box/Box";
import service from "api/service";

import "./Posts.scss";

const limit = 9;

export class Posts extends Component {
  state = {
    posts: null,
    start: 0,
    hesMore: true,
    loading: false,
  };

  componentDidMount() {
    service.getPosts(this.state.start, limit).then((data) => {
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

  deletePost = (id) => {
    service.deletePost(id).then(() => {
      this.setState({
        posts: this.state.posts.filter((el) => {
          return el.id !== id;
        }),
      });
    });
  };

  getMore = () => {
    const newstart = this.state.start + limit;

    this.setState({
      start: newstart,
      loading: true,
    });

    service.getPosts(newstart, limit).then((data) => {
      this.setState({
        posts: [...this.state.posts, ...data],
        hesMore: data.length < limit ? false : true,
        loading: false,
      });
    });
  };

  render() {
    const { loading, hesMore, posts } = this.state;

    if (!posts) {
      return (
        <div className="app-loader-container container">
          <div className="app-loader"></div>
        </div>
      );
    }

    if (posts.length === 0 ) {
      return (
        <div className="container">
          <div className="posts-inner">
            <p className="posts-no-result">No results</p>
          </div>
        </div>
      );
    }

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
            <Button className="btn-post" onClick={() => this.deletePost(2)}>
              Delete post
            </Button>
          </div>
          <div className="posts-items">
            {posts.map((el) => {
              return (
                <div key={el.id} className="posts-item">
                  <Box box={"post"} data={el} />
                </div>
              );
            })}
          </div>
          <div className="posts-load-more">
            {loading && (
              <div className="app-loader-container">
                <div className="app-loader"></div>
              </div>
            )}
            {hesMore && !loading && (
              <Button className="btn-load-more" onClick={this.getMore}>
                Get More
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
