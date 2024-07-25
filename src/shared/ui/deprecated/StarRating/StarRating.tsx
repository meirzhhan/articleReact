import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useState } from 'react';
import cl from './StarRating.module.scss';
import { Icon as IconDeprecated } from '../Icon';
import StarIcon from '@/shared/assets/icons/star.svg';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '../../redesigned/Icon';

interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

/**
 * new UI kit added
 * @deprecated
 */

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
    <div
      className={classNames(
        toggleFeatures({
          name: 'isAppRedesigned',
          on: () => cl.StarRatingRedesigned,
          off: () => cl.StarRating,
        }),
        {},
        [className],
      )}
    >
      {stars.map((starNumber) => {
        const commonProps = {
          className: classNames(
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
          <ToggleFeatures
            key={starNumber}
            feature="isAppRedesigned"
            on={<Icon clickable={!isSelected} {...commonProps} />}
            off={<IconDeprecated {...commonProps} />}
          />
        );
      })}
    </div>
  );
});
