import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '../../deprecated/Button';
import CopyIcon from '@/shared/assets/icons/copy.svg';
import CopyIconNew from '@/shared/assets/icons/copyNew.svg';
import cl from './Code.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '../Icon';

interface CodeProps {
  className?: string;
  text: string;
}

export const Code = memo((props: CodeProps) => {
  const { className, text } = props;

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <pre className={classNames(cl.CodeRedesigned, {}, [className])}>
          <Icon
            clickable
            onClick={onCopy}
            className={cl.copyBtn}
            Svg={CopyIconNew}
          />
          <code>{text}</code>
        </pre>
      }
      off={
        <pre className={classNames(cl.Code, {}, [className])}>
          <ButtonDeprecated
            onClick={onCopy}
            className={cl.copyBtn}
            theme={ButtonTheme.CLEAR}
          >
            <CopyIcon className={cl.copyIcon} />
          </ButtonDeprecated>
          <code>{text}</code>
        </pre>
      }
    />

    // <pre className={classNames(cl.Code, {}, [className])}>
    //   <Button onClick={onCopy} className={cl.copyBtn} theme={ButtonTheme.CLEAR}>
    //     <CopyIcon className={cl.copyIcon} />
    //   </Button>
    //   <code>{text}</code>
    // </pre>
  );
});
