import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { ArticleInfo } from '@/entities/Article';

import { Card } from '@/shared/ui/Card';

interface InfoContainerProps {
  className?: string;
}

/**
 * Компонент контейнера для отображения деталей статьи.
 *
 * @component
 * @param {InfoContainerProps} props - Пропсы для компонента.
 * @returns {JSX.Element} Контейнер с деталями статьи.
 */

export const InfoContainer = memo((props: InfoContainerProps) => {
  const { className } = props;
  const { id } = useParams<{ id: string }>();

  return (
    <Card border="partial" className={className} padding="24">
      <ArticleInfo id={id} />
    </Card>
  );
});
