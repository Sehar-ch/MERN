import React from "react";

// Props:
// - searchTerm, onSearchChange: controlled input for name search
// - courseFilter, onCourseFilterChange: controlled select for course filter
// - courseOptions: array of unique course names to populate the dropdown
function Controls({
  searchTerm,
  onSearchChange,
  courseFilter,
  onCourseFilterChange,
  courseOptions
}) {
  return (
    <div className="panel controls">
      <div className="field">
        <label htmlFor="search-input">Search by Name</label>
        <input
          id="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Type a name..."
        />
      </div>

      <div className="field">
        <label htmlFor="course-filter">Filter by Course</label>
        <select
          id="course-filter"
          value={courseFilter}
          onChange={(e) => onCourseFilterChange(e.target.value)}
        >
          <option value="all">All Courses</option>
          {courseOptions.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Controls;