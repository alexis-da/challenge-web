import { useState } from "react";
import { Star } from "lucide-react";

const DEFAULT_COUNT = 5;
const DEFAULT_ICON = <Star />;
const DEFAULT_UNSELECTED_COLOR = "grey";
const DEFAULT_COLOR ="yellow";

export function Stars ({count,defaultRating, icon,color,iconSize}){
    const [rating, setRating]= useState(defaultRating);
  const [temporaryRating, setTemporaryRating]=useState(0);

  let stars = Array(count || DEFAULT_COUNT).fill(icon || DEFAULT_ICON);

  return <div className="starsCountainer">
    {stars.map((item, index) =>{
        return(
        <div className="star" key={index} style={{fontSize : iconSize ? `${iconSize}px` : "14px"}}>
            {icon ? icon :DEFAULT_ICON}
        </div>
    );
})}
</div>;
}