import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

import { customCl } from '@/shared/lib/hooks/useClassName';
import { Text } from '@/shared/ui/Text';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = (props: ArticleEditPageProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  return (
    <Page className={customCl('', {}, [className])}>
      <Text
        title={
          isEdit
            ? t('Редактирование статьи(id): ') + id
            : t('Создание новой статьи')
        }
      />
    </Page>
  );
};

export default ArticleEditPage;
