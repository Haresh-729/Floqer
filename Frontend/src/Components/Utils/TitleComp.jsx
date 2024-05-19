import React from 'react';

const TitleComp = ({ job_title }) => {
  // Generate random color for gradient
  const randomColor = () => {
    // Ensure the color is not too light
    let color;
    do {
      color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    } while (parseInt(color.slice(1), 16) > 0xeeeeee);
    return color;
  };

  // Determine card width based on title length
  const cardWidth = `${Math.max(job_title.length * 12, 100)}px`; // Minimum width of 100px

  return (
    <div
      className="rounded-full overflow-hidden border border-gray-300 hover:border-gray-500 transition duration-300 ease-in-out cursor-pointer shadow-lg hover:shadow-xl"
      style={{ width: cardWidth }}
    >
      <div
        className="p-2"
        style={{
          background: `linear-gradient(135deg, ${randomColor()} 0%, ${randomColor()} 100%)`,
          opacity: 0.85,
        }}
      >
        <p className="text-white text-sm font-medium text-center">
          {job_title.length > 15 ? `${job_title.substring(0, 15)}...` : job_title}
        </p>
      </div>
    </div>
  );
};

export default TitleComp;
