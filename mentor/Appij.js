import "react-native-gesture-handler";
import Navigation from "./navigation";
import { ThemeProvider } from "./components/ThemeContext";

export default function Appij() {
  return (
    <ThemeProvider>
    <Navigation />
    </ThemeProvider>
    );
}