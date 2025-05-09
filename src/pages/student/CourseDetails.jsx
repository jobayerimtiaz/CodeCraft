import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import Loading from "../../components/student/Loading";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegPlayCircle, FaCheckCircle } from "react-icons/fa";
import { MdOutlineLock, MdOutlineStar, MdStarOutline } from "react-icons/md";
import { AiOutlineClockCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { BsCameraVideo, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { toast } from "react-toastify";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [rating, setRating] = useState(4); // Default rating
  const [hoverRating, setHoverRating] = useState(0);

  const {
    allCourses,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    user,
    enrollCourse,
  } = useContext(AuthContext);

  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  };

  useEffect(() => {
    fetchCourseData();
  }, [allCourses]);

  const handleEnroll = async () => {
    if (!user) {
      toast.info("Please login to enroll in this course");
      navigate("/login");
      return;
    }

    try {
      await enrollCourse(courseData._id);
      toast.success("Successfully enrolled in the course!");
      // You might want to redirect to the course player or refresh the data
    } catch (error) {
      toast.error(error.response?.data?.message || "Enrollment failed");
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(
      !isBookmarked
        ? "Course added to bookmarks"
        : "Course removed from bookmarks"
    );
  };

  const calculateDiscountedPrice = () => {
    return (courseData.coursePrice * (1 - courseData.discount / 100)).toFixed(
      2
    );
  };

  if (!courseData) return <Loading />;

  return (
    <div className="bg-[#202E3B] min-h-screen text-white py-10 px-5 md:px-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Thumbnail */}
        <div className="md:w-1/2 relative group">
          <img
            src={courseData.courseThumbnail}
            alt="Course Thumbnail"
            className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg group-hover:opacity-90 transition-opacity duration-300"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={toggleBookmark}
              className="p-2 bg-black bg-opacity-60 rounded-full hover:bg-opacity-80 transition-all"
              aria-label="Bookmark course"
            >
              {isBookmarked ? (
                <BsBookmarkFill className="text-yellow-400 text-xl" />
              ) : (
                <BsBookmark className="text-white text-xl" />
              )}
            </button>
          </div>
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 px-3 py-1 rounded-full text-sm">
            {courseData.discount > 0 ? (
              <span className="text-green-400 font-semibold">
                {courseData.discount}% OFF
              </span>
            ) : (
              <span>Popular</span>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold mb-4">
                {courseData.courseTitle}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="text-xl"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    {(hoverRating || rating) >= star ? (
                      <MdOutlineStar className="text-yellow-400" />
                    ) : (
                      <MdStarOutline className="text-gray-400" />
                    )}
                  </button>
                ))}
              </div>
              <span className="text-sm text-gray-300">(4.8 • 125 reviews)</span>
            </div>

            <div
              className="text-gray-300 leading-relaxed space-y-2 mb-4"
              dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
            />
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Instructor"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">Created by Imtiaz</p>
                <p className="text-sm text-gray-400">Senior Developer</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <BsCameraVideo className="text-blue-400" />
                <span>{calculateNoOfLectures(courseData)} Lectures</span>
              </div>
              <div className="flex items-center gap-2">
                <AiOutlineClockCircle className="text-blue-400" />
                <span>{calculateCourseDuration(courseData)}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                <span>Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <MdOutlineLock className="text-red-400" />
                <span>{courseData.difficulty || "Intermediate"}</span>
              </div>
            </div>

            <div className="mt-6 bg-[#2A3B4D] p-4 rounded-xl">
              <div className="flex justify-between items-center">
                <div>
                  {courseData.discount > 0 ? (
                    <>
                      <span className="text-2xl font-bold">
                        ${calculateDiscountedPrice()}
                      </span>
                      <span className="ml-2 line-through text-gray-400">
                        ${courseData.coursePrice}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold">
                      ${courseData.coursePrice}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleEnroll}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105"
                >
                  <AiOutlineShoppingCart />
                  Enroll Now
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                30-Day Money-Back Guarantee
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Course Content</h2>
          <div className="text-sm text-gray-400">
            {courseData.courseContent.length} chapters •{" "}
            {calculateNoOfLectures(courseData)} lectures •{" "}
            {calculateCourseDuration(courseData)} total length
          </div>
        </div>

        <div className="space-y-6">
          {courseData.courseContent.map((chapter) => (
            <div
              key={chapter.chapterId}
              className="bg-[#2A3B4D] p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-4 cursor-pointer">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="text-blue-400">{chapter.chapterOrder}.</span>
                  {chapter.chapterTitle}
                </h3>
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <AiOutlineClockCircle />
                  {calculateChapterTime(chapter)}
                </span>
              </div>

              {/* Lectures */}
              <ul className="space-y-3">
                {chapter.chapterContent.map((lecture) => (
                  <li
                    key={lecture.lectureId}
                    className="flex items-center justify-between bg-[#36495C] p-3 rounded-lg hover:bg-[#3e5267] transition-colors duration-200 cursor-pointer"
                    onClick={() => {
                      if (
                        lecture.isPreviewFree ||
                        user?.enrolledCourses?.includes(courseData._id)
                      ) {
                        // Navigate to lecture player
                        navigate(
                          `/learn/${courseData._id}/lecture/${lecture.lectureId}`
                        );
                      } else {
                        toast.info("Please enroll to access this lecture");
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {lecture.isPreviewFree ? (
                        <FaRegPlayCircle className="text-green-400" />
                      ) : (
                        <MdOutlineLock className="text-red-400" />
                      )}
                      <span>
                        {lecture.lectureOrder}. {lecture.lectureTitle}
                      </span>
                      {lecture.isPreviewFree && (
                        <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                          Free Preview
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-300">
                      <AiOutlineClockCircle />{" "}
                      {(lecture.lectureDuration / 60).toFixed(1)} mins
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* What You'll Learn Section */}
      <div className="mt-12 bg-[#2A3B4D] p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-6">What you'll learn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courseData.learningOutcomes?.map((outcome, index) => (
            <div key={index} className="flex items-start gap-3">
              <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
              <span>{outcome}</span>
            </div>
          )) || (
            <>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                <span>Master the fundamentals of this topic</span>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                <span>Build practical projects to apply your knowledge</span>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                <span>Learn industry best practices and standards</span>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                <span>Get ready for advanced concepts and applications</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Requirements Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
        <ul className="list-disc list-inside space-y-2 pl-4">
          {courseData.requirements?.map((req, index) => (
            <li key={index}>{req}</li>
          )) || (
            <>
              <li>Basic computer skills</li>
              <li>No prior knowledge required (we'll teach you everything)</li>
              <li>A computer with internet access</li>
              <li>Willingness to learn and practice</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CourseDetails;
