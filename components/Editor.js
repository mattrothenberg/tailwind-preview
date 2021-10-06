import MonacoEditor from "@monaco-editor/react";
import wretch from "wretch";

const defaultValue = `<!-- A blue div -->
<div class='h-32 w-32 bg-blue-600 text-white flex items-center justify-center text-xl rounded-full'>hello</div>

<!-- An avatar -->
<img
  class="inline-block h-32 w-32 rounded-full"
  src="https://pbs.twimg.com/profile_images/1412513434525212682/b-8p2azn_400x400.jpg"
  alt="Matt Rothenberg's ugly mug"
/>
`;

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
      defaultValue={defaultValue}
      options={{
        minimap: {
          enabled: false,
        },
      }}
    />
  );
}
