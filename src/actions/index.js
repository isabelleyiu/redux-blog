import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPosts = () => {
  return async (dispatch, getState) => {
    const response = await jsonPlaceholder.get('/posts');

    dispatch({
      type: 'FETCH_POSTS',
      payload: response.data
    });
  }
};

// fetching one user at a time
export const fetchUser = userId => dispatch => _fetchUser(userId, dispatch);

// _ for private function
// memoize to only fetch user info once
const _fetchUser = _.memoize(async (userId, dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${userId}`);

  dispatch({
    type: 'FETCH_USER',
    payload: response.data
  })
});

// another approach
// export const fetchUser = userId => async dispatch => {
//   const response = await jsonPlaceholder.get(`/users/${userId}`);

//   dispatch({
//     type: 'FETCH_USER',
//     payload: response.data
//   });
// };

// export const fetchPostsAndUsers = () => async (dispatch, getState) => {
//   await dispatch(fetchPosts());

//   const userIds = _.uniq(_.map(getState().posts, 'userId'));

//   userIds.forEach(userId => fetchUser(userId));
// };