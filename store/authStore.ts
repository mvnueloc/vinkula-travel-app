import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { getItem, removeItem, setItem } from "./storage";

const baseUrl = process.env.EXPO_PUBLIC_API_URL_USERS;

interface User {
  name: string;
  lastName: string;
  email: string;
  favoriteCategories?: string[];
}

interface AuthStore {
  isAuthenticated: boolean;
  // setIsAuthenticated: (isAuthenticated: boolean) => void;
  accessToken: string | null;
  user: User | null;
  accesTokenExpiration: number | null;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (
    name: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  accessToken: null,
  user: null,
  accesTokenExpiration: null,
  isAuthenticated: false,
  // setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  login: async (email: string, password: string) => {
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log(data);

      const decodeToken = jwtDecode(data.token);

      console.log(decodeToken);

      const authData = {
        isAuthenticated: true,

        accessToken: null,
        user: decodeToken as User,
        accesTokenExpiration: null,
      };

      set(authData);

      //Guardar los datos en MMKV
      await setItem("authData", authData);

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  },

  logout: async () => {
    //Eliminar los datos en MMKV
    await removeItem("authData");

    set({
      isAuthenticated: false,
      accessToken: null,
      user: null,
      accesTokenExpiration: null,
    });
  },

  register: async (
    name: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, lastName, email, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log(data);

      const authData = {
        isAuthenticated: true,

        accessToken: null,
        user: data.user as User,
        accesTokenExpiration: null,
      };

      console.log(authData.user);

      set(authData);

      //Guardar los datos en MMKV
      await setItem("authData", authData);

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  },

  checkAuth: async () => {
    const authData = await getItem("authData");
    if (authData) {
      await set(authData);
      return true;
    }
    return false;
  },
}));
