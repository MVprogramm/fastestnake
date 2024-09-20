// CameraContext.tsx
import { createContext, useContext } from "react";
import { Camera } from "three";

interface CameraContextType {
  camera: Camera | null;
}

const CameraContext = createContext<CameraContextType | undefined>(undefined);

export const useCamera = () => {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error("useCamera must be used within a CameraProvider");
  }
  return context.camera;
};

export const CameraProvider = CameraContext.Provider;
