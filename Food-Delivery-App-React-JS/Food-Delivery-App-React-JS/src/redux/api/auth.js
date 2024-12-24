import api from ".";

const auth = api.injectEndpoints({
  endpoints: (build) => {
    return {
      /**
       * get user list
       */
      userList: build.query({
        query: () => `/getall/`,
      }),
      /**
       * register user
       */
      register: build.mutation({
        query: (data) => {
          return {
            url: `register/`,
            method: "POST",
            body: data,
          };
        },
      }),
      /**
       * login user
       */
      login: build.mutation({
        query: (data) => {
          return {
            url: `login/`,
            method: "POST",
            body: data,
          };
        },
      }),
    };
  },
});

export const { useUserListQuery, useRegisterMutation, useLoginMutation } =
  auth;

export default auth;
