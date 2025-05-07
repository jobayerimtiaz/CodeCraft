import React from "react";
import Hero from "../../components/student/Hero";
import CourseSection from "../../components/student/CourseSection";

import ActionCall from "../../components/student/ActionCall";

const HomeLayout = () => {
  return (
    <div>
      <Hero></Hero>
      <CourseSection></CourseSection>
      <ActionCall></ActionCall>
    </div>
  );
};

export default HomeLayout;
