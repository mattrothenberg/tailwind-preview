import MonacoEditor from "@monaco-editor/react";
import wretch from "wretch";

export function Editor() {
  const handleMount = (editor, monaco) => {
    monaco.languages.registerHoverProvider("html", {
      provideHover: async function (model, position) {
        const selection = model.getValueInRange(editor.getSelection());
        if (!selection) return null;

        const image = await wretch("/api/preview")
          .query({ text: selection })
          .get()
          .json((res) => res.source);

        return {
          contents: [
            {
              value: `![Image for classes: ${selection}](data:image/png;base64,${image})`,
            },
          ],
        };
      },
    });
  };

  return (
    <MonacoEditor
      onMount={handleMount}
      defaultLanguage="html"
      defaultValue="<div class='h-64 w-64 bg-blue-600'>Hello World</div>"
      options={{
        minimap: {
          enabled: false,
        },
      }}
    />
  );
}
