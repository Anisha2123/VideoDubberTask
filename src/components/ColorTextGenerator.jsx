


import { useState } from "react";
import { Container, Button, Group, Text, ActionIcon, Paper } from "@mantine/core";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";
import "../App.css";

const colors = [
  { name: "#e63946", code: "\x1b[31m" }, // Red
  { name: "#2a9d8f", code: "\x1b[32m" }, // Green
  { name: "#f4a261", code: "\x1b[33m" }, // Yellow
  { name: "#264653", code: "\x1b[34m" }, // Blue
  { name: "#8a4d76", code: "\x1b[35m" }, // Purple
  { name: "#457b9d", code: "\x1b[36m" },  // Cyan
  { name: "#ff7f00", code: "\x1b[38;5;214m" }, // Orange 🟠
  { name: "#1e3a8a", code: "\x1b[38;5;21m" }, // Deep Blue 🔵
];

export default function DiscordColorText() {
  const [coloredText, setColoredText] = useState("");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(coloredText);
    setCopied(true); // Change button state
  
    setTimeout(() => {
      setCopied(false); // Revert after 1 second
    }, 1000);
  };
  

  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color, Placeholder.configure({
        placeholder: "Type here...", // 👈 This sets the placeholder text
      }),],
   "content" : "<p>Welcome to Rebane's Discord Coored Text Generator!</p>",
  });

  const applyColor = (color) => {
    if (!editor) return;

    const { from, to } = editor.state.selection;
    if (from === to) {
      alert("Please select some text first!");
      return;
    }

    editor.chain().focus().setMark("textStyle", { color }).run();

    const fullText = editor.getText();
    const selectedText = fullText.slice(from, to);
    const ansiText = `${colors.find(c => c.name === color)?.code}${selectedText}\x1b[0m`;

    setColoredText(`\`\`\`ansi\n${ansiText}\n\`\`\``);
  };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(coloredText);
//     alert("Copied to clipboard!");
//   };

  return (
    <Container size="md" className="container">
      <Paper shadow="xl" radius="lg" p="xl" className="paper">
        <Text size="xl" weight={700} align="center" className="title">
          Discord Colored Text Generator
        </Text>

        {/* RichTextEditor - Now fully editable */}
        <RichTextEditor editor={editor} className="editor">
          <RichTextEditor.Content />
        </RichTextEditor>

        <Group position="center" mt="md" spacing="md" className="color-group">
          {colors.map((color) => (
            <ActionIcon
              key={color.name}
              size={50}
              radius="md"
              className="color-box"
              style={{ backgroundColor: color.name }}
              onClick={() => applyColor(color.name)}
            />
          ))}
        </Group>

        <textarea value={coloredText} readOnly className="textarea output" />

        <Button 
  fullWidth 
  mt="md" 
  size="md" 
  className={`copy-button ${copied ? "copied" : ""}`} 
  onClick={copyToClipboard}
>
  {copied ? "✔ Copied!" : "Copy to Clipboard"}
</Button>
      </Paper>
    </Container>
  );
}

  