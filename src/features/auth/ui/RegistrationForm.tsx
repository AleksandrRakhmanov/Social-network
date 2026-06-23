import React from 'react';
import { Button, Input, Typography } from 'antd';
import { Navigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { Controller, useForm } from 'react-hook-form';
import { useRegisterMutation, useLazyGetMeQuery } from 'app/api/authApi';
import styles from './AuthForm.module.scss';
import { Form } from 'antd';

export const RegistrationForm = () => {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [triggerGetMe, { data: userData }] = useLazyGetMeQuery();

  const { Title } = Typography;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: 'Вася Пупкин',
      email: 'vasya@gmail.com',
      password: '123456',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    try {
      await registerUser(values).unwrap();
      await triggerGetMe();
    } catch (err) {
      console.warn(err);
      alert('Не удалось зарегистрироваться');
    }
  };

  if (userData) {
    return <Navigate to="/" />;
  }

  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      variant="underlined"
      layout={'vertical'}
    >
      <Title level={2} classNames={{ root: styles.title }}>
        Регистрация
      </Title>
      <Paper classes={{ root: styles.root }}>
        <Controller
          name="fullName"
          control={control}
          rules={{
            required: 'Введите Ваше ФИО',
            minLength: {
              value: 5,
              message: 'ФИО должно содержать минимум 5 символов',
            },
          }}
          render={({ field, fieldState }) => (
            <Form.Item
              label={
                <span>
                  ФИО
                  {fieldState.error && (
                    <span className={styles.errorText}>
                      {' '}
                      — {fieldState.error.message}
                    </span>
                  )}
                </span>
              }
              validateStatus={fieldState.error ? 'error' : ''}
            >
              <Input
                {...field}
                className={styles.field}
                placeholder="Введите Ваше ФИО"
                status={fieldState.error ? 'error' : undefined}
              />
            </Form.Item>
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Введите Ваш Email',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Неверный формат почты',
            },
          }}
          render={({ field, fieldState }) => (
            <Form.Item
              label={
                <span>
                  Почта
                  {fieldState.error && (
                    <span className={styles.errorText}>
                      {' '}
                      — {fieldState.error.message}
                    </span>
                  )}
                </span>
              }
              validateStatus={fieldState.error ? 'error' : ''}
            >
              <Input
                {...field}
                className={styles.field}
                placeholder="Введите Ваш Email"
                status={fieldState.error ? 'error' : undefined}
              />
            </Form.Item>
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: 'Введите Ваш Пароль' }}
          render={({ field, fieldState }) => (
            <Form.Item
              label={
                <span>
                  Пароль
                  {fieldState.error && (
                    <span className={styles.errorText}>
                      {' '}
                      — {fieldState.error.message}
                    </span>
                  )}
                </span>
              }
              validateStatus={fieldState.error ? 'error' : ''}
            >
              <Input.Password
                {...field}
                className={styles.field}
                placeholder="Введите Ваш Пароль"
                status={fieldState.error ? 'error' : undefined}
              />
            </Form.Item>
          )}
        />

        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Войти
        </Button>
      </Paper>
    </Form>
  );
};
