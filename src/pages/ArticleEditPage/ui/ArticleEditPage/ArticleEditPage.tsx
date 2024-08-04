import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Page } from '@/widgets/Page';

import { useClassName } from '@/shared/lib/hooks/useClassName';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = (props: ArticleEditPageProps) => {
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
};

export default ArticleEditPage;
