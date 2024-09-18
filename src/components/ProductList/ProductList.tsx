import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './ProductList.module.scss'
import { store } from '../../store/Store'

export const ProductList = observer(() => {
	useEffect(() => {
		store.fetchProducts()
	}, [])

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		store.setSearchQuery(event.target.value)
	}

	return (
		<div>
			<h2 className={styles.title}>Каталог товаров</h2>
			<input
				type='text'
				className={styles.input}
				placeholder='Поиск по товарам'
				onChange={handleSearch}
			/>

			<div className={styles.container}>
				{store.filteredProducts.length > 0 ? (
					store.filteredProducts.map((product) => (
						<div key={product.id} className={styles.card}>
							<img src={product.image} alt={product.title} />
							<h3>{product.title}</h3>
							<p>Цена: {product.price}$</p>
							<p>Рейтинг: {product.rating.rate}</p>
							<button onClick={() => store.addToCart(product.id)}>
								Добавить в корзину ({store.cart[product.id] || 0})
							</button>
						</div>
					))
				) : (
					<div className={styles.notFound}>Товары не найдены :(</div>
				)}
			</div>

			<Link to='/cart' className='cart-link'>
				Корзина ({store.cartCount})
			</Link>
		</div>
	)
})
