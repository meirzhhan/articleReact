import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import cl from './AddCommentForm.module.scss';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { useSelector } from 'react-redux';
import { getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { Card } from '@/shared/ui/redesigned/Card';

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation('article-details');
  const text = useSelector(getAddCommentFormText);
  // const error = useSelector(getAddCommentFormError);
  const dispatch = useAppDispatch();
  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.setText(value));
    },
    [dispatch],
  );

  const onSendHandler = useCallback(() => {
    onSendComment(text || '');
    onCommentTextChange('');
  }, [onCommentTextChange, onSendComment, text]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <Card padding="24" border="round" max>
            <HStack
              justify={'between'}
              max
              gap="16"
              className={classNames(cl.AddCommentFormRedesigned, {}, [
                className,
              ])}
            >
              <Input
                className={cl.input}
                placeholder={t('Введите текст комментария')}
                value={text}
                onChange={onCommentTextChange}
              />
              <Button onClick={onSendHandler}>{t('Отправить')}</Button>
            </HStack>
          </Card>
        }
        off={
          <HStack
            justify={'between'}
            max
            className={classNames(cl.AddCommentForm, {}, [className])}
          >
            <InputDeprecated
              className={cl.input}
              placeholder={t('Введите текст комментария')}
              value={text}
              onChange={onCommentTextChange}
            />
            <ButtonDeprecated
              theme={ButtonTheme.OUTLINE}
              onClick={onSendHandler}
            >
              {t('Отправить')}
            </ButtonDeprecated>
          </HStack>
        }
      />
    </DynamicModuleLoader>
  );
});

export default AddCommentForm;
