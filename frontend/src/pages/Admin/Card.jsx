import React from "react";
import accept from '../../images/accept.png';
import gmail from '../../images/gmail.png';
import cancel from '../../images/cancel.png'

const images = {
  accept: accept,
  gmail: gmail,
  cancel: cancel,
};

const Card = (props) => {
  const imageSrc = images[props.image];

  return (
    <div className="w-[300px] h-[140px] flex flex-col items-center justify-center text-white gap-2 bg-[#f7f8f9] rounded-xl p-3  ">
      <div className="flex flex-row text-white">
        <p className="text-2xl text-black">{props.label}</p>
      </div>

      <div className="text-4xl font-semibold text-black">
        <p>{props.value}</p>
      </div>

      {/* {imageSrc && (
        <img
          src={imageSrc}
          alt={props.imageName}
          className="absolute bottom-2 right-2 w-14 h-14 opacity-50"
        />
      )} */}
    </div>
    
  );
};

export default Card;
