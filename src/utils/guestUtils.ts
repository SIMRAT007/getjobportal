// src/utils/guestUtils.ts

export const setGuestMode = () => {
    localStorage.setItem("guest_mode", "true");
  };
  
  export const isGuestUser = (): boolean => {
    return localStorage.getItem("guest_mode") === "true";
  };
  
  export const clearGuestMode = () => {
    localStorage.removeItem("guest_mode");
  };
  