import React, { useState } from 'react';
import Annotations from './components/Annotations';
import Labels from './components/Labels';
import Search from './components/Search';
import RemoveLabels from './components/RemoveLabels';
import MergeLabels from './components/MergeLabels';
import RenameLabels from './components/RenameLabels';

function App() {
  const [jsonData, setJsonData] = useState(null); // Store the uploaded JSON data
  const [modifiedJson, setModifiedJson] = useState(null); // Store the modified JSON after each operation

  // Handle JSON file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const uploadedData = JSON.parse(event.target.result);
        setJsonData(uploadedData);
        setModifiedJson(uploadedData); // Initialize modified JSON as the uploaded JSON
        console.log("Uploaded JSON:", uploadedData); // Log the uploaded JSON
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <h1>COCO Annotation Management</h1>

      {/* Upload JSON File */}
      <input type="file" accept=".json" onChange={handleFileUpload} />
      {jsonData && <p>JSON file uploaded and ready for processing.</p>}

      {/* Display all actions on the same page */}
      {modifiedJson && (
        <div>
          <section>
            <h2>View Annotations</h2>
            <Annotations jsonData={modifiedJson} />
          </section>

          <section>
            <h2>View Labels</h2>
            <Labels jsonData={modifiedJson} />
          </section>

          <section>
            <h2>Search Labels</h2>
            <Search jsonData={modifiedJson} />
          </section>

          <section>
            <h2>Remove Labels</h2>
            <RemoveLabels jsonData={modifiedJson} setJsonData={setModifiedJson} />
          </section>

          <section>
            <h2>Merge Labels</h2>
            <MergeLabels jsonData={modifiedJson} setJsonData={setModifiedJson} />
          </section>

          <section>
            <h2>Rename Labels</h2>
            <RenameLabels jsonData={modifiedJson} setJsonData={setModifiedJson} />
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
