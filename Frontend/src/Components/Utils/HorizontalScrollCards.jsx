import React, { useState } from 'react';

const TitleComp = ({ job_title, count }) => {
  // Generate random color for gradient
  const [show, setShow] = useState(false);
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
    <div onMouseOver={()=>{setShow(true)}} onMouseOut={()=>{setShow(false)}}
      className="relative rounded-full overflow-hidden border border-gray-300 hover:border-gray-500 transition duration-300 ease-in-out cursor-pointer shadow-lg hover:shadow-xl"
      style={{ width: cardWidth }}
    >
      {show&&(
        <div className='absolute bg-[#ffffff] z-50 flex rounded-xl items-center px-3'>
          <p className="text-black font-raleway">Job count : {count}</p>
        </div>
      )}
      <div
        className="p-2"
        style={{
          background: `linear-gradient(135deg, ${randomColor()} 0%, ${randomColor()} 100%)`,
          opacity: 0.80,
        }}
      >
        <p className="text-black text-sm font-medium text-center" style={{opacity: 100}}>
          {job_title.length > 15 ? `${job_title.substring(0, 15)}...` : job_title}
        </p>
      </div>
    </div>
  );
};

const HorizontalScrollCards = ({ YearTableData }) => (
  <div className="overflow-x-auto py-4 scrollbar-hide w-full">
    <div className="flex flex-row gap-4 justify-center">
      {Array.isArray(YearTableData) && YearTableData.map((item, index) => (
        <div className="flex" >
          <TitleComp key={index} job_title={item.job_title} count={item.count} />
        </div>
      ))}
    </div>
  </div>
);

export default HorizontalScrollCards;
