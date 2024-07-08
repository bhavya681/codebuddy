import React from 'react';

const About = () => {
  return (
    <div className="bg-black text-white flex flex-col items-center px-4 py-10 sm:px-8 md:px-16 lg:px-24 h-[80vh]">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">About Us</h1>
      <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6">
        Welcome to CodeBuddy! We are a social media platform designed specifically for developers and coders to connect, collaborate, and grow together. Our mission is to create a vibrant community where tech enthusiasts can share their knowledge, learn from each other, and build meaningful professional relationships.
      </p>
      <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6">
        Whether you are a seasoned developer or just starting your coding journey, CodeBuddy offers a space for everyone. Join us to stay updated with the latest tech trends, participate in coding challenges, and showcase your projects.
      </p>
      <p className="text-base sm:text-lg md:text-xl leading-relaxed">
        Our vision is to foster a collaborative environment that encourages innovation and personal growth. At CodeBuddy, we believe that by connecting like-minded individuals, we can push the boundaries of what is possible in the world of technology.
      </p>
    </div>
  );
};

export default About;
