import * as React from "react";
import Routes from "./Router/route";
import { AuthProvider } from "./provider/authProvider";
import { CartProvider } from "./provider/defaultProvider/cartContext";
import { DataProvider } from "./provider/defaultProvider/dataContext";

function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <CartProvider>
          <Routes />
        </CartProvider>
      </AuthProvider>
    </DataProvider>
  );
}

export default App;
