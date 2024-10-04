import os
import json
import uuid  # To generate unique filenames
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from collections import defaultdict

app = Flask(__name__)
CORS(app)

# Ensure the "outputs" folder exists
OUTPUTS_FOLDER = "outputs"
if not os.path.exists(OUTPUTS_FOLDER):
    os.makedirs(OUTPUTS_FOLDER)

# Helper function to load JSON from file
def load_json_from_file(file):
    data = json.load(file)
    return data

# Helper function to save JSON to the "outputs" folder
def save_json_to_file(data, file_name):
    file_path = os.path.join(OUTPUTS_FOLDER, file_name)
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=4)
    return file_path

# 1. Check and Display All Annotations
@app.route('/annotations', methods=['POST'])
def check_all_annotations():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    data = load_json_from_file(file)  # Load JSON from file
    annotations = []
    
    for annotation in data['annotations']:
        annotations.append({
            "Annotation ID": annotation['id'],
            "Image ID": annotation['image_id'],
            "Category ID": annotation['category_id'],
            "Segmentation": annotation['segmentation'],
            "Area": annotation['area'],
            "Bbox": annotation['bbox'],
            "Isegmentation": annotation['segmentation'],
            "Iscrowd": annotation['iscrowd']
        })
    
    return jsonify(annotations)

# 2. Count and List Available Labels
@app.route('/labels', methods=['POST'])
def list_labels():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    data = load_json_from_file(file)  # Load JSON from file
    category_count = defaultdict(int)
    category_id_to_name = {category['id']: category['name'] for category in data['categories']}
    
    for annotation in data['annotations']:
        category_id = annotation['category_id']
        category_name = category_id_to_name.get(category_id, "Unknown")
        category_count[category_name] += 1

    labels = [{"label": name, "count": count} for name, count in category_count.items()]
    return jsonify({
        "unique_labels": len(category_count),
        "total_annotations": len(data['annotations']),
        "labels": labels
    })

# 3. Search Labels in Images
@app.route('/search', methods=['POST'])
def search_images_by_label():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    data = load_json_from_file(file)  # Load JSON from file
    search_label = request.args.get('label', '').lower()
    result_images = {}
    image_id_to_file_name = {image['id']: image['file_name'] for image in data['images']}
    
    for annotation in data['annotations']:
        category_id = annotation['category_id']
        category_name = next(category['name'] for category in data['categories'] if category['id'] == category_id)
        
        if search_label in category_name.lower():
            image_id = annotation['image_id']
            file_name = image_id_to_file_name.get(image_id, "Unknown")
            if image_id in result_images:
                result_images[image_id]['labels'].append(category_name)
            else:
                result_images[image_id] = {'file_name': file_name, 'labels': [category_name]}

    response = {
        "result_images": result_images,
        "label": search_label,
        "image_count": len(result_images)
    }

    return jsonify(response)

# 4. Remove Complete Annotations
@app.route('/remove_labels', methods=['POST'])
def remove_labels():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    data = load_json_from_file(file)  # Load JSON from file
    categories_to_remove = request.form.getlist("categories_to_remove")
    category_ids_to_remove = [cat['id'] for cat in data['categories'] if cat['name'] in categories_to_remove]
    
    data['annotations'] = [annotation for annotation in data['annotations'] if annotation['category_id'] not in category_ids_to_remove]

    # Generate a unique filename for each modified file to avoid caching issues
    modified_file_name = f"modified_annotations_{uuid.uuid4()}.json"
    modified_file_path = save_json_to_file(data, modified_file_name)
    
    # Only return a success message and link
    return jsonify({"message": "Labels removed successfully", "file_url": f"/download/{modified_file_name}"})

# 5. Merge Annotations
@app.route('/merge_labels', methods=['POST'])
def merge_labels():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    data = load_json_from_file(file)  # Load JSON from file
    
    annotations_to_merge = request.form.get("annotations_to_merge", "").split(',')
    annotations_to_merge = [label.strip() for label in annotations_to_merge]  # Clean whitespace
    merged_category_name = request.form.get("merged_category_name", "")

    merged_category_id = next((cat['id'] for cat in data['categories'] if cat['name'] == merged_category_name), None)
    if merged_category_id is None:
        return jsonify({"error": f"Category '{merged_category_name}' not found."}), 404

    category_ids_to_merge = [cat['id'] for cat in data['categories'] if cat['name'] in annotations_to_merge]

    for annotation in data['annotations']:
        if annotation['category_id'] in category_ids_to_merge:
            annotation['category_id'] = merged_category_id

    data['categories'] = [cat for cat in data['categories'] if cat['id'] == merged_category_id or cat['name'] not in annotations_to_merge]

    # Generate a unique filename for each modified file to avoid caching issues
    modified_file_name = f"modified_annotations_{uuid.uuid4()}.json"
    modified_file_path = save_json_to_file(data, modified_file_name)
    
    # Only return a success message and link
    return jsonify({"message": "Labels merged successfully", "file_url": f"/download/{modified_file_name}"})

# 6. Rename Labels
@app.route('/rename_labels', methods=['POST'])
def rename_labels():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    data = load_json_from_file(file)  # Load JSON from file
    rename_mapping = json.loads(request.form.get("rename_mapping", '{}'))
    
    for category in data['categories']:
        if category['name'] in rename_mapping:
            category['name'] = rename_mapping[category['name']] 

    # Generate a unique filename for each modified file to avoid caching issues
    modified_file_name = f"modified_annotations_{uuid.uuid4()}.json"
    modified_file_path = save_json_to_file(data, modified_file_name)
    
    # Only return a success message and link
    return jsonify({"message": "Labels renamed successfully", "file_url": f"/download/{modified_file_name}"})

# 7. Download revised file
@app.route('/download/<path:filename>', methods=['GET'])
def download_file(filename):
    file_path = os.path.join(OUTPUTS_FOLDER, filename)
    if os.path.exists(file_path):
        return send_file(file_path, as_attachment=True)
    else:
        return jsonify({"error": "File not found."}), 404

if __name__ == "__main__":
    app.run(debug=True)
