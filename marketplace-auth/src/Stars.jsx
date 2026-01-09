import { useState } from "react";
import { Star } from "lucide-react";

const DEFAULT_COUNT = 5;
const DEFAULT_ICON = <Star />;
const DEFAULT_UNSELECTED_COLOR = "grey";
const DEFAULT_COLOR = "yellow";

export function Stars({ count, defaultRating, icon, color, iconSize, onRatingChange }) {
  const [rating, setRating] = useState(defaultRating || 0);
  const [temporaryRating, setTemporaryRating] = useState(0);

  const handleClick = (index) => {
    const newRating = index + 1;
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const handleMouseEnter = (index) => {
    setTemporaryRating(index + 1);
  };

  const handleMouseLeave = () => {
    setTemporaryRating(0);
  };

  const displayRating = temporaryRating || rating;
  const starColor = color || DEFAULT_COLOR;
  const unselectedColor = DEFAULT_UNSELECTED_COLOR;

  return (
    <div className="flex flex-row gap-1">
      {Array(count || DEFAULT_COUNT)
        .fill(0)
        .map((_, index) => {
          const isFilled = index < displayRating;
          return (
            <div
              key={index}
              className="cursor-pointer transition-transform hover:scale-110"
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              style={{
                fontSize: iconSize ? `${iconSize}px` : "14px",
                color: isFilled ? starColor : unselectedColor,
              }}
            >
              {icon || DEFAULT_ICON}
            </div>
          );
        })}
    </div>
  );
}