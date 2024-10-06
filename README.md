# 🏷️ COCO Json Annotation Master

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.6+](https://img.shields.io/badge/python-3.6+-blue.svg)](https://www.python.org/downloads/)
[![React](https://img.shields.io/badge/React-18.0%2B-blue?logo=react)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-2.0%2B-green?logo=flask)](https://flask.palletsprojects.com/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)

A powerful web application for effortlessly managing, analyzing, and modifying COCO format JSON annotations. Perfect for machine learning engineers and computer vision researchers working with datasets from CVAT, Roboflow, or any COCO-formatted annotations.

![COCO Json Annotation Master Demo](https://via.placeholder.com/800x400?text=COCO+Json+Annotation+Master+Demo)

# 🏷️ Repository Includes:
- Flask API
- React-based front end
- HTML-based front end

You can run the API using whichever front end (React/HTML) you prefer.

## ✨ Features

- 📊 **View & Analyze Annotations**: Instantly visualize all annotations with detailed information
- 🏷️ **Label Management**: List, count, and search through your dataset labels
- 🔍 **Smart Search**: Find images containing specific labels
- ✂️ **Remove Labels**: Selectively remove categories and their annotations
- 🔄 **Merge Labels**: Combine multiple categories into one
- ✏️ **Rename Labels**: Batch rename categories with a simple JSON mapping

## 🚀 Getting Started

### Prerequisites

- Python 3.6+
- Node.js 14+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SakibAhmedShuva/COCO-Json-Annotation-Master.git
cd COCO-Json-Annotation-Master
```

2. Set up the backend:
```bash
# Create a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

# Install Python dependencies
pip install -r requirements.txt

# Start the Flask server
python app.py
```

3. Set up the frontend (react/html):
# Run the react app

```bash
#Go to the app folder
cd "react app"

# Install Node dependencies
npm install

# Start the React development server
npm start
```

Visit `http://localhost:3000` to access the web interface.


# Run the html app
Open app.html


## 💻 Usage

### Web Interface

The application provides an intuitive web interface with the following tabs:

1. **View Annotations**: Display all annotations in your dataset
2. **View Labels**: See a list of all labels with their counts
3. **Search Labels**: Find specific labels in your dataset
4. **Remove Labels**: Select and remove unwanted labels with all annotations
5. **Merge Labels**: Combine multiple labels into one
6. **Rename Labels**: Batch rename labels using a JSON mapping

### API Endpoints

1. [Check and Display All Annotations](#1-check-and-display-all-annotations)
2. [Count and List Available Labels](#2-count-and-list-available-labels)
3. [Search Labels in Images](#3-search-labels-in-images)
4. [Remove Complete Annotations](#4-remove-complete-annotations)
5. [Merge Annotations](#5-merge-annotations)
6. [Rename Labels](#6-rename-labels)
7. [Download Revised File](#7-download-revised-file)

## API Endpoints

### 1. Check and Display All Annotations

**Purpose:** Retrieve all annotations from a COCO JSON file and display them in a structured format.

#### Endpoint Details
- **Method:** POST
- **URL:** `http://localhost:5000/annotations`
- **Body:** Form data with file upload
  - Key: `file`
  - Type: File
  - Value: Your COCO JSON file

#### Expected Response
A JSON array of annotations, each containing:
- Annotation ID
- Image ID
- Category ID
- Segmentation
- Area
- Bbox
- Iscrowd

### 2. Count and List Available Labels

**Purpose:** Get a count of all unique labels and total annotations in the COCO JSON file.

#### Endpoint Details
- **Method:** POST
- **URL:** `http://localhost:5000/labels`
- **Body:** Form data with file upload
  - Key: `file`
  - Type: File
  - Value: Your COCO JSON file

#### Expected Response
```json
{
  "unique_labels": 10,
  "total_annotations": 1000,
  "labels": [
    {
      "label": "Car",
      "count": 500
    },
    ...
  ]
}
```

### 3. Search Labels in Images

**Purpose:** Search for images containing a specific label.

#### Endpoint Details
- **Method:** POST
- **URL:** `http://localhost:5000/search`
- **Query Parameters:**
  - `label`: The label name to search for
- **Body:** Form data with file upload
  - Key: `file`
  - Type: File
  - Value: Your COCO JSON file

#### Expected Response
```json
{
  "result_images": {
    "image_id": {
      "file_name": "example.jpg",
      "labels": ["Car", "Wheel"]
    }
  },
  "label": "Car",
  "image_count": 5
}
```

### 4. Remove Complete Annotations

**Purpose:** Remove all annotations for specific labels from the COCO JSON file.

#### Endpoint Details
- **Method:** POST
- **URL:** `http://localhost:5000/remove_labels`
- **Body:** Form data with:
  1. File Upload:
     - Key: `file`
     - Type: File
     - Value: Your COCO JSON file
  2. Labels to Remove:
     - Key: `categories_to_remove`
     - Type: Text
     - Value: The label(s) you want to remove

#### Example Request Body
| Key | Type | Value |
|-----|------|-------|
| file | File | annotations.json |
| categories_to_remove | Text | Sunroof |
| categories_to_remove | Text | Gearbox |

#### Expected Response
```json
{
  "message": "Labels removed successfully",
  "file_url": "/download/modified_annotations_1234.json"
}
```

### 5. Merge Annotations

**Purpose:** Merge multiple labels into a single label in the COCO JSON file.

#### Endpoint Details
- **Method:** POST
- **URL:** `http://localhost:5000/merge_labels`
- **Body:** Form data with:
  1. File Upload:
     - Key: `file`
     - Type: File
     - Value: Your COCO JSON file
  2. Labels to Merge:
     - Key: `annotations_to_merge`
     - Type: Text
     - Value: Comma-separated list of labels to merge
  3. Merged Category Name:
     - Key: `merged_category_name`
     - Type: Text
     - Value: The target label name

> **Note:** The `merged_category_name` must exist in the categories of your COCO JSON file.

### 6. Rename Labels

**Purpose:** Rename labels in the COCO JSON file according to a provided mapping.

#### Endpoint Details
- **Method:** POST
- **URL:** `http://localhost:5000/rename_labels`
- **Body:** Form data with:
  1. File Upload:
     - Key: `file`
     - Type: File
     - Value: Your COCO JSON file
  2. Rename Mapping:
     - Key: `rename_mapping`
     - Type: Text
     - Value: A JSON string representing the mapping

#### Example Rename Mapping
```json
{
  "Sunroof": "Panoramic Roof",
  "Gearbox": "Transmission"
}
```

### 7. Download Revised File

**Purpose:** Download the modified COCO JSON file generated by previous operations.

#### Endpoint Details
- **Method:** GET
- **URL:** `http://localhost:5000/download/<filename>`
  - Replace `<filename>` with the actual filename provided in the `file_url` from the API response

## Using with Postman

For each endpoint:
1. Create a new request
2. Set the appropriate method and URL
3. For POST requests:
   - Go to the "Body" tab
   - Select "form-data"
   - Add the required keys and values
4. Send the request

For file downloads:
- Use the "Save Response" > "Save to a file" option in Postman to save the modified JSON file

## 📖 React App Screenshot
![{D973DBB1-2872-4486-8781-BEA8FBA7A8D0}](https://github.com/user-attachments/assets/daafac21-bfef-4bbf-a9ff-0d912444ae4e)

![{A8F1DB94-DCC8-47CE-9884-8975A2D016D0}](https://github.com/user-attachments/assets/ef21627f-c963-451f-96da-da32f3d5ed27)

![{4DD78F4B-4E90-4AD7-8EC4-6ED7EED08C9A}](https://github.com/user-attachments/assets/618d8090-9a43-4820-ad09-3dd58c7a7938)

![{F9268430-62E9-463E-908B-D8DADAF7BD9B}](https://github.com/user-attachments/assets/e17f4f3b-c707-43c6-8df5-3d23552be511)

![{1B8A0EA9-B674-4996-9F69-58C82FF5512E}](https://github.com/user-attachments/assets/1a1c5da4-62d5-40c7-b3c2-3bb6c6c9c815)

![{C925E786-9FA6-40F0-8F98-2C56FF4E645C}](https://github.com/user-attachments/assets/6576cb49-8024-4097-a480-d47f32f4b7e9)


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the needs of the computer vision community
- Built with React and Flask

## 📬 Contact

Project Link: [https://github.com/SakibAhmedShuva/COCO-JSON-Annotation-Master](https://github.com/SakibAhmedShuva/COCO-JSON-Annotation-Master)
