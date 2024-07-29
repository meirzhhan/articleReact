import { memo } from 'react';
import { ArticleDetails } from '@/entities/Article';
import { useParams } from 'react-router-dom';
import { Card } from '@/shared/ui/Card';

interface DetailsContainerProps {
  className?: string;
}

export const DetailsContainer = memo((props: DetailsContainerProps) => {
  const { className } = props;
  const { id } = useParams<{ id: string }>();

  return (
    <Card max border="partial" className={className} padding="24">
      <ArticleDetails id={id} />
    </Card>
  );
});
