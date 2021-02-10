import React from "react";

 import Img from "../../assets/Icons/default/menu.svg"


const Icon = async ({ name = "aaa", pack = "default" }) => {
   let path = "../../assets/Icons/default/menu.svg";
  // const { icon } = await import(path);
  let {icon} = await import("../../assets/Icons/default/menu.svg");

  console.log(icon);
  return (
    <span className={`icon icon-${name}`}>
      {/* // <img src={path}> </img> */}
      {/* <img src={'./assests/Icons/' + pack + '/menu.svg' } /> */}
    </span>
  );
};

export default Icon;
