import PublicSDK from "baddley-lotr-sdk";
import React, { useContext } from "react";

const sdk = new PublicSDK();
export const SDKContext = React.createContext(sdk);
export const useSDKContext = () => useContext(SDKContext);
export default function SDKProvider({ children }) {
  return <SDKContext.Provider value={sdk}>{children}</SDKContext.Provider>;
}
