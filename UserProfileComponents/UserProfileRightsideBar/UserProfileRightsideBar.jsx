import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import css from "./UserProfileRightsideBar.module.css";

import {
  photosPage,
  followersPage,
  recentlyviewedPage,
  bookmarksPage,
  blogpostsPage,
  orderhistoryPage,
  myaddressPage,
  favoriteordersPage,
  bookingsPage,
} from "../../../helpers/constants";

import UserReviewedCard from "../../../utils/UserProfileUtils/UserProfile/Activity/UserReviewedCard/UserReviewedCard";
import UserPhotosCard from "../../../utils/UserProfileUtils/UserProfile/Activity/UserPhotosCard/UserPhotosCard";
import RecentlyViewed from "../../../utils/UserProfileUtils/UserProfile/Activity/RecentlyViewed/RecentlyViewed";
import UserBookmarks from "../../../utils/UserProfileUtils/UserProfile/Activity/UserBookmarks/UserBookmarks";
import UserBlogPosts from "../../../utils/UserProfileUtils/UserProfile/Activity/UserBlogPosts/UserBlogPosts";
import UserFollowersCard from "../../../utils/UserProfileUtils/UserProfile/Activity/UserFollowersCard/UserFollowersCard";
import OrderHistory from "../../../utils/UserProfileUtils/UserProfile/OnlineOrdering/OrderHistory/OrderHistory";
import MyAddresses from "../../../utils/UserProfileUtils/UserProfile/OnlineOrdering/MyAddresses/MyAddresses";
import FavoriteOrders from "../../../utils/UserProfileUtils/UserProfile/OnlineOrdering/FavoriteOrders/FavoriteOrders";
import YoursBooking from "../../../utils/UserProfileUtils/UserProfile/TableBooking/YoursBooking/YoursBooking";

const UserProfileRightsideBar = () => {
  const { userId, hashId } = useParams();
  const [currComp, setCurrComp] = useState(<h1>Loading...</h1>);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    if (loading) return;

    switch (hashId) {
      case photosPage:
        setCurrComp(<UserPhotosCard hashId={hashId} />);
        break;
      case followersPage:
        setCurrComp(
          <UserFollowersCard hashId={hashId} userData={{ following: userData?.following || 0, followers: userData?.followers || 0 }} />
        );
        break;
      case recentlyviewedPage:
        setCurrComp(<RecentlyViewed hashId={hashId} />);
        break;
      case bookmarksPage:
        setCurrComp(<UserBookmarks hashId={hashId} />);
        break;
      case blogpostsPage:
        setCurrComp(<UserBlogPosts hashId={hashId} />);
        break;
      case orderhistoryPage:
        setCurrComp(<OrderHistory hashId={hashId} />);
        break;
      case myaddressPage:
        setCurrComp(<MyAddresses hashId={hashId} />);
        break;
      case favoriteordersPage:
        setCurrComp(<FavoriteOrders hashId={hashId} />);
        break;
      case bookingsPage:
        setCurrComp(<YoursBooking hashId={hashId} />);
        break;
      default:
        setCurrComp(
          userData?.reviews?.length > 0
            ? userData.reviews.map((review, index) => <UserReviewedCard data={review} key={index} />)
            : <h2>No Reviews Yet!</h2>
        );
    }
  }, [hashId, loading, userData]);

  return (
    <div className={css.outerDiv}>
      <div className={css.innerDiv}>
        <div className={css.title}>{userData?.userName || "User Profile"}</div>
        <div className={css.contentBox}>{currComp}</div>
      </div>
    </div>
  );
};

export default UserProfileRightsideBar;
