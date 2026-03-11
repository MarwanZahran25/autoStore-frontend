
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AddProductForm from "./pages/AddProductForm";
import ProudctsList from "./pages/productsList";
import ProductPage from "./pages/productPage";
import MainPage from "./pages/MainPage";
import ReceiptsPage from "./pages/ReceiptPage";
import AllReceiptsPage from "./pages/AllReceiptsPage";
import TransactionsPage from "./pages/TransactionsPage";
import SignInPage from "./pages/SignInPage";
import { Toaster } from "sonner";
import { Routes, Route } from "react-router";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" richColors={true} />
      <Routes>
        <Route path="/login" element={<SignInPage />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="products/add" element={<AddProductForm />} />
            <Route path="products/all" element={<ProudctsList />} />
            <Route path="product/:id" element={<ProductPage />} />

            <Route path="transactions/all" element={<TransactionsPage />} />
            <Route path="receipts">
              <Route index element={<AllReceiptsPage />} />
              <Route path="all" element={<AllReceiptsPage />} />
              <Route path="new" element={<ReceiptsPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}
