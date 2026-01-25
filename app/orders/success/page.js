import { Suspense } from "react";
import OrderSuccessPage from "./OrderSuccessfulClient";

export default function Page() {
  return (
    <Suspense>
        <OrderSuccessPage />
    </Suspense>
  );
}