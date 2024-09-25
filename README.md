# COCO-JSON-Annotation-Master

This repository contains a set of Python scripts for working with COCO (Common Objects in Context) format JSON annotations. These tools allow you to analyze, modify, and manage COCO JSON annotation files efficiently.

## Features

- Check and display all annotations
- Count and list available labels
- Search images by label
- Remove specific annotations
- Merge similar annotations
- Rename category labels

## Usage

1. Clone this repository:
   ```
   git clone https://github.com/SakibAhmedShuva/COCO-JSON-Annotation-Master.git
   ```

2. Navigate to the repository directory:
   ```
   cd COCO-JSON-Annotation-Master
   ```

3. Run the desired script, e.g.:
   ```
   python coco_json_annotation_actions.py
   ```

## Main Functions

### 1. Check All Annotations

Displays details of all annotations in the COCO JSON file, including annotation ID, image ID, category ID, segmentation, area, bounding box, and crowd flag.

### 2. Count and List Labels

Counts occurrences of each category and lists all unique labels alphabetically with their counts.

### 3. Search Images by Label

Allows searching for images containing a specific label, displaying image IDs, file names, and found labels.

### 4. Remove Annotations

Removes complete annotations for specified categories from the dataset.

### 5. Merge Annotations

Merges similar annotation categories into a single category.

### 6. Rename Labels

Renames category labels based on a provided mapping.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
