import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

const rootElem = document.getElementById('root');

const root = ReactDOM.createRoot(rootElem!);
root.render(<App />);