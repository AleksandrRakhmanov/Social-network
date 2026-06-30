import { VerifiedUserOutlined } from '@mui/icons-material';
import { Input } from 'antd';

export const SearchInput = () => {
  return (
    <Input
      size="large"
      placeholder="large size"
      prefix={<VerifiedUserOutlined />}
    />
  );
};
