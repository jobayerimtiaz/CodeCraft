import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex justify-center w-full bg-[#202E3B] min-h-screen text-white py-8">
      <div className="w-11/12 max-w-7xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          My Enrolled Courses
        </h1>

        {enrolledCourses.length === 0 ? (
          <div className="bg-[#2A3B4D] rounded-lg p-8 text-center">
            <h2 className="text-xl font-medium mb-4">
              You haven't enrolled in any courses yet
            </h2>
            <button
              onClick={() => navigate("/courses")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="bg-[#2A3B4D] rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#36495C]">
                <thead className="bg-[#36495C]">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider sm:px-6"
                    >
                      Course
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider sm:px-6"
                    >
                      <div className="flex items-center">
                        <AiOutlineClockCircle className="mr-1 hidden sm:block" />
                        <span>Duration</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider sm:px-6"
                    >
                      <div className="flex items-center">
                        <BsCameraVideo className="mr-1 hidden sm:block" />
                        <span>Lectures</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#2A3B4D] divide-y divide-[#36495C]">
                  {enrolledCourses.map((course) => (
                    <tr
                      key={course._id}
                      className="hover:bg-[#36495C] cursor-pointer transition-colors"
                      onClick={() => navigate(`/player/${course._id}`)}
                    >
                      <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-14 sm:h-12 sm:w-16">
                            <img
                              className="h-full w-full object-cover rounded-md"
                              src={course.courseThumbnail}
                              alt={course.courseTitle}
                            />
                          </div>
                          <div className="ml-3 sm:ml-4">
                            <div className="text-sm font-medium line-clamp-1">
                              {course.courseTitle}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-400 line-clamp-1">
                              Instructor: {course.educator?.name || "Unknown"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-300 sm:px-6">
                        {calculateCourseDuration(course)}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-300 sm:px-6">
                        {course.courseContent?.reduce(
                          (acc, chapter) => acc + chapter.chapterContent.length,
                          0
                        ) || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEnrollments;
