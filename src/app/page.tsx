import { MainPage } from "@/components/mainPage";
import { ThemeProvider } from "@/components/theme-provider";

export default function Home() {
  
  return (
    <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <MainPage />
  </ ThemeProvider>
  );
}
