import "react-native-gesture-handler";
import { ThemeProvider } from "@react-navigation/native";
import Navigation from "./navigation";

export default function Appij() {
  return (
  <ThemeProvider>
    <Navigation />
    </ThemeProvider>
    );
}