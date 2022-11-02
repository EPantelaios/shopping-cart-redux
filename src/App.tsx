import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData } from './store/cart-slice';
import { RootState, AppDispatch } from './store/index';

let isInitial = true;

function App() {
  const dispatch: (...args: unknown[]) => Promise<void> =
    useDispatch<AppDispatch>();

  const showCart = useSelector<RootState, boolean>(
    (state) => state.ui.cartIsVisible
  );
  const cart = useSelector<
    RootState,
    {
      items: unknown[];
      totalQuantity: number;
    }
  >((state) => state.cart);
  const notification = useSelector<
    RootState,
    { status: string; title: string; message: string }
  >((state) => state.ui.notification);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCartData(cart));
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
