import React, { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css'; // GrapesJS core CSS
import plugin from 'grapesjs-blocks-basic';

const App = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = grapesjs.init({
      container: editorRef.current,
      fromElement: true,
      height: '100vh',
      width: 'auto',
      storageManager: false,
      plugins: [plugin],
      pluginsOpts: {
        [plugin]: { /* options */ }
      },
    });

   // Add custom panel for "Import Code"
   editor.Panels.addButton('options', {
    id: 'import-code',
    className: 'fa fa-code',
    command: 'open-import-code',
    attributes: {
      title: 'Import Code',
    },
  });

  // Define a command to open the modal for code import
  editor.Commands.add('open-import-code', {
    run(editor) {
      editor.Modal.open({
        title: 'Import Code',
        content: `
          <textarea id="import-code-area" style="width:100%; height: 300px;">Paste your HTML/CSS code here...</textarea>
          <button id="import-code-btn" style="margin-top: 10px;">Import</button>
        `,
      }).onceClose(() => {
        console.log('Modal closed');
      });

      // Handle import button click
      const importButton = document.getElementById('import-code-btn');
      if (importButton) {
        importButton.onclick = () => {
          const code = document.getElementById('import-code-area').value;
          editor.setComponents(code); // Set the imported code into the canvas
          editor.Modal.close(); // Close modal after importing
        };
      }
    },
  });


    return () => {
      editor.destroy(); // Cleanup on component unmount
    };
  }, []);

  return (
    <div>
      <div ref={editorRef} />
    </div>
  );
};

export default App;
