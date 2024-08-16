import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Card } from '@/shared/ui/Card';
import {
  DynamicReducer,
  ReducersList,
} from '@/shared/lib/components/DynamicReducer';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { toggleFeatures } from '@/shared/lib/hooks/useToggleFeatures';

import { getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';
import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void; // Функция, вызываемая при отправке комментария.
}

/**
 * Список reducer-ов для динамической загрузки.
 */
const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

/**
 * Компонент формы добавления комментария.
 * @param props - Пропсы компонента.
 * @returns  JSX элемент.
 */

const AddCommentForm = memo((props: AddCommentFormProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation('article-info');
  const text = useSelector(getAddCommentFormText);
  const dispatch = useAppDispatch();

  const isCommentAvailable = toggleFeatures({
    name: 'isAddCommentEnabled',
    on: () => true,
    off: () => false,
  });

  // Обработчик изменения текста комментария.
  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.setText(value));
    },
    [dispatch],
  );

  // Обработчик отправки комментария.
  const onSendHandler = useCallback(() => {
    if (text.length > 4) {
      onSendComment(text);
      onCommentTextChange('');
    }
  }, [onCommentTextChange, onSendComment, text]);

  return (
    <DynamicReducer reducers={reducers}>
      <Card
        className={className}
        padding="24"
        border="partial"
        flexRow
        gap="16"
        maxWidth
      >
        <Input
          placeholder={
            isCommentAvailable
              ? t('Введите текст комментария, не менее 5 символов')
              : t('Комментирование отключено. Можете включить в настройках')
          }
          value={text}
          onChange={onCommentTextChange}
          disabled={!isCommentAvailable}
        />
        <Button disabled={!isCommentAvailable} onClick={onSendHandler}>
          {t('Отправить')}
        </Button>
      </Card>
    </DynamicReducer>
  );
});

export default AddCommentForm;
