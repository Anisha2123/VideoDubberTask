


import { MantineProvider } from "@mantine/core";
import ColorTextGenerator from "./components/ColorTextGenerator";

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ColorTextGenerator />
    </MantineProvider>
  );
}

