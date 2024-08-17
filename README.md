## Технологии

- React
- TypeScript
- SCSS
- Redux Toolkit
- RTK query
- jest / testing-library
- i18next
- webpack
- и т.д.

---

## Deploy на сайте

Проект и сервер развернуты на двух сайтах. Логин для входа: **`user`**, пароль: **`123`**.

- Frontend: [zhannews](https://zhannews.netlify.app/)
- Backend серер: [backendForArticle](https://backend-for-articles.vercel.app/)

Репозиторий сервера [здесь](https://github.com/meirzhhan/dbForArticleReact)

---

## Скрипты

- `npm run start:dev:webpack` - Запуск webpack dev server + backend
- `npm run start:dev:vite` - Запуск vite + backend
- `npm run start:server` - Запуск backend сервера
- `npm run build:prod` - Сборка в prod режиме со ссылкой на задеполенный сервер

---

## Архитектура

Архитектура проекта сделана с помощью методологии [Feature-Sliced Design](https://feature-sliced.design/ru/docs/get-started/overview)

Проект состоит из 6 слоев:

- app
- pages
- widgets
- features
- entities
- shared

---

## Тесты

`npm run unit` - Запуск тестов

Проект состоит из обычных unit тестов и тестов на компоненты с testing-library на jest.

- Test Suites: 26 passed, 26 total
- Tests: 69 passed, 69 total

---

## Конфигурация и сборщик проекта

В качестве сборщика проекта используется webpack c конфигурацией ниже:

- [/config/build](/config/build) - конфигурация webpack (loader, plugins, resolver, devServer)
- [/config/jest](/config/jest) - конфигурация среды jest

---

## Интернационализация

Используется библиотека i18next для интернационализации.
Файлы с переводами хранятся [здесь](/public/locales).
Сайт поддерживает русский и английский.

---

## Обработка данных

Данные с сервера обрабатываются с помощью Redux Toolkit, также нормализация с EntityAdapter. [Пример слайса](/src/pages/ArticlesPage/model/slices/articlesPageSlice.ts) и [пример async thunk](/src/features/editableProfile/model/services/updateProfileData/updateProfileData.ts)

Запросы на сервер отправляются с помощью [RTK query](/src/shared/api/rtkApi.ts)

Для асинхронного подключения и удаления редюсера после монтирования или размонтирования используется
[DynamicReducer](/src/shared/lib/components/DynamicReducer/DynamicReducer.tsx)

---

## features

- [articleRating](/src/features/articleRating)
- [articleRecommendation](/src/features/articleRecommendation)
- [addCommentForm](/src/features/addCommentForm)
- [articleTypes](/src/features/articleTypes)
- [articleViews](/src/features/articleViews)
- [langSwitch](/src/features/langSwitch)
- [themeSwitch](/src/features/themeSwitch)
- [articleSortListBox](/src/features/articleSortListBox)
- [authentication](/src/features/authentication)
- [avatarDropdown](/src/features/avatarDropdown)
- [editableProfile](/src/features/editableProfile)
- [notificationTrigger](/src/features/notificationTrigger)
- [scrollToTopTrigger](/src/features/scrollToTopTrigger)
- [settingsFeatures](/src/features/settingsFeatures)

<!-- ## <a name="test_test">Сущности (entities)</a> -->

<!-- <details name="entities"> -->
 <!-- <summary name="entities">entities</summary> -->

---

## entities

- [Article](/src/entities/Article)
- [User](/src/entities/User)
- [Comment](/src/entities/Comment)
- [Profile](/src/entities/Profile)
- [Country](/src/entities/Country)
- [Feature](/src/entities/Feature)
- [Currency](/src/entities/Currency)
- [Notification](/src/entities/Notification)
- [Rating](/src/entities/Rating)
<!-- </details> -->
