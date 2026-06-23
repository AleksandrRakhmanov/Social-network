import React from 'react';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useGetMeQuery } from 'app/api/authApi';
import { PostEditor } from '../../features/postEditor';
import { useGetPostQuery } from '../../app/api/postApi';

export const AddPost = () => {
  const { id } = useParams();
  const { data: userData } = useGetMeQuery();
  const isEditing = Boolean(id);

  const { data: initialData } = useGetPostQuery(id, {
    skip: !isEditing,
  });

  if (!localStorage.getItem('token') && !userData) {
    return <Navigate to="/" />;
  }

  return <PostEditor postId={id} initialData={initialData} />;
};
