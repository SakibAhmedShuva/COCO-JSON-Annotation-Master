# COCO-JSON-Annotation-Master

This repository contains a set of Python scripts for working with COCO (Common Objects in Context) format JSON annotations. These tools allow you to analyze, modify, and manage COCO JSON annotation files efficiently.

## Features

- Check and display all annotations
- Count and list available labels
- Search labels in images
- Remove labels with and their corresponding annotations
- Merge labels
- Rename labels

## Requirements
- COCO JSON annotation file from CVAT, Roboflow, etc.
- Jupyter Notebook

## Usage

1. Clone this repository:
   ```
   git clone https://github.com/SakibAhmedShuva/COCO-JSON-Annotation-Master.git
   ```

2. Navigate to the repository directory:
   ```
   cd COCO-JSON-Annotation-Master
   ```
3. Open Notebook: COCO_Json_Annotation_Master.ipynb

## Main Functions

### 1. Check and Display All Annotations

Displays details of all annotations in the COCO JSON file, including annotation ID, image ID, category ID, segmentation, area, bounding box, and crowd flag.

### 2. Count and List Available Labels

Counts occurrences of each category and lists all unique labels alphabetically with their counts.

### 3. Search Labels in Images

Allows searching for images containing a specific label, displaying image IDs, file names, and found labels.

### 4. Remove Labels

Removes complete annotations for specified categories / labels from the dataset.

### 5. Merge Categories / Labels

Merges categories / labels into a single category.

### 6. Rename Labels

Renames single or multiple category / labels at once based on a provided mapping.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
