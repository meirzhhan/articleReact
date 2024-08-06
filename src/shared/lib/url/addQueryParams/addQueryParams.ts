/**
 * Функция для получения строки параметров запроса из текущего URL с добавлением новых параметров.
 *
 * @param {OptionalRecord<string, string>} params - Объект с параметрами запроса, где ключи и значения - строки.
 * @returns {string} - Строка параметров запроса, начинающаяся с `?`.
 * Пример:
 * Если текущий URL: `https://example.com?search=abc`
 * и передан объект `{ search: 'def', sort: 'desc' }`,
 * то результатом будет `?search=def&sort=desc`.
 */

export function getQueryParams(params: OptionalRecord<string, string>): string {
  const searchParams = new URLSearchParams(window.location.search);

  Object.entries(params).forEach(([name, value]) => {
    if (value !== undefined) searchParams.set(name, value);
  });

  return `?${searchParams.toString()}`;
  // ?search=${search}
  // Пример: ?search=def&sort=desc
}

/**
 * Функция для добавления параметров запроса в URL без перезагрузки страницы.
 *
 * @param {OptionalRecord<string, string>} params - Объект с параметрами запроса, где ключи и значения - строки.
 * Эта функция изменяет URL в адресной строке, добавляя или обновляя параметры запроса, но не перезагружает страницу.
 */
export function addQueryParams(params: OptionalRecord<string, string>) {
  window.history.pushState(null, '', getQueryParams(params));
}
