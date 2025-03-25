


// import { useState } from "react";
// import { Container, Button, Group, Text, ActionIcon, Paper } from "@mantine/core";
// import { RichTextEditor } from "@mantine/tiptap";
// import { useEditor, Extension } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import TextStyle from "@tiptap/extension-text-style";
// import Color from "@tiptap/extension-color";
// import Placeholder from "@tiptap/extension-placeholder";
import React, { useState } from "react";
import { Container, Button, Group, Text, ActionIcon, Paper } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import "../App.css";

// ANSI color codes for Discord
const textColors = [
  { name: "#e63946", ansi: "\x1b[31m" }, // Red
  { name: "#2a9d8f", ansi: "\x1b[32m" }, // Green
  { name: "#f4a261", ansi: "\x1b[33m" }, // Yellow
  { name: "#264653", ansi: "\x1b[34m" }, // Blue
  { name: "#8a4d76", ansi: "\x1b[35m" }, // Purple
  { name: "#457b9d", ansi: "\x1b[36m" }, // Cyan
  { name: "#ff7f00", ansi: "\x1b[38;5;214m" }, // Orange
  { name: "#1e3a8a", ansi: "\x1b[38;5;21m" }, // Deep Blue
];

const backgroundColors = [
  { name: "#f8d7da", ansi: "\x1b[41m" }, // Light Red
  { name: "#d4edda", ansi: "\x1b[42m" }, // Light Green
  { name: "#fff3cd", ansi: "\x1b[43m" }, // Light Yellow
  { name: "#d1ecf1", ansi: "\x1b[44m" }, // Light Blue
  { name: "#f8d7ff", ansi: "\x1b[45m" }, // Light Purple
  { name: "#d6d8db", ansi: "\x1b[47m" }, // Light Grey
];

export default function DiscordColorText() {
  const [coloredText, setColoredText] = useState("");
  const [copied, setCopied] = useState(false);
  const [currentTextColor, setCurrentTextColor] = useState("");
  const [currentBgColor, setCurrentBgColor] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }), // Enable background color
      Placeholder.configure({
        placeholder: "Type here...",
      }),
    ],
    content: "<p>Welcome to Rebane's Discord Colored Text Generator!</p>",
  });

  // Apply text color
  const applyTextColor = (color) => {
    if (!editor) return;
    editor.chain().focus().setMark("textStyle", { color }).run();
    setCurrentTextColor(color);
  };

  // Apply background color correctly
const applyBackgroundColor = (color) => {
  if (!editor) return;

  // Log the previous background color before applying new one
  console.log("Previous Background Color:", currentBgColor);

  // Use highlight extension for background color
  editor.chain().focus().toggleHighlight({ color }).run();

  // Update state and log the new background color
  setCurrentBgColor(prevColor => {
    console.log("New Background Color:", color);
    return color;
  });
};
const convertHTMLToAnsi = (html) => {
  return html
    .replace(/<span style="color: (#[0-9a-fA-F]+);?">(.+?)<\/span>/g, (match, color, text) => {
      return `\x1b[38;2;${hexToRGB(color)}m${text}\x1b[0m`;
    })
    .replace(/<mark style="background-color: (#[0-9a-fA-F]+); color: inherit">(.+?)<\/mark>/g, (match, bgColor, text) => {
      return `\x1b[48;2;${hexToRGB(bgColor)}m${text}\x1b[0m`;
    });
};
const convertToAnsi = (text) => {
  let textAnsi = textColors.find(c => c.name === currentTextColor)?.ansi || "";
  let bgAnsi = backgroundColors.find(c => c.name === currentBgColor)?.ansi || "";

  return `${bgAnsi}${textAnsi}${text}\x1b[0m`;
};




// Convert HEX to RGB (needed for ANSI codes)
const hexToRGB = (hex) => {
  const bigint = parseInt(hex.slice(1), 16);
  return `${(bigint >> 16) & 255};${(bigint >> 8) & 255};${bigint & 255}`;
};
    

const copyToClipboard = () => {
  if (!editor) {
    console.error("❌ Editor instance not found.");
    return;
  }

  // Extract plain text instead of HTML
  const plainText = editor.getText();
  console.log("📜 Extracted Plain Text:", plainText);

  // Convert text to ANSI format
  const ansiFormattedText = convertToAnsi(plainText);
  console.log("🎨 ANSI Formatted Text:", ansiFormattedText);

  if (!ansiFormattedText.trim()) {
    console.warn("⚠️ Empty ANSI text, nothing to copy.");
    alert("No content to copy!");
    return;
  }

  // Discord ANSI block format
  const finalCopyText = `\`\`\`ansi\n${ansiFormattedText}\n\`\`\``;
  console.log("📋 Final text copied:", finalCopyText);

  // Copy to clipboard
  navigator.clipboard.writeText(finalCopyText)
    .then(() => {
      console.log("✅ Successfully copied to clipboard!");
      // alert("Text copied! Try pasting in Discord.");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    })
    .catch(err => {
      console.error("❌ Copy failed:", err);
      alert("Copy failed! Check console for details.");
    });
};



  // Generate ANSI formatted text for Discord
  const generateAnsiText = () => {
    if (!editor) return;

    let content = editor.getText();
    let textAnsi = textColors.find(c => c.name === currentTextColor)?.ansi || "";
    let bgAnsi = backgroundColors.find(c => c.name === currentBgColor)?.ansi || "";

    const finalAnsiText = `${bgAnsi}${textAnsi}${content}\x1b[0m`;
    setColoredText(`\`\`\`ansi\n${finalAnsiText}\n\`\`\``);
  };

  
  // const copyToClipboard = () => {
  //   generateAnsiText();  // Ensure ANSI text is generated
  //   setTimeout(() => {
  //     navigator.clipboard.writeText(coloredText);
  //     setCopied(true);
    
  //     setTimeout(() => setCopied(false), 1000);
  //   }, 100); // Delay to ensure state updates before copying
  // };
  
  return (
    <Container size="md" className="container">
      <Paper shadow="xl" radius="lg" p="xl" className="paper">
        <Text size="xl" weight={700} align="center" className="title">
          Discord Colored Text Generator
        </Text>

        {/* RichTextEditor */}
        <RichTextEditor editor={editor} className="editor">
          <RichTextEditor.Content />
        </RichTextEditor>

        {/* Text Color Selection */}
        <Text align="center" weight={600} mt="md">Text Color</Text>
        <Group position="center" mt="md" spacing="md">
          {textColors.map((color) => (
            <ActionIcon
              key={color.name}
              size={50}
              radius="md"
              className="color-box"
              style={{ backgroundColor: color.name }}
              onClick={() => applyTextColor(color.name)}
            />
          ))}
        </Group>

        {/* Background Color Selection */}
        <Text align="center" weight={600} mt="md">Background Color</Text>
        <Group position="center" mt="md" spacing="md">
          {backgroundColors.map((color) => (
            <ActionIcon
              key={color.name}
              size={50}
              radius="md"
              className="color-box"
              style={{ backgroundColor: color.name }}
              onClick={() => applyBackgroundColor(color.name)}
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

