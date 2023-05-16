import AppRoutes from "./router/appRoutes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from "./store/store";
import { useEffect } from "react";
import { onlyFullHD } from "./utils/onlyFullHD";

function App() {
  useEffect(() => {
    onlyFullHD()
  }, [])
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
