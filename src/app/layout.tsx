"use client";  // 👈 Add this line at the top

import { Provider } from "react-redux";
import { store } from "../store/store";
import "../styles/globals.css"; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
