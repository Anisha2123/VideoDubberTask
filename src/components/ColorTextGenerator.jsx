


import React, { useState } from "react";
// import { Container, Button, Group, Text, ActionIcon, Paper } from "@mantine/core";
import { ActionIcon, Container, Textarea, Button, Title, Text, Paper, Group, Stack, Tooltip } from '@mantine/core';
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";

import "../App.css";

// Mapping for Discord-supported foreground (text) ANSI colors
const fgMapping = {
  "Gray": "30",
  "Red": "31",
  "Green": "32",
  "Yellow": "33",
  "Blue": "34",
  "Pink": "35",
  "Cyan": "36",
  "White": "37" // Fixed: Previously incorrect, now correct!
};


// Mapping for Discord-supported background ANSI colors
const bgMapping = {
  "Red": "40",
  // "Firefly Dark Blue": "40",
  "Orange": "41",
  // "Blue": "42",
  // "Greyish Turquoise": "43",
  // "Gray": "44",
  "Indigo": "45",
  "Grey": "46",
  // "White": "47"
};

/**
 * convertHTMLToAnsi()
 * - Removes <p>, <span>, and <mark> tags.
 * - For <span style="color: COLOR">…</span> uses fgMapping.
 * - For <mark data-color="COLOR" style="background-color: COLOR; ...">…</mark> uses bgMapping.
 */
// const convertHTMLToAnsi = (html) => {
//   let result = html;
  
//   // Remove <p> and </p> tags
//   result = result.replace(/<\/?p>/gi, "");

//   // Process <mark> tags (for background color)
//   result = result.replace(
//     /<mark\s+data-color="([^"]+)"\s+style="background-color:\s*([^;]+);[^"]*">(.*?)<\/mark>/gi,
//     (match, dataColor, bgColor, innerText) => {
//       const ansiBg = bgMapping[bgColor.trim()] ? `\u001b[${bgMapping[bgColor.trim()]}m` : "";
//       return `${ansiBg}${innerText}\u001b[0m`;
//     }
//   );

//   // Process <span> tags (for foreground color)
//   result = result.replace(
//     /<span\s+style="color:\s*([^"]+)">(.*?)<\/span>/gi,
//     (match, fgColor, innerText) => {
//       const ansiFg = fgMapping[fgColor.trim()] ? `\u001b[${fgMapping[fgColor.trim()]}m` : "";
//       return `${ansiFg}${innerText}\u001b[0m`;
//     }
//   );

//   // Remove any remaining HTML tags
//   result = result.replace(/<\/?[^>]+(>|$)/g, "");

//   // Wrap final string in a Discord ANSI code block
//   return `\`\`\`ansi\n${result}\n\u001b[0m\n\`\`\``;
// };
  // Convert a CSS style string into an object


export default function DiscordColorText() {
  const [coloredText, setColoredText] = useState("");
  const [copied, setCopied] = useState(false);
  const [currentTextColor, setCurrentTextColor] = useState("");
  const [currentBgColor, setCurrentBgColor] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ bold: true }), // Bold support
      Underline, // Enable underline
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Placeholder.configure({
        placeholder: "Type here...",
      }),
    ],
    content: "<p>Welcome to Anisha's Discord Colored Text Generator!</p>",
  });
  const parseStyle = (styleStr) => {
    const styles = {};
    styleStr.split(";").forEach(pair => {
      const [key, value] = pair.split(":").map(s => s.trim());
      if (key && value) {
        styles[key.toLowerCase()] = value;
      }
    });
    return styles;
  };
  
  const convertHTMLToAnsi = (html) => {
    let result = html;
  
    // Bold and underline first (process <strong> and <u>)
    result = result.replace(/<strong>(.*?)<\/strong>/gi, "\u001b[1m$1\u001b[22m"); // Bold
    result = result.replace(/<u>(.*?)<\/u>/gi, "\u001b[4m$1\u001b[24m"); // Underline
  
    // Process <span> for text color
    result = result.replace(/<span style="([^"]+)">(.*?)<\/span>/gi, (match, styleStr, content) => {
      const styles = parseStyle(styleStr);
      const ansiCodes = [];
  
      if (styles["color"]) {
        const fg = fgMapping[styles["color"]] || "37"; // Default white
        ansiCodes.push(fg);
      }
  
      return `\u001b[${ansiCodes.join(";")}m${content}\u001b[0m`;
    });
  
    // Process <mark> for background color
    result = result.replace(/<mark\s+data-color="([^"]+)"\s+style="background-color:\s*([^;]+);[^"]*">(.*?)<\/mark>/gi, (match, dataColor, bgColor, content) => {
      const bgCode = bgMapping[bgColor.trim()] || "40"; // Default black
      return `\u001b[${bgCode}m${content}\u001b[0m`;
    });
  
    // Remove remaining HTML tags
    result = result.replace(/<\/?[^>]+(>|$)/g, "");
  
    return `\`\`\`ansi\n${result}\n\u001b[0m\n\`\`\``;
  };
  
  

  
  // Apply text color (using the color name; this sets inline style in the editor)
  const applyTextColor = (color) => {
    if (!editor) return;
    editor.chain().focus().setMark("textStyle", { color }).run();
    setCurrentTextColor(color);
  };

  // Apply background color using the highlight extension
  const applyBackgroundColor = (color) => {
    if (!editor) return;
    editor.chain().focus().toggleHighlight({ color }).run();
    setCurrentBgColor(color);
  };

  const copyToClipboard = () => {
    if (!editor) {
      console.error("❌ Editor instance not found.");
      return;
    }

    const htmlContent = editor.getHTML();
    console.log("📜 Extracted HTML:", htmlContent);

    const ansiFormattedText = convertHTMLToAnsi(htmlContent);
    console.log("🎨 ANSI Formatted Text:", ansiFormattedText);

    if (!ansiFormattedText.trim()) {
      console.warn("⚠️ Empty ANSI text, nothing to copy.");
      alert("No content to copy!");
      return;
    }

    navigator.clipboard.writeText(ansiFormattedText)
      .then(() => {
        console.log("✅ Successfully copied to clipboard!");
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(err => {
        console.error("❌ Copy failed:", err);
        alert("Copy failed! Check console for details.");
      });
  };

  const toggleBold = () => {
    if (!editor) return;
    editor.chain().focus().toggleBold().run();
  };
  
  const toggleUnderline = () => {
    if (!editor) return;
    editor.chain().focus().toggleUnderline().run();
  };
  

  const resetFormatting = () => {
    if (!editor) return;
    
    // Reset all applied styles
    editor.commands.clearNodes();
    editor.commands.unsetAllMarks();
    
    // Reset text & background color
    setCurrentTextColor("");
    setCurrentBgColor("");
    
    // Reset to initial content
    editor.commands.setContent("<p>Welcome to Rebane's Discord Colored Text Generator!</p>");
  };
  

  return (
    <div className="container">
    <Container className="sub-con">
      <Paper shadow="md" radius="lg" p="xl" className="paper">
      <Title order={2} align="center" mb="lg">Discord Color Text Generator</Title>

        {/* RichTextEditor */}
        <RichTextEditor editor={editor} className="editor" style={{ height: "5rem", minHeight: "5rem", maxHeight: "600px", borderRadius: "1rem", padding: "0rem", border: "none", margin: "2rem" }}>
          <RichTextEditor.Content />
        </RichTextEditor>

        {/* Text Color Selection */}
        <Text align="center" weight={600} mt="md" className="head">
          Text Color
        </Text>
        <Group position="center" mt="md" spacing="md">
          {Object.keys(fgMapping).map((colorName) => (
            <ActionIcon
              key={colorName}
              size={50}
              radius="md"
              className="color-box"
              style={{ backgroundColor: colorName }}
              onClick={() => applyTextColor(colorName)}
            />
          ))}
        </Group>

        {/* Background Color Selection */}
        <Text align="center" weight={600} mt="md" className="head">
          Background Color
        </Text>
        <Group position="center" mt="md" spacing="md" className="boxes">
          {Object.keys(bgMapping).map((colorName) => (
            <ActionIcon
              key={colorName}
              size={50}
              radius="md"
              className="color-box"
              style={{ backgroundColor: colorName }}
              onClick={() => applyBackgroundColor(colorName)}
            />
          ))}
        </Group>
        {/* Formatting Buttons: Bold, Underline, Reset */}
        <Group position="center" mt="md" spacing="md" className="btns">
  <Button onClick={toggleBold} variant="outline" className="btn">
    Bold
  </Button>
  <Button onClick={toggleUnderline} variant="outline" className="btn">
    Underline
  </Button>
  <Button  radius="md" onClick={resetFormatting} color="red" variant="outline" className="btn">
    Reset
  </Button>
</Group>



        <textarea value={coloredText} readOnly className="textarea output" />

      <div className="copy-section">
      <Button
          fullWidth
          mt="md"
          size="md"
          className={`copy-button ${copied ? "copied" : ""}`}
          onClick={copyToClipboard}
        >
          {copied ? "✔ Copied!" : "Copy to Clipboard"}
        </Button>
      </div>
      </Paper>
    </Container>
    </div>
  );
}





