import { Suspense } from "react";
import ProductsPage from "./ProductsClient";

export default function Page() {
  return (
    <Suspense>
        <ProductsPage />
    </Suspense>
  );
}