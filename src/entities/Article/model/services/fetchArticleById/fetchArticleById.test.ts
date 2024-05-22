// import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
// import { fetchArticleById } from './fetchArticleById';
// import { ArticleBlockType } from '../../types/article';

// const data = {
//   id: '1',
//   title: 'title',
//   subtitle: 'subtitle',
//   img: 'img',
//   views: 1000,
//   createdAt: '28.04.2003',
//   type: ['IT'],
//   blocks: [],
// };

// describe('fetchProfileData.test', () => {
//   test('success get data', async () => {
//     const thunk = new TestAsyncThunk(fetchArticleById); // mock AsyncThunk
//     thunk.api.get.mockReturnValue(Promise.resolve({ data: data })); // mock return data

//     const result = await thunk.callThunk(); // results of mocked AsyncThunk(meta, payload)
//     // console.log(result);

//     expect(thunk.api.get).toHaveBeenCalled(); // .get should work
//     expect(result.meta.requestStatus).toBe('fulfilled'); // status should be fulfilled
//     expect(result.payload).toEqual(data); // payload should be data
//   });

//   test('error get data', async () => {
//     const thunk = new TestAsyncThunk(fetchProfileData);
//     thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 })); // mock error
//     const result = await thunk.callThunk();

//     expect(result.meta.requestStatus).toBe('rejected');
//   });
// });
