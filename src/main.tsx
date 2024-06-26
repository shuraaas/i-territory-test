import ReactDOM from 'react-dom/client';

import { App } from './components/app/app';

import './global.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(<App />);
