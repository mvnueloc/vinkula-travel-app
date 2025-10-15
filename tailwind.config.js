import heroUINativePlugin from "heroui-native/tailwind-plugin";

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    // App entry (Expo Router usa la carpeta ./app en lugar de App.tsx)
    "./app/**/*.{js,jsx,ts,tsx}",
    // Componentes compartidos
    "./components/**/*.{js,jsx,ts,tsx}",
    // Ejemplos / otras rutas (opcional)
    "./app-example/**/*.{js,jsx,ts,tsx}",
    "./node_modules/heroui-native/lib/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [heroUINativePlugin],
};
