import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { withCookies } from "react-cookie";
import HomePage from "./home";
import SignInPage from "./auth";
import ChannelPage from "./home/channel";
import UsersPage from "./home/user";
import SettingPage from "./home/setting";
import ThemePage from "./home/theme";
import CategoryPage from "./home/category";
import ContentPage from "./home/content";

const Pages = (props) => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/theme" element={<ThemePage />} />
          <Route path="/channel" element={<ChannelPage />} />
          <Route path="/content" element={<ContentPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/setting" element={<SettingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default withCookies(Pages);