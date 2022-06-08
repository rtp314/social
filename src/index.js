import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/utility.css';
import "./styles/chat.css";
import './styles/navbar.css';
import './styles/posts.css'
import Navbar from './components/Navbar'
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import User from './pages/User';
import { UserContextProvider } from './libs/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
	<UserContextProvider>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navbar />}>
					<Route index element={<App/>} />
					<Route path="login" element={<Login />} />
					<Route path="signup" element={<Signup />} />
					<Route path="user" element={<User />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</UserContextProvider>
  </React.StrictMode>  
);
