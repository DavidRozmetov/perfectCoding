import "../css/PythonIntroVideo.css";

export const Python = () => {
  return (
    <div>
      <div className="python-intro-container">
        <h1 className="python-intro-title">
          Getting Started with Python: An Introduction
        </h1>
        <p className="python-intro-description">
          Welcome to our Python programming crash course! In this video, we will
          take you through the fundamentals of Python, one of the most popular
          and beginner-friendly programming languages. Whether you're an
          absolute beginner or someone looking to refresh their Python skills,
          this is the perfect place to start.
        </p>
        <p className="python-intro-subtitle">
          Here are some of the key topics we'll be covering in this video:
        </p>
        <ul className="python-intro-topics">
          <li>Introduction to Python</li>
          <li># Comments</li>
          <li>Printing "Hello World"</li>
          <li>Arithmetic Operators (+, -, *, /)</li>
          <li>User Input with `input()`</li>
          <li>Working with Variables</li>
          <li>Conditional Statements (if)</li>
        </ul>
        <p className="python-intro-conclusion">
          So, let's dive right in and get started with Python! Watch the video,
          follow along, and practice what you've learned to gain confidence in
          your programming skills. Don't forget to subscribe and hit the
          notification bell to stay updated with more exciting Python tutorials
          and programming content. Happy coding!
        </p>
      </div>

      <iframe
        className="youtube-video"
        src="https://www.youtube.com/embed/wuVQ7QanH7s?si=r-qF4R0aB8vEtwRd"
      ></iframe>
    </div>
  );
};
