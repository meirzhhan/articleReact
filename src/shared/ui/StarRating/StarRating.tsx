import { customCl } from '@/shared/lib/classNames/classNames';
import { memo, useState } from 'react';
import cl from './StarRating.module.scss';
import StarIcon from '@/shared/assets/icons/star.svg';
import { Icon } from '../Icon';

interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
  const { className, onSelect, size = 30, selectedStars = 0 } = props;

  const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarsCount(starsCount);
    }
  };

  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarsCount(0);
    }
  };

  const onClick = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount);
      setCurrentStarsCount(starsCount);
      setIsSelected(true);
    }
  };

  return (
    <div className={customCl(cl.StarRatingRedesigned, {}, [className])}>
      {stars.map((starNumber) => {
        const commonProps = {
          className: customCl(
            cl.starIcon,
            {
              [cl.selected]: isSelected,
            },
            [currentStarsCount >= starNumber ? cl.hovered : cl.normal],
          ),
          Svg: StarIcon,
          width: size,
          height: size,
          onMouseLeave: onLeave,
          onMouseEnter: onHover(starNumber),
          onClick: onClick(starNumber),
        };

        return (
          <Icon key={starNumber} clickable={!isSelected} {...commonProps} />
        );
      })}
    </div>
  );
});
