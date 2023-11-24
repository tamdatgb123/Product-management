import * as React from "react";
import Routes from "./Router/route";
import { AuthProvider } from "./provider/authProvider";

function App() {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    )
}

export default App;