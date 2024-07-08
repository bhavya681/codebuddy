import React from 'react';

const Download = () => {
  return (
    <div className="bg-black text-white flex flex-col items-center px-4 py-10 sm:px-8 md:px-16 lg:px-24 h-[80vh]">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Download CodeBuddy</h1>
      <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6">
        Get started with CodeBuddy today! Download our app and join a thriving community of developers and coders.
      </p>
      <div className="flex justify-center items-center mb-6">
        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
          Download Now
        </button>
      </div>
      <p className="text-base sm:text-lg md:text-xl leading-relaxed">
        CodeBuddy is available on both iOS and Android platforms. Join us and explore the world of coding together.
      </p>
    </div>
  );
};

export default Download;
