import { Layout } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';

import LayoutStyle from './Layout.module.scss';
import { setToken } from 'js/helpers/api';

interface Me {
  me: {
    id: number;
    username: string;
    fullName: string;
    status: number;
  };
}

const Header = ({ me }: Me) => {
  const queryClient = useQueryClient();
  const history = useHistory();

  const handleSignOut = () => {
    setToken('');
    queryClient.clear();
    history.push('/sign-in');
  };
  return (
    <Layout.Header className={LayoutStyle.header}>
      <h3>Task Management</h3>
      <p>
        {me.fullName || me.username} <LogoutOutlined onClick={handleSignOut} />
      </p>
    </Layout.Header>
  );
};

export default Header;
