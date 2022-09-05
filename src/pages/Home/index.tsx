import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadingSelector,
  Product,
  productsSelector,
} from "../../reducers/shopReducer";
import { getProducts } from "../../services";
import ProductItem from "../../components/Product";
import SpinnerLoader from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import useShop from "../../hooks/useShop";

const Home: React.FC = (): React.ReactElement => {
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);
  const products = useSelector(productsSelector);
  const [addProduct] = useShop();
  const pageSize = 8;

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts() as any);
    }
  }, [dispatch, products]);

  const onChangePage = useCallback((page: number): void => {
    setPage(page);
  }, []);

  const storeProducts = useMemo((): Product[] => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    return products.slice(from, to);
  }, [products, page]);

  return (
    <Pagination
      initialPage={1}
      totalPages={products.length / pageSize}
      pageSize={pageSize}
      onChange={onChangePage}
    >
      <div className="flex w-full h-full justify-center flex-wrap gap-1 mt-32 mb-4">
        {loading ? (
          <SpinnerLoader />
        ) : (
          <>
            {storeProducts.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                onAddProduct={() => addProduct(product)}
              />
            ))}
          </>
        )}
      </div>
    </Pagination>
  );
};

export default Home;
