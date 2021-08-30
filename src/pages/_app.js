import { Provider } from "react-redux";
import { store } from "../app/store";
import "../styles/globals.css";
import { Provider as AuthProvider } from "next-auth/client";
import { ToastProvider, useToasts } from "react-toast-notifications";

const FormWithToasts = () => {
  const { addToast } = useToasts();

  const onSubmit = async (value) => {
    const { error } = await dataPersistenceLayer(value);

    if (error) {
      addToast(error.message, { appearance: "error" });
    } else {
      addToast("Saved Successfully", { appearance: "success" });
    }
  };

  return <form onSubmit={onSubmit}>...</form>;
};
const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider session={pageProps.session}>
      <ToastProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ToastProvider>
    </AuthProvider>
  );
};

export default MyApp;
