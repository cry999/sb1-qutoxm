import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export async function createProjectZip() {
  const zip = new JSZip();

  // List of source files to include in the zip
  const filesToInclude = [
    'index.html',
    'package.json',
    'tsconfig.json',
    'vite.config.ts',
    'src/App.tsx',
    'src/main.tsx',
    'src/index.css',
    'src/components/Toolbar.tsx',
    'src/components/C4NodeTypes.tsx',
    'src/types.ts',
    'src/create-zip.js'
  ];

  try {
    for (const filePath of filesToInclude) {
      const response = await fetch(`/${filePath}`);
      if (!response.ok) throw new Error(`Failed to fetch ${filePath}`);
      const content = await response.text();
      zip.file(filePath, content);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'c4-model-constructor-source.zip');
    console.log('Project source zip file created and ready for download!');
  } catch (error) {
    console.error('Error creating zip file:', error);
  }
}