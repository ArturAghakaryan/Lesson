import React, { Component } from "react";

import Button from "components/Button/Button";
import Box from "components/Box/Box";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";
import Modal from "components/Modal/Modal";
import Field from "components/Field/Field";
import fbService from "api/fbService";

import "./Posts.scss";

const endAt = 8;

export class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      startAt: 0,
      hesMore: false,
      loading: false,
      titleValue: "",
      descValue: "",
      modalNumber: null,
      totalItem: endAt,
      switcherOpen: false,
      showButtons: false,
    };
    this.modal = React.createRef();
    this.removeModal = React.createRef();
  }

  componentDidMount() {
    fbService.getPosts(this.state.startAt, endAt).then((data) => {
      this.setState({
        posts: data,
        hesMore: data.length <= endAt ? false : true,
      });
    });
  }

  openModal = () => {
    this.modal.current.openModal();
  };

  openRemoveModal = (modalNumber) => {
    this.setState({
      modalNumber: modalNumber,
    });
    this.removeModal.current.openModal();
  };

  changeValue = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  createPost = () => {
    fbService
      .createPost({
        title: this.state.titleValue,
        body: this.state.descValue,
        userId: 1,
      })
      .then((data) => {
        this.setState({
          posts: [...this.state.posts, data],
        });
      });
    this.modal.current.closeModal();
  };

  deletePost = (id) => {
    fbService.deletePost(id, 0, this.state.totalItem).then((data) => {
      this.setState({
        posts: data,
        modalNumber: null,
        hesMore: data.length <= this.state.totalItem ? false : true,
      });
    });
    this.removeModal.current.closeModal();
  };

  getMore = () => {
    const newStartAt = this.state.startAt + endAt + 1;
    const newEndAt = newStartAt + endAt;

    this.setState({
      startAt: newStartAt,
      loading: true,
      totalItem: newEndAt,
    });

    fbService.getPosts(newStartAt, newEndAt).then((data) => {
      this.setState({
        posts: [...this.state.posts, ...data],
        hesMore: data.length <= endAt ? false : true,
        loading: false,
      });
    });
  };

  chnageDashbord = (name) => {
    this.setState({
      [name]: this.state[name] ? false : true,
    });
  };

  render() {
    const { loading, hesMore, posts, switcherOpen, showButtons } = this.state;
    if (!posts) {
      return (
        <div className="app-loader-container container">
          <div className="app-loader"></div>
        </div>
      );
    }

    if (posts.length === 0) {
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
          {showButtons && (
            <div className="posts-settings-buttons">
              <Button className="btn-post" onClick={this.openModal}>
                Create post
              </Button>
            </div>
          )}
          <div className="posts-items">
            {posts.map((el) => {
              {
                return (
                  <div key={el.id + 1} className="posts-item">
                    {showButtons && (
                      <Button
                        className="is-primary posts-item__remove-btn"
                        onClick={() => {
                          this.openRemoveModal(el.id);
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    )}
                    <Box box={"post"} data={el} />
                  </div>
                );
              }
            })}
          </div>
          <Modal
            ref={this.removeModal}
            modalTitle="delete post"
            className="delete-modal"
            modalFunction={() => {
              this.deletePost(this.state.modalNumber);
            }}
            functionButtonTitle="yes"
            showTopCloseButton={false}
            showBottomCloseButonnTitle="No"
          >
            Do you want to delete this post?
          </Modal>
          <Modal
            ref={this.modal}
            modalTitle="Add post"
            className="add-modal"
            modalFunction={this.createPost}
            functionButtonTitle="Save"
            showBottomCloseButonnTitle="Close"
          >
            <Field
              type="text"
              placeholder="Entry your new post title..."
              label="Post title"
              id="postTitle"
              onChange={(e) => this.changeValue("titleValue", e.target.value)}
            />
            <Field
              type="textarea"
              placeholder="Entry your new post description..."
              label="Post description"
              id="postDescription"
              onChange={(e) => this.changeValue("descValue", e.target.value)}
            />
          </Modal>
          <div className="posts-load-more">
            {loading && (
              <div className="app-loader-container">
                <div className="app-loader"></div>
              </div>
            )}
            {hesMore && !loading && (
              <Button
                className="is-primary btn-load-more"
                onClick={this.getMore}
              >
                Get More
              </Button>
            )}
          </div>
        </div>
        <div className={`switcher ${switcherOpen ? "is-open" : ""}`}>
          <Button
            className="is-primary switcher__btn"
            onClick={() => this.chnageDashbord("switcherOpen")}
          >
            <SettingsIcon />
          </Button>
          <div className="switcher__contnet">
            <Field
              id="editableDashbord"
              type="checkbox"
              onChange={() => this.chnageDashbord("showButtons")}
            />
            <label htmlFor="editableDashbord">Show adminsteratin variant</label>
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
