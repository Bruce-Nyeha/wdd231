const courses = [
  { code: "CSE 110", title: "Introduction to Programming", credits: 2, completed: true, category: "CSE" },
  { code: "WDD 130", title: "Web Fundamentals", credits: 2, completed: true, category: "WDD" },
  // Add the rest of the courses here from the assignment array
  // ...
];

const courseList = document.getElementById("courseList");
const totalCreditsEl = document.getElementById("totalCredits");
const filterButtons = document.querySelectorAll(".filter-buttons button");

function displayCourses(filteredCourses) {
  courseList.innerHTML = "";
  let total = 0;

  filteredCourses.forEach(course => {
    const card = document.createElement("div");
    card.classList.add("course-card");
    if (course.completed) card.classList.add("completed");

    card.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.title}</p>
      <p>Credits: ${course.credits}</p>
    `;

    courseList.appendChild(card);
    total += course.credits;
  });

  totalCreditsEl.textContent = total;
}

// Initial display
displayCourses(courses);

// Filter buttons
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    let filtered = courses;
    if (filter !== "all") {
      filtered = courses.filter(c => c.category === filter);
    }

    displayCourses(filtered);
  });
});