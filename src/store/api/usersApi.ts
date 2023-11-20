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
    case "GET": {
      const snapshot = await getDocs(collection(db, url));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return { data };
    }
    case "POST": {
      const docRef = await addDoc(collection(db, url), body);
      return { data: { id: docRef.id, ...body } };
    }
    case "DELETE": {
      if (!id) {
        throw new Error("Id måste skickas in");
      }
      await deleteDoc(doc(db, url, id));
      return { data: { id } };
    }
    case "PUT": {
      if (!id || !body) {
        throw new Error("Id och namn måste skickas in.");
      }
      await updateDoc(doc(db, url, id), body);
      return { data: body };
    }
    default: {
      throw new Error(`Unhandled method ${method}`);
    }
  }
};

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: firebaseBaseQuery,
  tagTypes: ["users"],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: ({ user }) => ({
        method: "POST",
        url: "users",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),
    getUsers: builder.query({
      query: ({}) => ({
        method: "GET",
        baseUrl: "",
        url: "users",
        body: "",
      }),
      providesTags: ["users"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: "users",
        id,
      }),
    }),

    updateUser: builder.mutation({
      query: ({ user }) => {
        return {
          method: "PUT",
          baseUrl: "",
          url: "users",
          body: user,
          id: user.id,
        };
      },
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersApi;
