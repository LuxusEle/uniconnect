import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: 'class',
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            animation: {
                blob: "blob 7s infinite",
                'spin-slow': "spin 3s linear infinite",
            },
            keyframes: {
                blob: {
                    "0%": {
                        transform: "translate(0px, 0px) scale(1)",
                    },
                    "33%": {
                        transform: "translate(30px, -50px) scale(1.1)",
                    },
                    "66%": {
                        transform: "translate(-20px, 20px) scale(0.9)",
                    },
                    "100%": {
                        transform: "translate(0px, 0px) scale(1)",
                    },
                },
            },
            colors: {
                transparent: "transparent",
                current: "currentColor",
                white: "#ffffff",
                black: "#000000",
                // Soft UI Colors
                gray: {
                    50: "#f8f9fa",
                    100: "#f8f9fa",
                    200: "#e9ecef",
                    300: "#dee2e6",
                    400: "#ced4da",
                    500: "#adb5bd",
                    600: "#6c757d",
                    700: "#495057",
                    800: "#343a40",
                    900: "#212529",
                },
                blue: {
                    DEFAULT: "#cb0c9f", // Soft UI Primary (Magenta-ish)
                    50: "#fef2f8",
                    100: "#fde6f2",
                    200: "#fbd0e9",
                    300: "#faaddf",
                    400: "#f88ad5",
                    500: "#cb0c9f", // Main
                    600: "#a30a80",
                    700: "#7a0760",
                    800: "#510540",
                    900: "#290220",
                },
                info: {
                    DEFAULT: "#17c1e8",
                    100: "#d1f3fa",
                    500: "#17c1e8",
                },
                success: {
                    DEFAULT: "#82d616",
                    100: "#e6f7d0",
                    500: "#82d616",
                },
                warning: {
                    DEFAULT: "#fbcf33",
                    500: "#fbcf33"
                },
                danger: {
                    DEFAULT: "#ea0606",
                    500: "#ea0606"
                },
                dark: {
                    DEFAULT: "#344767",
                    500: "#344767",
                    900: "#252f40" // Sidebar text
                }
            },
            fontFamily: {
                sans: ['"Open Sans"', "sans-serif"],
            },
            boxShadow: {
                'soft-xs': "0 2px 9px -5px rgba(0, 0, 0, 0.15)",
                'soft-sm': "0 5px 10px -5px rgba(0, 0, 0, 0.15)",
                'soft-md': "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                'soft-xl': "0 20px 27px 0 rgba(0, 0, 0, 0.05)",
                'soft-input': "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
            }
        },
    },
    plugins: [],
};
export default config;
