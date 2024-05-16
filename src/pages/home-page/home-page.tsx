import { useEffect, useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';

import { Tree } from '../../components/tree';
import { useAuthStore } from '../../store/authStore';

import styles from './home-page.module.scss';

interface HomeProps extends React.ComponentProps<'div'> {}

export const Home: React.FC<HomeProps> = () => {
  const [familyTree, setFamilyTree] = useState(null);
  const logout = useAuthStore(state => state.logout);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/descendant');
        setFamilyTree(response.data);
      } catch (error: any) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h1 className={styles.title}>Дерево предков</h1>
        <Button type="primary" onClick={() => logout()}>
          Выход
        </Button>
      </header>
      {familyTree ? <Tree familyTree={familyTree} /> : <p>Загрузка...</p>}
    </div>
  );
};
