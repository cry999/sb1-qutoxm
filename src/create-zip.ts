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
    'src/create-zip.ts'
  ];

  try {
    for (const filePath of filesToInclude) {
      try {
        const response = await fetch(`/${filePath}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
        }
        const content = await response.text();
        console.log(`Adding file: ${filePath}`);
        console.log(`Content preview: ${content.substring(0, 100)}...`);
        zip.file(filePath, content);
      } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
      }
    }

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'c4-model-constructor-source.zip');
    console.log('Project source zip file created and ready for download!');
  } catch (error) {
    console.error('Error creating zip file:', error);
  }
}