# 🏷️ COCO Json Annotation Master

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.6+](https://img.shields.io/badge/python-3.6+-blue.svg)](https://www.python.org/downloads/)
[![React](https://img.shields.io/badge/React-18.0%2B-blue?logo=react)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-2.0%2B-green?logo=flask)](https://flask.palletsprojects.com/)

A powerful web application for effortlessly managing, analyzing, and modifying COCO format JSON annotations. Perfect for machine learning engineers and computer vision researchers working with datasets from CVAT, Roboflow, or any COCO-formatted annotations.

![COCO Json Annotation Master Demo](https://via.placeholder.com/800x400?text=COCO+Json+Annotation+Master+Demo)

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

3. Set up the frontend:
```bash
# Install Node dependencies
npm install

# Start the React development server
npm start
```

Visit `http://localhost:3000` to access the web interface.

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

For those who prefer programmatic access, the following API endpoints are available:

- `POST /annotations`: Get all annotations
- `POST /labels`: List all labels and their counts
- `POST /search`: Search for specific labels
- `POST /remove_labels`: Remove selected labels
- `POST /merge_labels`: Merge multiple labels
- `POST /rename_labels`: Rename labels based on mapping

## 📖 Documentation

For detailed information about using the application, check out our [Wiki](https://github.com/YourUsername/COCO-Json-Annotation-Master/wiki).

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

Project Link: [https://github.com/YourUsername/COCO-Json-Annotation-Master](https://github.com/YourUsername/COCO-Json-Annotation-Master)
