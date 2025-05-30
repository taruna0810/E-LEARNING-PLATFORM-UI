
  const courses = [
    {
      id: 1,
      title: "Introduction to JavaScript",
      description: "Learn the fundamentals of JavaScript, the most popular programming language in web development.",
      progress: 78,
      videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk"
    },
    {
      id: 2,
      title: "HTML & CSS Basics",
      description: "Understand the building blocks of the web with hands-on exercises and examples.",
      progress: 35,
      videoUrl: "https://www.youtube.com/embed/UB1O30fR-EE"
    },
    {
      id: 3,
      title: "React for Beginners",
      description: "Start building interactive UIs with React, a popular JavaScript library.",
      progress: 15,
      videoUrl: "https://www.youtube.com/embed/dGcsHMXbSOA"
    },
    {
      id: 4,
      title: "Python Programming Fundamentals",
      description: "Master the basics of Python programming language for automation, data science, and more.",
      progress: 60,
      videoUrl: "https://www.youtube.com/embed/_uQrJ0TkZlc"
    }
  ];

  const courseListEl = document.getElementById("course-list");
  const videoModal = document.getElementById("videoModal");
  const modalVideoContainer = document.getElementById("modalVideoContainer");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalTitle = document.getElementById("modalTitle");

  // Function to create course cards dynamically
  function renderCourses() {
    courseListEl.innerHTML = '';
    courses.forEach(course => {
      const card = document.createElement("article");
      card.className = 'course-card';

      card.innerHTML = `
        <h2 class="course-title">${course.title}</h2>
        <p class="course-description">${course.description}</p>
        <div class="progress-bar-container" aria-label="Course progress">
          <div class="progress-bar" style="width: ${course.progress}%;"></div>
        </div>
        <div class="course-footer">
          <span>${course.progress}% Complete</span>
          <button class="watch-btn" aria-label="Watch video for ${course.title}" data-course-id="${course.id}">Watch Video</button>
        </div>
      `;

      courseListEl.appendChild(card);
    });
  }

  // Open video modal and embed video by course id
  function openVideoModal(courseId) {
    const course = courses.find(c => c.id === parseInt(courseId));
    if (!course) return;

    modalTitle.textContent = course.title + " - Video";
    modalVideoContainer.innerHTML = `
      <iframe src="${course.videoUrl}?autoplay=1&rel=0" title="${course.title} Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;

    videoModal.classList.add('active');
    videoModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  // Close video modal and remove embedded video
  function closeVideoModal() {
    videoModal.classList.remove('active');
    videoModal.setAttribute("aria-hidden", "true");
    modalVideoContainer.innerHTML = '';
    modalTitle.textContent = 'Course Video';
    document.body.style.overflow = "";
  }

  // Event delegation for watch buttons
  courseListEl.addEventListener('click', e => {
    if (e.target.classList.contains('watch-btn')) {
      const courseId = e.target.getAttribute('data-course-id');
      openVideoModal(courseId);
    }
  });

  closeModalBtn.addEventListener('click', closeVideoModal);
  videoModal.addEventListener('click', e => {
    if (e.target === videoModal) { // clicking overlay closes modal
      closeVideoModal();
    }
  });


  renderCourses();