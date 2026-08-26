import React from "react";

const Title = ({ title, descreption }) => {
  return (
    <div className="text-center mt-6 text-white">
      <h2 className=" text-4xl sm:4xl font-Bold bg-gradient-to-r  from-white to-[#748298] bg-clip-text text-transparent mb-7 max-w-2xl mx-auto text-center px-4">
        {title}
      </h2>

      <h3 className=" bg-gradient-to-r  from-white to-[#748298] bg-clip-text text-transparent mb-7 max-w-2xl mx-auto text-center px-4">
        {descreption}
      </h3>
    </div>
  );
};

export default Title;