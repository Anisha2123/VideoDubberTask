


import { useState } from "react";
import { Container, Textarea, Button, Group, Text, ActionIcon, Paper } from "@mantine/core";
import "../App.css";

const colors = [
  { name: "#e63946", code: "\u001b[31m" }, // Red
  { name: "#2a9d8f", code: "\u001b[32m" }, // Green
  { name: "#f4a261", code: "\u001b[33m" }, // Yellow
  { name: "#264653", code: "\u001b[34m" }, // Blue
  { name: "#8a4d76", code: "\u001b[35m" }, // Purple
  { name: "#457b9d", code: "\u001b[36m" }  // Cyan
];

export default function DiscordColorText() {
  const [text, setText] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [coloredText, setColoredText] = useState("");

  // Handle text selection
  const handleSelection = (event) => {
    const input = event.target;
    const selected = input.value.substring(input.selectionStart, input.selectionEnd);
    setSelectedText(selected);
  };

  // Apply ANSI color to selected text
  const applyColor = (colorCode) => {
    if (!selectedText) {
      alert("Please select some text first!");
      return;
    }
  
    // Ensure only the first occurrence of selectedText is replaced
    const regex = new RegExp(`(${selectedText})`, "i");
    const newText = text.replace(regex, `${colorCode}${selectedText}\x1b[0m`);
  
    // Format for Discord (use ANSI code block)
    setColoredText(`\`\`\`ansi\n${newText}\n\`\`\``);
  };
  

  // Copy text to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(coloredText);
    alert("Copied to clipboard!");
  };

  return (
    <Container size="md" className="container">
      <Paper shadow="xl" radius="lg" p="xl" className="paper">
        <Text size="xl" weight={700} align="center" className="title">
          Discord Colored Text Generator
        </Text>
        <Textarea
          placeholder="Enter your text here"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onSelect={handleSelection}
          autosize
          minRows={3}
          size="md"
          className="textarea"
        />
        <Group position="center" mt="md" spacing="md" className="color-group">
          {colors.map((color) => (
            <ActionIcon
              key={color.name}
              size={50}
              radius="md"
              className="color-box"
              style={{ backgroundColor: color.name }}
              onClick={() => applyColor(color.code)}
            />
          ))}
        </Group>
        <Textarea
          mt="md"
          value={coloredText}
          readOnly
          autosize
          minRows={3}
          size="md"
          className="textarea output"
        />
        <Button fullWidth mt="md" size="md" className="copy-button" onClick={copyToClipboard}>
          Copy to Clipboard
        </Button>
      </Paper>
    </Container>
  );
}
