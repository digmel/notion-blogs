module.exports = {
  content: [
    "./pages/*.{js,ts,jsx,tsx}",
    "./pages/blog/*.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}",
    "./icons/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "gray-50": "#F9FAFB",
        "gray-100": "#F3F4F6",
        "gray-200": "#E5E7EB",
        "gray-300": "#D1D5DB",
        "gray-400": "#9CA3AF",
        "gray-500": "#6B7280",
        "gray-600": "#4B5563",
        "gray-700": "#374151",
        "gray-800": "#1F2937",
        "gray-900": "#111827",
        light: "#ffffff",
        bright: "#FACF0E",
        "sky-100": "#1192DC",
        "sky-200": "#0B7CBC",
        error: "#D52F45",
        success: "#2FD55D",
      },
    },
    container: {
      center: true,
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      serif: ["Poppins", "serif"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
