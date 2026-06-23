import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import styles from './PostEditor.module.scss';
import { useNavigate } from 'react-router-dom';
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from '../../../app/api/postApi';
import { useUploadImageMutation } from '../../../app/api/uploadApi';

export const PostEditor = ({ postId, initialData }) => {
  const navigate = useNavigate();
  const isEditing = Boolean(postId);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const inputFileRef = useRef(null);

  const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { url } = await uploadImage(formData).unwrap();
      setImageUrl(url);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setText(initialData.text);
      setImageUrl(initialData.imageUrl);
      setTags(initialData.tags?.join(',') || '');
    }
  }, [initialData]);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  const onSubmit = async () => {
    const fields = { title, imageUrl, tags, text };

    try {
      if (isEditing) {
        await updatePost({ id: postId, body: fields }).unwrap();
      } else {
        const data = await createPost(fields).unwrap();
        navigate(`/posts/${data._id}`);
        return;
      }
      navigate(`/posts/${postId}`);
    } catch (err) {
      console.warn('Ошибка при создании статьи', err);
      alert('Ошибка при создании статьи');
    }
  };

  const isLoading = isCreating || isUpdating || isUploading;

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
        disabled={isUploading}
      >
        Загрузить превью
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4444/${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
      />
      <TextField
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button
          onClick={onSubmit}
          size="large"
          variant="contained"
          disabled={isLoading}
        >
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
