import { createBrowserHistory } from 'history';

export const history = (window as any).browserHistory || createBrowserHistory();
