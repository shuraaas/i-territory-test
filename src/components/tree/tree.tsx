import React from 'react';

import { Person } from '../person';

import { Person as PersonType } from '../../types/types';

interface TreeProps extends React.ComponentProps<'div'> {
  familyTree: PersonType;
}

export const Tree: React.FC<TreeProps> = ({ familyTree }) => {
  return <Person person={familyTree} />;
};
