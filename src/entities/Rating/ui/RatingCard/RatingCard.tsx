import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';

import { StarRating } from '@/shared/ui/StarRating';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Modal } from '@/shared/ui/Modal';
import { Drawer } from '@/shared/ui/Drawer';
import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;
}

/**
 * Компонент для оценки с возможностью по пяти бальной шкале.
 *
 * @param {RatingCardProps} props - Свойства компонента.
 * @returns {JSX.Element} JSX-элемент, представляющий карточку для оценки.
 */

export const RatingCard = memo((props: RatingCardProps) => {
  const {
    title,
    feedbackTitle,
    hasFeedback,
    onCancel,
    onAccept,
    rate = 0,
  } = props;
  const { t } = useTranslation('article-info');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState('');

  /**
   * Обработчик выбора количества звезд.
   * Открывает модальное окно для отзыва, если это предусмотрено, иначе вызывает onAccept.
   *
   * @param {number} selectedStarsCount - Количество выбранных звезд.
   */

  const onSelectStars = useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount);

      if (hasFeedback) {
        setIsModalOpen(true);
      } else {
        onAccept?.(selectedStarsCount);
      }
    },
    [hasFeedback, onAccept],
  );

  /**
   * Обработчик подтверждения оценки и отзыва.
   * Закрывает модальное окно и вызывает onAccept с текущим количеством звезд и отзывом.
   */
  const acceptHandle = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);

  /**
   * Обработчик отмены оценки.
   * Закрывает модальное окно и вызывает onCancel с текущим количеством звезд.
   */
  const cancelHandle = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  // контент Modal-ки для браузера и для мобилки
  const modalContent = (
    <>
      <Text title={feedbackTitle} />
      <Input
        value={feedback}
        onChange={setFeedback}
        placeholder={t('Оставьте ваш отзыв')}
      />
    </>
  );

  const content = (
    <>
      <VStack align="center" gap="8" maxWidth>
        <Text title={starsCount ? t('Спасибо за оценку') : title} />

        <StarRating
          selectedStars={starsCount}
          size={40}
          onSelect={onSelectStars}
        />
      </VStack>

      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          <VStack gap="32" maxWidth>
            {modalContent}

            <HStack maxWidth gap="16" justify="between">
              <Button size="m" onClick={cancelHandle}>
                {t('Закрыть')}
              </Button>
              <Button onClick={acceptHandle} color="success">
                {t('Отправить')}
              </Button>
            </HStack>
          </VStack>
        </Modal>
      </BrowserView>

      <MobileView>
        <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
          <VStack gap="24">
            {modalContent}

            <Button fullWidth onClick={acceptHandle} size="m">
              {t('Отправить')}
            </Button>
          </VStack>
        </Drawer>
      </MobileView>
    </>
  );

  return (
    <Card padding="24" max border="partial">
      {content}
    </Card>
  );
});
