import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import "../styles/Profile.css";

export default function Profile(props) {
  const [profileImageUrl, setProfileImageUrl] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    fetch(`http://localhost:8080/monitores/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(setProfileImageUrl(data[0].foto));
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div
      className="Profile"
      style={{ display: props.isVisible ? "flex" : "none" }}
    >
      <div className="profile-info-container">
        <div className="profile-img-container">
          <div
            className="profile-img"
            style={{ backgroundImage: `url(${profileImageUrl})` }}
          >
            <button className="change-icon">
              <img src="src/assets/camera-icon.svg" alt="" />
            </button>
          </div>
        </div>

        <p className="profile-name">Fernando Jorge</p>
        <p className="profile-email">fernandojorge.cavalcantegomes@gmail.com</p>
        <button className="go-to-profile">Seu perfil</button>
      </div>

      <button className="leave-button">
        <div className="leave-content">
          <img src="src/assets/leave-icon.svg" alt="" className="leave-icon" />
          <p className="leave-text">Sair da conta</p>
        </div>
      </button>
    </div>
  );
}
