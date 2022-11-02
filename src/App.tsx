import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions';
import { RootState, AppDispatch } from './store/index';
import { PropsCartItem } from './types/PropsCartItem';
import { PropsUiNotification } from './types/PropsUiNotification';

let isInitial = true;

function App() {
  const dispatch: (...args: unknown[]) => Promise<void> =
    useDispatch<AppDispatch>();

  const showCart = useSelector<RootState, boolean>(
    (state) => state.ui.cartIsVisible
  );

  const cart = useSelector<RootState, PropsCartItem>((state) => state.cart);

  const notification = useSelector<RootState, PropsUiNotification>(
    (state) => state.ui.notification
  );

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
