import React, { Component } from "react";

import service from "api/service";
import Button from "components/Button/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import "./PostDetails.scss";
import Modal from "components/Modal/Modal";
import Field from "components/Field/Field";
import fbService from "api/fbService";

export class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      titleValue: "",
      descValue: "",
    };
    this.modal = React.createRef();
  }

  componentDidMount() {
    fbService.getPost(this.props.match.params.postId).then((data) => {
      this.setState({
        data: data,
        titleValue: data.title,
        descValue: data.body,
      });
    });
  }

  openModal = () => {
    this.modal.current.openModal();
  };

  savePost = () => {
    fbService.updatePost(this.state.data.i, {
      ...this.state.data,
      title: this.state.titleValue,
      body: this.state.descValue,
    });
    this.modal.current.closeModal();
  };

 changeValue = (name,value) => {
   console.log(value);
   console.log(name);
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { data, titleValue, descValue } = this.state;

    if (!data) {
      return (
        <div className="app-loader-container container">
          <div className="app-loader"></div>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="post-detail">
          <h2 className="post-detail__title">{data.title}</h2>
          <p className="post-detail__desc">{data.body}</p>
        </div>
        <div className="post-detail__buttons">
          <Button className="is-primary is-icon-right" onClick={this.openModal}>
            <EditIcon />
            <span>Edit post</span>
          </Button>
          {/* <Button className="is-primary is-icon-right"> 
            <DeleteIcon/>
            <span>Delete post</span>
          </Button> */}
        </div>

        <Modal
          ref={this.modal}
          modalTitle="Edit post"
          className="edit-modal"
          modalFunction={this.savePost}
          functionButtonTitle="Save"
          showTopCloseButonn={false}
          showBottomCloseButonn={true}
          showBottomCloseButonnTitle="Close"
        >
          <Field
            type="text"
            placeholder="Entry your new post title..."
            label="Post title"
            id="postTitle"
            value={titleValue}
            onChange={(e) =>  this.setState({titleValue: e.target.value})}
          /> 
          <Field
            type="textarea"
            placeholder="Entry your new post description..."
            label="Post description"
            id="postDescription"
            value={descValue}
            onChange={(e) => this.changeValue("descValue", e.target.value)}
          />
        </Modal>
      </div>
    );
  }
}

export default PostDetails;
