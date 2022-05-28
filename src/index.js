import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './utility.css'
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
	<Navbar />
	<br/>
    <BrowserRouter>
		<Routes>
			<Route path="/" element={<App />}>
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<Signup />} />
				{/* <Route path=":user" element={<UserPage />} /> */}
			</Route>
		</Routes>
    </BrowserRouter>
  </React.StrictMode>  
);
