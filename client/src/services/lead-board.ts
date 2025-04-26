import { baseApi } from "./base-api";

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getLeadBoard: builder.query({
            query: ({ search, period }) => ({
                url: `lead-board?search=${search}&period=${period}`,
                method: 'GET',
            }),
        }),
        addLeadBoard: builder.mutation({
            query: (data) => ({
                url: 'lead-board',
                method: 'POST',
                body: data
            }),
        }),
        AddActivity: builder.mutation({
            query: (data) => ({
                url: 'lead-board/add-activity',
                method: 'POST',
                body: data
            }),
        }),
    }),
});

export const { useGetLeadBoardQuery, useAddLeadBoardMutation, useAddActivityMutation } = categoryApi;
