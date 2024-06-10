"use client";

import React, { useEffect, useState } from "react";
import Button from "../component/general/Button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { logout } from "../api/auth";
import { getIdentityCode, getName, getProfile, getRole } from "../api/general";
import { Profile } from "../component/types/general";

const TestingAPI = () => {
  // get user access token
  const access_token = Cookies.get("access_token");

  const [userName, setUserName] = useState("");
  const [userIdentityCode, setUserIdentityCode] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userProfile, setUserProfile] = useState<Profile | null>();

  useEffect(() => {
    const fetchData = async () => {
      // get user name
      let response = await getName(access_token);
      setUserName(response.data.name);

      // get user identity code
      response = await getIdentityCode(access_token);
      setUserIdentityCode(response.data.identity_code);

      // get user email
      response = await getRole(access_token);
      setUserRole(response.data.role);

      // get user profile
      response = await getProfile(access_token);
      setUserProfile(response.data);
    };
    fetchData();
  }, [access_token]);

  const handleLogout = async () => {
    await logout(access_token);
  };

  return (
    <div>
      <div>
        <p>Name: {userName}</p>
        <p>Identity Code: {userIdentityCode}</p>
        <p>Role: {userRole}</p>
      </div>
      <hr />
      {/* User Profile */}
      {userProfile && (
        <div>
          <p>Name: {userProfile.id}</p>
          <p>Name: {userProfile.name}</p>
          <p>Identity Code: {userProfile.identity_code}</p>
          <p>Role: {userProfile.role}</p>
        </div>
      )}
      <Button text="logout" type="button" onClick={handleLogout} />
    </div>
  );
};

export default TestingAPI;
