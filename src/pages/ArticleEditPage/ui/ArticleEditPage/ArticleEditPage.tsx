import { useClassName } from '@/shared/lib/hooks/useClassName';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from '@/widgets/Page';
import { useParams } from 'react-router-dom';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  return (
    <Page className={useClassName('', {}, [className])}>
      {isEdit
        ? t('Редактирование статьи(id): ') + id
        : t('Создание новой статьи')}
    </Page>
  );
});

export default ArticleEditPage;
