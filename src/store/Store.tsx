import { makeAutoObservable } from 'mobx'
import axios from 'axios'

export interface Product {
	id: number
	title: string
	price: number
	description: string
	category: string
	image: string
	rating: {
		rate: number
		count: number
	}
}

class Store {
	products: Product[] = []
	cart: { [id: number]: number } = {}
	searchQuery: string = ''

	constructor() {
		makeAutoObservable(this)
	}

	fetchProducts = async () => {
		const response = await axios.get('https://fakestoreapi.com/products')
		this.products = response.data
	}

	addToCart = (id: number) => {
		if (this.cart[id]) {
			this.cart[id] += 1
		} else {
			this.cart[id] = 1
		}
	}

	removeFromCart = (id: number) => {
		delete this.cart[id]
	}

	get cartItems() {
		return this.products
			.filter((product) => this.cart[product.id])
			.map((product) => ({
				...product,
				quantity: this.cart[product.id]
			}))
	}

	get cartCount() {
		return Object.values(this.cart).reduce((sum, count) => sum + count, 0)
	}

	get cartTotal() {
		return this.cartItems.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		)
	}

	setSearchQuery(query: string) {
		this.searchQuery = query.toLowerCase()
	}

	get filteredProducts() {
		return this.products.filter((product) =>
			product.title.toLowerCase().includes(this.searchQuery)
		)
	}

	clearCart = () => {
		this.cart = {}
	}
}

export const store = new Store()
