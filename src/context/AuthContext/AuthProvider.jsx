import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { dummyCourses } from "../../assets/assets";

const AuthProvider = ({ children }) => {
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState([]);

  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  // const calculateRating = (course) => {
  //   if (course.rating.length === 0) {
  //     return 0;
  //   }
  //   let totalRating = 0;
  //   course.rating.forEach((rating) => {
  //     totalRating += rating.rating;
  //   });
  //   return totalRating / course.rating.length;
  // };

  useEffect(() => {
    fetchAllCourses();
  }, []);
  const authInfo = { allCourses, isEducator, setIsEducator };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
