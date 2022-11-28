/** @format */

import React from "react";

const Blog = () => {
  return (
    <div className="text-start px-16 mt-8  m-5">
      <div>
        <h3 className="text-green-700 text-3xl">
          What are the different ways to manage a state in a React application?
        </h3>
        <p>
          Ans: There are four state to manage react application.First, one is
          Local State,Local state is most often managed in React using the
          useState hook.Local state would be required.Secondly, Global State
          ,When we want to get and update data anywhere in our app, or at least
          in multiple components, we need global state.Third one is server
          state,Data from an external server that must be integrated with our
          current UI state. Server state is a straightforward concept, but it
          can be difficult to manage alongside all of our local and global UI
          state.The last one is URL state.Data found on our URLs, such as the
          pathname and query parameters. URL state is frequently overlooked as a
          state category, despite its importance. Many major parts of our
          application rely on accessing URL state in many cases.
        </p>
      </div>
      <div>
        <h3 className="text-green-700 text-3xl">
          What are the different ways to manage a state in a React application?
        </h3>
        <p>
          Ans:Prototypal Inheritance is a Javascript feature that allows you to
          add methods and properties to objects. It is a method that allows one
          object to inherit the properties and methods of another.
          Object.getPrototypeOf and Object.setPrototypeOf have traditionally
          been used to get and set an object's [[Prototype]].
        </p>
      </div>
      <div>
        <h3 className="text-green-700 text-3xl">
          What is a unit test? Why should we write unit tests?{" "}
        </h3>
        <p>
          Ans:The primary goal of unit testing is to isolate written code and
          test it to see if it works as intended. Unit testing is an important
          step in the development process because, when done properly, it can
          help detect early flaws in code that may be more difficult to find
          later in the testing process.
        </p>
      </div>
      <div>
        <h3 className="text-green-700 text-3xl">React vs. Angular vs. Vue?</h3>
        <p>
          Ans: <br /> REACT: <br />
          1.Fast loading of new data. 2.One file contains both markup and logic
          (JSX).3.Enables the separation of data and presentation.4.Smooth work
          of the app, even with complex underlying operations or database
          queries. <br />
          VUE : <br />
          1.A list of tools and libraries (Vue.js official CLI, Development
          Tools, Vue Loader, Vue Router). 2.Flexibility and simplicity in the
          utilization.3.Reusable in the terms of adding numerous reactive
          components to the existing code.4.The possibility of Component-Based
          Architecture (CBA) <br /> ANGULAR: <br />
          1.Allows MVC architecture. 2.Good maintainability.3.Web applications
          built with Angular perform very well.4.Easy unit and end-to-end
          testing.
        </p>
      </div>
    </div>
  );
};

export default Blog;
