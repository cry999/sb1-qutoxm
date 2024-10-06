import JSZip from 'jszip';
import { saveAs } from 'file-saver';

async function createProjectZip() {
  const zip = new JSZip();

  async function addFolderToZip(folderPath, zipFolder) {
    try {
      const response = await fetch(`/${folderPath}`);
      const files = await response.json();

      for (const file of files) {
        if (file.type === 'dir') {
          if (file.name !== 'node_modules' && file.name !== '.git') {
            const newZipFolder = zipFolder.folder(file.name);
            await addFolderToZip(`${folderPath}/${file.name}`, newZipFolder);
          }
        } else {
          const fileResponse = await fetch(`/${folderPath}/${file.name}`);
          const fileContent = await fileResponse.arrayBuffer();
          zipFolder.file(file.name, fileContent);
        }
      }
    } catch (error) {
      console.error(`Error processing folder ${folderPath}:`, error);
    }
  }

  try {
    await addFolderToZip('.', zip);

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'c4-model-constructor.zip');
    console.log('Project zip file created and ready for download!');
  } catch (error) {
    console.error('Error creating zip file:', error);
  }
}

createProjectZip().catch(error => {
  console.error('An unexpected error occurred:', error);
});