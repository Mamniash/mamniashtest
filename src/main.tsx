import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProductList } from './components/ProductList/ProductList'
import { Cart } from './components/Cart/Cart'
import './index.scss'

const router = createBrowserRouter([
	{
		path: '/',
		element: <ProductList />
	},
	{
		path: '/cart',
		element: <Cart />
	}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
