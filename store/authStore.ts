import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { getItem, removeItem, setItem } from "./storage";

const baseUrl = process.env.EXPO_PUBLIC_API_URL_USERS;

interface User {
  idUser: string;
  name: string;
  lastName: string;
  email: string;
  favoriteCategories?: string[];
  role?: string;
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
  checkAuth: () => Promise<boolean>;
  updateUser: (
    idUser?: string,
    name?: string,
    lastName?: string,
    email?: string
  ) => Promise<boolean>;
  roleProviderRequest: (role?: string, idUser?: string) => Promise<boolean>;
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

  updateUser: async (
    idUser?: string,
    name?: string,
    lastName?: string,
    email?: string
  ) => {
    const updateUser: {
      idUser?: string;
      name?: string;
      lastName?: string;
      email?: string;
    } = {};

    if (idUser) updateUser["idUser"] = idUser;
    if (name) updateUser["name"] = name;
    if (lastName) updateUser["lastName"] = lastName;
    if (email) updateUser["email"] = email;
    try {
      const response = await fetch(`${baseUrl}/edit-user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateUser),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      const data = await response.json();

      if (data?.message === "User updated successfully") {
        // console.log("Update user response data:", data);

        const authData = await getItem("authData");
        if (authData && authData.user) {
          authData.user.name = name;
          authData.user.lastName = lastName;
          authData.user.email = email;

          set(authData);
          await setItem("authData", authData);
        }
      }

      return true;
    } catch (error) {
      console.error("Update user error:", error);
      return false;
    }
  },

  roleProviderRequest: async (role?: string, idUser?: string) => {
    const updateUser: {
      role?: string;
      idUser?: string;
    } = {};

    if (role) updateUser["role"] = role;
    if (idUser) updateUser["idUser"] = idUser;
    console.log("Updating user with data:", updateUser);
    try {
      const response = await fetch(`${baseUrl}/edit-user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateUser),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      const data = await response.json();

      if (data?.message === "User updated successfully") {
        // console.log("Update user response data:", data);

        const authData = await getItem("authData");
        if (authData && authData.user) {
          authData.user.role = role;

          set(authData);
          await setItem("authData", authData);
        }
      }

      return true;
    } catch (error) {
      console.error("Update user error:", error);
      return false;
    }
  },
}));
