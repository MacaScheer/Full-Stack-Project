import React from "react";
import { findDOMNode } from 'react-dom';
import NavBarContainer from "../nav/nav_bar_container";
// import { Waypoint } from "react-waypoint";
import ProfileIndexItem from "./profile_index_item";
// import useInfiniteScroll from "./useInfiniteScroll";
import ProfileList from "./profile_list";
var debounce = require('debounce');


class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.currentUser = this.props.currentUser;
    this.logout = this.props.logout;
    this.handleNewPostForm = this.handleNewPostForm.bind(this);
    this.handleEditUser = this.handleEditUser.bind(this);
    this.state = {
      page: 2
    }
    this.getPosts = this.getPosts.bind(this)
    this.scroller = this.scroller.bind(this)

  }
  getPosts() {
    this.props.fetchProfilePosts(this.state.page, this.props.currentUser.id);
    this.setState = { page: (this.state.page += 1) }
  }

  componentDidMount() {
    this.getPosts()
    this.props.fetchNumPosts(this.props.currentUser.id);
    this.props.fetchUser(this.props.currentUser.id);
    // const scroll = document.getElementsByClassName('profile-photo-index')[0]
    // document.addEventListener('scroll', this.scroller)
    // scroll.addEventListener("scroll", this.scroller);
    // this.scroller();
    document.addEventListener('scroll', this.scroller)
    this.props.closeModal();
  }
  componentWillUnmount() {
    // const scroll = document.getElementsByClassName('profile-photo-index')[0]
    // scroll.removeEventListener('scroll', this.scroller)
    document.removeEventListener('scroll', this.scroller)
  }
  
  scroller() {
    // console.log("infiniteSCroller!")
    // window.onscroll = debounce(() => {
      let innerHeight = window.innerHeight;
      let { scrollHeight } = document.documentElement;
      let { offsetHeight } = document.documentElement;
      let { scrollTop } = document.documentElement;
      // debugger
    console.log("SCROLL!", innerHeight + scrollTop, offsetHeight)
      // if (
      //   window.innerHeight + document.documentElement.scrollTop ===
      //   document.documentElement.offsetHeight
      //  || window.scrollY > 90
      // ) {
      //   this.getPosts()
      // }
        // },10)
    // window.onscroll = function (ev) {
      console.log("Scrolling")
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      console.log("inside if logic")
        // you're at the bottom of the page
      this.getPosts()
    }
// };
    }

  handleNewPostForm(e) {
    e.preventDefault();
    let path = `/newpost`;
    this.props.history.push(path);
  }

  handleEditUser(e) {
    e.preventDefault();
    let path = `/edit-profile`;
    this.props.history.push(path);
  }

  render() {
    if (!this.props.profileUser) {
      return <h2 className="loading-bar">Loading...</h2>;
    }
    const {
      username,
      followerIds,
      followingIds
    } = this.props.profileUser;
    let userPhotos = this.props.userPosts.map(post => {
      return (
        <ProfileIndexItem post={post} key={post.photoUrl} openModal={this.props.openModal} />
      );
    });
    return (
      <div >
        {/* <NavBarContainer /> */}
        <div className="profile-wrap">
          <div className="profile-left"></div>
          <div className="profile-container">
            <div className="profile-top">
              <div className="profile-display-pic">
                <img
                  className="profile-display-pic"
                  src={this.props.profile_picture}
                />
              </div>
              <div className="profile-top-right">
                <div className="profile-top-up">
                  <h1>{username}</h1>
                  <div className="profile-top-buttons">
                    <button className="profile-button" onClick={this.logout}>
                      Log Out
                    </button>
                    <button
                      className="profile-button"
                      onClick={this.handleEditUser}
                    >
                      Edit Profile
                    </button>
                    <button
                      className="profile-button"
                      onClick={this.handleNewPostForm}
                    >
                      Add Photo
                    </button>
                  </div>
                </div>
                <div className="profile-top-down">
                  <span>{this.props.numPosts} posts</span>
                  <span className="">{followerIds.length} Followers</span>
                  <span className="">{followingIds.length} Following</span>
                </div>
              </div>
            </div>
            {/* <ProfileList props={this.props} getPosts={this.getPosts} /> */}
            <div className="profile-photo-index-container">
              <ul className="profile-photo-index">
                {userPhotos}
              </ul>
              {/* {isFetching && 'Fetching more images...'} */}
            </div>
          </div>
          <div className="profile-right"></div>
        </div>
        {/* <Waypoint onEnter={this.getPost}/> */}
      </div>
    );
  }
}

export default Profile;
