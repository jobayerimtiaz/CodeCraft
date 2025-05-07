import React, { useContext, useEffect, useState } from "react";
import Search from "../../components/student/Search";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import CourseCard from "../../components/student/CourseCard";

const CourseList = () => {
  const { allCourses } = useContext(AuthContext);
  const { input } = useParams();
  const [filteredCourses, setFilteredCourses] = useState([]);
  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();
      input
        ? setFilteredCourses(
            tempCourses.filter((item) =>
              item.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setFilteredCourses(tempCourses);
    }
  }, [allCourses, input]);
  return (
    <div className="w-11/12 mx-auto my-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Course List
        </h2>
        <div className="w-full md:w-96 ml-auto">
          {" "}
          {/* Fixed search width on desktop */}
          <Search data={input} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-10">
        {filteredCourses.map((course, index) => (
          <CourseCard key={index} course={course}></CourseCard>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
