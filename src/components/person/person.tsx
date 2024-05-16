import { useState } from 'react';

import { Person as PersonType } from '../../types/types';

import styles from './person.module.scss';

interface PersonProps extends React.ComponentProps<'div'> {
  person: PersonType;
}

export const Person: React.FC<PersonProps> = ({ person }) => {
  const [showParents, setShowParents] = useState<boolean>(false);

  return (
    <div className={styles.person}>
      {person.parents && person.parents.length > 0 ? (
        <div className={styles.wrap}>
          <button onClick={() => setShowParents(!showParents)}>
            {showParents ? '-' : '+'}
          </button>
          <p className={styles.name}>
            {person.name} ({person.birthDate})
          </p>
        </div>
      ) : (
        <p className={styles.name}>
          {person.name} ({person.birthDate})
        </p>
      )}
      {showParents && person.parents && (
        <div className={styles.parents}>
          {person.parents.map(parent => (
            <Person key={parent.id} person={parent} />
          ))}
        </div>
      )}
    </div>
  );
};
