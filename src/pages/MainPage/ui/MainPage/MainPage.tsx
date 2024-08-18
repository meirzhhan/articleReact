import { useSelector } from 'react-redux';

import { Page } from '@/widgets/Page';
import { Contacts } from '@/widgets/Contacts';

import { getUserAuthData } from '@/entities/User';

import { VStack } from '@/shared/ui/Stack';

import { MainInfo } from '../MainInfo/MainInfo';
import { MainRecommendation } from '../MainRecommendation/MainRecommendation';

/**
 * `MainPage` компонент отображает основную страницу приложения.
 *
 * В зависимости от авторизованности (`authData`), условно рендерит компонент рекомендаций.
 *
 * @returns {JSX.Element} Основная страница приложения с условным рендерингом рекомендаций и контактной информацией.
 */

const MainPage = (): JSX.Element => {
  const authData = useSelector(getUserAuthData);

  return (
    <Page data-testid="MainPage">
      <VStack gap="32" align="center">
        <MainInfo authData={authData} />

        {authData && <MainRecommendation />}
        <Contacts />
      </VStack>
    </Page>
  );
};

export default MainPage;
