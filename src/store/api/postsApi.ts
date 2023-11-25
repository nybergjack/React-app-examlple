import { createApi } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../firebase-config";

const firebaseBaseQuery = async ({
  url,
  method,
  body,
  id,
}: {
  baseUrl?: string;
  url: string;
  method: string;
  body?: any;
  id?: string;
}) => {
  switch (method) {
    case "GET":
      const snapshot = await getDocs(collection(db, url));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return { data };

    case "POST":
      const docRef = await addDoc(collection(db, url), body);
      return { data: { id: docRef.id, ...body } };

    default:
      throw new Error(`Unhandled method ${method}`);
  }
};

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: firebaseBaseQuery,
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: ({ post }) => ({
        method: "POST",
        url: "posts",
        body: post,
      }),
    }),
    getPosts: builder.query({
      query: ({}) => ({
        method: "GET",
        baseUrl: "",
        url: "posts",
        body: "",
      }),
    }),
  }),
});

export const { useCreatePostMutation, useGetPostsQuery } = postsApi;
