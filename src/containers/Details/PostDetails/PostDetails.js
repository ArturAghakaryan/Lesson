import React, { Component } from "react";

import service from "api/service";

import "./PostDetails.scss";
import Button from "components/Button/Button";

export class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    service.getPost(this.props.match.params.postId).then((data) => {
      this.setState({
        data: data,
      });
    });
  }

  deletePost = (id) => {
    service.deletePost(id).then(() => {});
  };

  render() {
    const { data } = this.state;
    return (
      <div className="container">
        <div className="post-detail">
          <h2 className="post-detail__title" >{data["title"]}</h2>
          <p className="post-detail__desc">{data["body"]}</p>
        </div>
      </div>
    );
  }
}

export default PostDetails;
