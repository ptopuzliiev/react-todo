import Posts from '../components/pages/Posts';
import About from '../components/pages/About';
import Error from '../components/pages/Error';
import PostIdPage from '../components/pages/PostIdPage';
import Login from '../components/pages/Login';

export const privateRoutes = [
  { path: '/about', component: About, exect: true },
  { path: '/posts', component: Posts, exect: true },
  { path: '/posts/:id', component: PostIdPage, exect: true },
  { path: '/*', component: Error, exect: true },
];

export const publicRoutes = [{ path: '/login', component: Login, exect: true }];
