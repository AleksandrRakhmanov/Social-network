import React from 'react';
import { Navigate } from 'react-router-dom';
import { Input, Typography } from 'antd';
import { Button, Form, message } from 'antd';
import { useLoginMutation, useLazyGetMeQuery } from 'app/api/authApi';
import type { LoginDto } from 'entities/user/model/types';
import styles from './AuthForm.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { Paper, TextField } from '@mui/material';

export const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [triggerGetMe, { data: userData }] = useLazyGetMeQuery();
  const { Title } = Typography;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  interface IFieldType {
    email: string;
    password: string;
  }

  const onSubmit: (values: IFieldType) => void = async (values) => {
    try {
      await login(values as LoginDto).unwrap();
      await triggerGetMe();
    } catch (err) {
      console.warn(err);
      message.error('Не удалось авторизоваться');
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
        Вход в аккаунт
      </Title>
      <Paper classes={{ root: styles.root }}>
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
