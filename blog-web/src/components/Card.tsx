import React from "react";
interface Cardprops {
  classname: string;
  children: React.ReactNode;
}
const Card = ({ children }: Cardprops) => {
  return <div>{children}</div>;
};

export default Card;
