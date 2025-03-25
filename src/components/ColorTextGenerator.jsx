


// import { useState } from "react";
// import { Container, Button, Group, Text, ActionIcon, Paper } from "@mantine/core";
// import { RichTextEditor } from "@mantine/tiptap";
// import { useEditor, Extension } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import TextStyle from "@tiptap/extension-text-style";
// import Color from "@tiptap/extension-color";
// import Placeholder from "@tiptap/extension-placeholder";
// import React, { useState } from "react";
// import { Container, Button, Group, Text, ActionIcon, Paper } from "@mantine/core";
// import { RichTextEditor } from "@mantine/tiptap";
// import { useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import TextStyle from "@tiptap/extension-text-style";
// import Color from "@tiptap/extension-color";
// import Placeholder from "@tiptap/extension-placeholder";
// import Highlight from "@tiptap/extension-highlight";
// import "../App.css";

// // ANSI color codes for Discord
// // Discord-compatible text colors
// const textColors = [
//   { name: "Gray", ansi: "\x1b[30m" },   // Gray
//   { name: "Red", ansi: "\x1b[31m" },    // Red
//   { name: "Green", ansi: "\x1b[32m" },  // Green
//   { name: "Yellow", ansi: "\x1b[33m" }, // Yellow
//   { name: "Blue", ansi: "\x1b[34m" },   // Blue
//   { name: "Pink", ansi: "\x1b[35m" },   // Pink
//   { name: "Cyan", ansi: "\x1b[36m" },   // Cyan
//   { name: "White", ansi: "\x1b[37m" },  // White
// ];

// // Discord-compatible background colors
// const backgroundColors = [
//   { name: "Firefly Dark Blue", ansi: "\x1b[40m" }, // Firefly Dark Blue
//   { name: "Orange", ansi: "\x1b[41m" },           // Orange
//   { name: "Marble Blue", ansi: "\x1b[42m" },      // Marble Blue
//   { name: "Greyish Turquoise", ansi: "\x1b[43m" },// Greyish Turquoise
//   { name: "Gray", ansi: "\x1b[44m" },             // Gray
//   { name: "Indigo", ansi: "\x1b[45m" },           // Indigo
//   { name: "Light Gray", ansi: "\x1b[46m" },       // Light Gray
//   { name: "White", ansi: "\x1b[47m" },            // White
// ];


// export default function DiscordColorText() {
//   const [coloredText, setColoredText] = useState("");
//   const [copied, setCopied] = useState(false);
//   const [currentTextColor, setCurrentTextColor] = useState("");
//   const [currentBgColor, setCurrentBgColor] = useState("");

//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       TextStyle,
//       Color,
//       Highlight.configure({ multicolor: true }), // Enable background color
//       Placeholder.configure({
//         placeholder: "Type here...",
//       }),
//     ],
//     content: "<p>Welcome to Rebane's Discord Colored Text Generator!</p>",
//   });

//   // Apply text color
//   const applyTextColor = (color) => {
//     if (!editor) return;
//     editor.chain().focus().setMark("textStyle", { color }).run();
//     setCurrentTextColor(color);
//   };

//   // Apply background color correctly
// const applyBackgroundColor = (color) => {
//   if (!editor) return;

//   // Log the previous background color before applying new one
//   console.log("Previous Background Color:", currentBgColor);

//   // Use highlight extension for background color
//   editor.chain().focus().toggleHighlight({ color }).run();

//   // Update state and log the new background color
//   setCurrentBgColor(prevColor => {
//     console.log("New Background Color:", color);
//     return color;
//   });
// };
// // const convertHTMLToAnsi = (html) => {
// //   return html
// //     // Convert text color (span with style)
// //     .replace(/<span style="color: (#[0-9a-fA-F]+);?">(.+?)<\/span>/g, (match, color, text) => {
// //       return `\x1b[38;5;${hexToANSI256(color)}m${text}\x1b[0m`;
// //     })
// //     // Convert background color (mark tag with background)
// //     .replace(/<mark .*?style="background-color: (#[0-9a-fA-F]+);.*?">(.*?)<\/mark>/g, (match, bgColor, text) => {
// //       return `\x1b[48;5;${hexToANSI256(bgColor)}m${text}\x1b[0m`;
// //     })
// //     // Remove any other HTML tags
// //     .replace(/<\/?[^>]+(>|$)/g, "");
// // };



// const convertHTMLToAnsi = (html) => {
//   const colorMap = {
//     "Black": "30",
//     "Red": "31",
//     "Green": "32",
//     "Yellow": "33",
//     "Blue": "34",
//     "Magenta": "35",
//     "Cyan": "36",
//     "White": "37",
//     "Gray": "90",
//     "Pink": "95",
//     "Orange": "43",  // Background only
//     "Indigo": "44",  // Background only
//   };

//   let ansiText = "";
  
//   html.replace(
//     /<span style="color: (\w+)">(.*?)<\/span>|<mark data-color="(\w+)" .*?>(.*?)<\/mark>|([^<]+)/g,
//     (_, fgColor, fgText, bgColor, bgText, normalText) => {
//       if (fgColor && fgText) {
//         ansiText += `\u001b[${colorMap[fgColor] || "37"}m${fgText}\u001b[0m`;
//       } else if (bgColor && bgText) {
//         ansiText += `\u001b[${colorMap[bgColor] || "40"}m${bgText}\u001b[0m`;
//       } else if (normalText) {
//         ansiText += normalText;
//       }
//     }
//   );

//   return `\`\`\`ansi\n${ansiText}\n\`\`\``;
// };






// const convertToAnsi = (text) => {
//   const textAnsiCode = textColors.find(c => c.name === currentTextColor)?.ansi || "";
//   const bgAnsiCode = backgroundColors.find(c => c.name === currentBgColor)?.ansi || "";

//   return `\`\`\`ansi\n${bgAnsiCode}${textAnsiCode}${text}\u001b[0m\n\`\`\``;
// };



// const hexToANSI256 = (hex) => {
//   const rgbToAnsi = (r, g, b) => {
//     return 16 + (36 * Math.round(r / 51)) + (6 * Math.round(g / 51)) + Math.round(b / 51);
//   };

//   const bigint = parseInt(hex.slice(1), 16);
//   const r = (bigint >> 16) & 255;
//   const g = (bigint >> 8) & 255;
//   const b = bigint & 255;

//   return rgbToAnsi(r, g, b);
// };






// // Convert HEX to RGB (needed for ANSI codes)
// const hexToRGB = (hex) => {
//   const bigint = parseInt(hex.slice(1), 16);
//   return `${(bigint >> 16) & 255};${(bigint >> 8) & 255};${bigint & 255}`;
// };

// const copyToClipboard = () => {
//   if (!editor) {
//     console.error("❌ Editor instance not found.");
//     return;
//   }

//   const htmlContent = editor.getHTML();
//   console.log("📜 Extracted HTML:", htmlContent);

//   const ansiFormattedText = convertHTMLToAnsi(htmlContent);
//   console.log("🎨 ANSI Formatted Text:", ansiFormattedText);

//   navigator.clipboard.writeText(ansiFormattedText)
//     .then(() => {
//       console.log("✅ Successfully copied to clipboard!");
//       setCopied(true);
//       setTimeout(() => setCopied(false), 1500);
//     })
//     .catch(err => {
//       console.error("❌ Copy failed:", err);
//       alert("Copy failed! Check console for details.");
//     });
// };





//   // Generate ANSI formatted text for Discord
//   const generateAnsiText = () => {
//     if (!editor) return;

//     let content = editor.getText();
//     let textAnsi = textColors.find(c => c.name === currentTextColor)?.ansi || "";
//     let bgAnsi = backgroundColors.find(c => c.name === currentBgColor)?.ansi || "";

//     const finalAnsiText = `${bgAnsi}${textAnsi}${content}\x1b[0m`;
//     setColoredText(`\`\`\`ansi\n${finalAnsiText}\n\`\`\``);
//   };

  
//   return (
//     <Container size="md" className="container">
//       <Paper shadow="xl" radius="lg" p="xl" className="paper">
//         <Text size="xl" weight={700} align="center" className="title">
//           Discord Colored Text Generator
//         </Text>

//         {/* RichTextEditor */}
//         <RichTextEditor editor={editor} className="editor">
//           <RichTextEditor.Content />
//         </RichTextEditor>

//         {/* Text Color Selection */}
//         <Text align="center" weight={600} mt="md">Text Color</Text>
//         <Group position="center" mt="md" spacing="md">
//           {textColors.map((color) => (
//             <ActionIcon
//               key={color.name}
//               size={50}
//               radius="md"
//               className="color-box"
//               style={{ backgroundColor: color.name }}
//               onClick={() => applyTextColor(color.name)}
//             />
//           ))}
//         </Group>

//         {/* Background Color Selection */}
//         <Text align="center" weight={600} mt="md">Background Color</Text>
//         <Group position="center" mt="md" spacing="md">
//           {backgroundColors.map((color) => (
//             <ActionIcon
//               key={color.name}
//               size={50}
//               radius="md"
//               className="color-box"
//               style={{ backgroundColor: color.name }}
//               onClick={() => applyBackgroundColor(color.name)}
//             />
//           ))}
//         </Group>

//         <textarea value={coloredText} readOnly className="textarea output" />

//         <Button 
//           fullWidth 
//           mt="md" 
//           size="md" 
//           className={`copy-button ${copied ? "copied" : ""}`} 
//           onClick={copyToClipboard}
//         >
//           {copied ? "✔ Copied!" : "Copy to Clipboard"}
//         </Button>
//       </Paper>
//     </Container>
//   );
// }


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

// Mapping for Discord-supported foreground (text) ANSI colors
const fgMapping = {
  "Gray": "30",
  "Red": "31",
  "Green": "32",
  "Yellow": "33",
  "Blue": "34",
  "Pink": "35",
  "Cyan": "36",
  "White": "37"
};

// Mapping for Discord-supported background ANSI colors
const bgMapping = {
  "Firefly Dark Blue": "40",
  "Orange": "41",
  "Marble Blue": "42",
  "Greyish Turquoise": "43",
  "Gray": "44",
  "Indigo": "45",
  "Light Gray": "46",
  "White": "47"
};

/**
 * convertHTMLToAnsi()
 * - Removes <p>, <span>, and <mark> tags.
 * - For <span style="color: COLOR">…</span> uses fgMapping.
 * - For <mark data-color="COLOR" style="background-color: COLOR; ...">…</mark> uses bgMapping.
 */
const convertHTMLToAnsi = (html) => {
  let result = html;
  
  // Remove <p> and </p> tags
  result = result.replace(/<\/?p>/gi, "");

  // Process <mark> tags (for background color)
  result = result.replace(
    /<mark\s+data-color="([^"]+)"\s+style="background-color:\s*([^;]+);[^"]*">(.*?)<\/mark>/gi,
    (match, dataColor, bgColor, innerText) => {
      const ansiBg = bgMapping[bgColor.trim()] ? `\u001b[${bgMapping[bgColor.trim()]}m` : "";
      return `${ansiBg}${innerText}\u001b[0m`;
    }
  );

  // Process <span> tags (for foreground color)
  result = result.replace(
    /<span\s+style="color:\s*([^"]+)">(.*?)<\/span>/gi,
    (match, fgColor, innerText) => {
      const ansiFg = fgMapping[fgColor.trim()] ? `\u001b[${fgMapping[fgColor.trim()]}m` : "";
      return `${ansiFg}${innerText}\u001b[0m`;
    }
  );

  // Remove any remaining HTML tags
  result = result.replace(/<\/?[^>]+(>|$)/g, "");

  // Wrap final string in a Discord ANSI code block
  return `\`\`\`ansi\n${result}\n\u001b[0m\n\`\`\``;
};

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
      Highlight.configure({ multicolor: true }),
      Placeholder.configure({
        placeholder: "Type here...",
      }),
    ],
    content: "<p>Welcome to Rebane's Discord Colored Text Generator!</p>",
  });

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
        <Text align="center" weight={600} mt="md">
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
        <Text align="center" weight={600} mt="md">
          Background Color
        </Text>
        <Group position="center" mt="md" spacing="md">
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


