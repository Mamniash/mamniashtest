import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import styles from './Cart.module.scss'
import { store } from '../../store/Store'

export const Cart = observer(() => {
	const cartItems = store.cartItems

	return (
		<div className={styles.cart}>
			<h2>Ваша корзина</h2>
			{cartItems.length === 0 ? (
				<p>Корзина пуста</p>
			) : (
				<>
					<ul className={styles.items}>
						{cartItems.map((item) => (
							<li key={item.id}>
								<img src={item.image} alt={item.title} />
								<h3>{item.title}</h3>
								<p>{item.price}$</p>
								<p>Количество: {item.quantity}</p>
								<button onClick={() => store.removeFromCart(item.id)}>
									Удалить
								</button>
							</li>
						))}
					</ul>
					<div className={styles.bottom}>
						<button onClick={store.clearCart}>Очистить корзину</button>
						<span className={styles.total}>
							Итого: {store.cartTotal}$
						</span>
					</div>
				</>
			)}

			<Link to='/' className='cart-link'>
				Вернуться к покупкам
			</Link>
		</div>
	)
})
