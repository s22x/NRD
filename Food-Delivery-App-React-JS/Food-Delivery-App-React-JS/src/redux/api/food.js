import api from ".";

const food = api.injectEndpoints({
  endpoints: (build) => {
    return {
      /**
       * get food list
       */
      getFoodList: build.query({
        query: () => `/food/list/`,
        providesTags: ["Food"],
      }),
      /**
       * update food info
       */
      updateFoodItem: build.mutation({
        query: (data) => {
          return {
            url: `food/cart/update`,
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["Food"],
      }),

      /**
       * get foods by category name
       */
      getFoodsByCategory: build.query({
        query: (name) => {
          return {
            url: `food/category/?category=${name}`,
            method: "GET",
          };
        },
        providesTags: ["Food"],
      }),
      /**
       * cart list
       */
      getCartList: build.query({
        query: () => `food/cart/list`,
        providesTags: ["Food"],
      }),
    };
  },
});

export const {
  useGetFoodListQuery,
  useLazyGetFoodsByCategoryQuery,
  useUpdateFoodItemMutation,
  useGetCartListQuery,
} = food;

export default food;
