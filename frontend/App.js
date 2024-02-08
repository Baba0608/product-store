import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));

const AppLayout = () => {
  return (
    <div>
      <p>This is the main page. Created using React</p>
    </div>
  );
};

root.render(<AppLayout />);
