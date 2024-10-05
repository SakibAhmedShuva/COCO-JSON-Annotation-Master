import React, { useState } from 'react';
import axios from 'axios';
import {
  Upload,
  Button,
  Tabs,
  List,
  Typography,
  Input,
  Space,
  message,
  Spin,
  Modal,
  Checkbox,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

function App() {
  const [file, setFile] = useState(null);
  const [labels, setLabels] = useState(null);
  const [annotations, setAnnotations] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [mergeLabels, setMergeLabels] = useState('');
  const [mergeTargetLabel, setMergeTargetLabel] = useState('');
  const [renameMapping, setRenameMapping] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const uploadProps = {
    beforeUpload: (file) => {
      setFile(file);
      message.success(`${file.name} file selected.`);
      return false; // Prevent automatic upload
    },
    fileList: file ? [file] : [],
  };

  const handleUploadAndProcess = async () => {
    if (!file) {
      message.error('Please select a file first.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Fetch labels
      const response = await axios.post('http://localhost:5000/labels', formData);
      setLabels(response.data);
      message.success('Labels fetched successfully.');
    } catch (error) {
      message.error('Error fetching labels.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewAnnotations = async () => {
    if (!file) {
      message.error('Please select a file first.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/annotations', formData);
      setAnnotations(response.data);
      message.success('Annotations fetched successfully.');
    } catch (error) {
      message.error('Error fetching annotations.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchLabels = async (label) => {
    if (!file) {
      message.error('Please select a file first.');
      return;
    }

    if (!label) {
      message.error('Please enter a label to search.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`http://localhost:5000/search?label=${label}`, formData);
      setSearchResults(response.data);
      message.success('Search completed.');
    } catch (error) {
      message.error('Error searching labels.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveLabels = async () => {
    if (!file) {
      message.error('Please select a file first.');
      return;
    }

    if (selectedLabels.length === 0) {
      message.error('Please select labels to remove.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    selectedLabels.forEach((label) => {
      formData.append('categories_to_remove', label);
    });

    try {
      const response = await axios.post('http://localhost:5000/remove_labels', formData);
      setDownloadUrl(`http://localhost:5000${response.data.file_url}`);
      message.success('Labels removed successfully.');
      setModalVisible(true);
    } catch (error) {
      message.error('Error removing labels.');
    } finally {
      setLoading(false);
    }
  };

  const handleMergeLabels = async () => {
    if (!file) {
      message.error('Please select a file first.');
      return;
    }

    if (!mergeLabels || !mergeTargetLabel) {
      message.error('Please enter labels to merge and the target label.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('annotations_to_merge', mergeLabels);
    formData.append('merged_category_name', mergeTargetLabel);

    try {
      const response = await axios.post('http://localhost:5000/merge_labels', formData);
      setDownloadUrl(`http://localhost:5000${response.data.file_url}`);
      message.success('Labels merged successfully.');
      setModalVisible(true);
    } catch (error) {
      message.error('Error merging labels.');
    } finally {
      setLoading(false);
    }
  };

  const handleRenameLabels = async () => {
    if (!file) {
      message.error('Please select a file first.');
      return;
    }

    if (!renameMapping) {
      message.error('Please enter the rename mapping in JSON format.');
      return;
    }

    let mapping;
    try {
      mapping = JSON.parse(renameMapping);
    } catch (error) {
      message.error('Invalid JSON format.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('rename_mapping', JSON.stringify(mapping));

    try {
      const response = await axios.post('http://localhost:5000/rename_labels', formData);
      setDownloadUrl(`http://localhost:5000${response.data.file_url}`);
      message.success('Labels renamed successfully.');
      setModalVisible(true);
    } catch (error) {
      message.error('Error renaming labels.');
    } finally {
      setLoading(false);
    }
  };

  const handleLabelSelection = (label, checked) => {
    if (checked) {
      setSelectedLabels([...selectedLabels, label]);
    } else {
      setSelectedLabels(selectedLabels.filter((item) => item !== label));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>COCO Json Annotation Master</Title>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Select JSON File</Button>
        </Upload>
        <Button type="primary" onClick={handleUploadAndProcess} disabled={!file}>
          Upload and Process File
        </Button>
      </Space>

      <Tabs defaultActiveKey="1" style={{ marginTop: '20px' }}>
        <TabPane tab="View Annotations" key="1">
          <Button onClick={handleViewAnnotations} disabled={!file}>
            View Annotations
          </Button>
          {loading && <Spin style={{ marginLeft: '10px' }} />}
          {annotations && (
            <List
              dataSource={annotations}
              renderItem={(item) => (
                <List.Item>
                  <Text>
                    Image ID: {item['Image ID']}, Category ID: {item['Category ID']},
                    Segmentation: {item['Segmentation']}
                  </Text>
                </List.Item>
              )}
            />
          )}
        </TabPane>

        <TabPane tab="View Labels" key="2">
          {loading && <Spin />}
          {labels ? (
            <div>
              <Title level={4}>Labels</Title>
              <Text>Total Unique Labels: {labels.unique_labels}</Text>
              <br />
              <Text>Total Annotations: {labels.total_annotations}</Text>
              <List
                dataSource={labels.labels}
                renderItem={(item) => (
                  <List.Item>
                    <Text>
                      {item.label}: {item.count}
                    </Text>
                  </List.Item>
                )}
              />
            </div>
          ) : (
            <Text>Please upload and process a file to view labels.</Text>
          )}
        </TabPane>

        <TabPane tab="Search Labels" key="3">
          <Space>
            <Input.Search
              placeholder="Enter label to search"
              enterButton="Search"
              onSearch={handleSearchLabels}
              style={{ width: 400 }}
            />
          </Space>
          {loading && <Spin style={{ marginLeft: '10px' }} />}
          {searchResults && (
            <div style={{ marginTop: '20px' }}>
              <Title level={4}>Search Results for "{searchResults.label}"</Title>
              <Text>Number of Images: {searchResults.image_count}</Text>
              <List
                dataSource={Object.values(searchResults.result_images)}
                renderItem={(item) => (
                  <List.Item>
                    <Text>
                      File Name: {item.file_name}, Labels: {item.labels.join(', ')}
                    </Text>
                  </List.Item>
                )}
              />
            </div>
          )}
        </TabPane>

        <TabPane tab="Remove Labels" key="4">
          <Text>Select labels to remove:</Text>
          {labels ? (
            <List
              dataSource={labels.labels}
              renderItem={(item) => (
                <List.Item>
                  <Checkbox
                    onChange={(e) => handleLabelSelection(item.label, e.target.checked)}
                  >
                    {item.label} ({item.count})
                  </Checkbox>
                </List.Item>
              )}
            />
          ) : (
            <Text>Please upload and process a file to view labels.</Text>
          )}
          <Button
            type="primary"
            onClick={handleRemoveLabels}
            style={{ marginTop: '10px' }}
            disabled={selectedLabels.length === 0}
          >
            Remove Selected Labels
          </Button>
          {loading && <Spin style={{ marginLeft: '10px' }} />}
        </TabPane>

        <TabPane tab="Merge Labels" key="5">
          <Space direction="vertical">
            <Input
              placeholder="Labels to merge (comma-separated)"
              value={mergeLabels}
              onChange={(e) => setMergeLabels(e.target.value)}
              style={{ width: 400 }}
            />
            <Input
              placeholder="Target label name"
              value={mergeTargetLabel}
              onChange={(e) => setMergeTargetLabel(e.target.value)}
              style={{ width: 400 }}
            />
            <Button type="primary" onClick={handleMergeLabels}>
              Merge Labels
            </Button>
          </Space>
          {loading && <Spin style={{ marginLeft: '10px' }} />}
        </TabPane>

        <TabPane tab="Rename Labels" key="6">
          <Space direction="vertical">
            <Text>Enter rename mapping in JSON format:</Text>
            <Input.TextArea
              rows={4}
              placeholder='e.g., {"oldLabel1": "newLabel1", "oldLabel2": "newLabel2"}'
              value={renameMapping}
              onChange={(e) => setRenameMapping(e.target.value)}
              style={{ width: 400 }}
            />
            <Button type="primary" onClick={handleRenameLabels}>
              Rename Labels
            </Button>
          </Space>
          {loading && <Spin style={{ marginLeft: '10px' }} />}
        </TabPane>
      </Tabs>

      <Modal
        title="Download Modified File"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        <Button type="primary" href={downloadUrl} target="_blank">
          Download File
        </Button>
      </Modal>
    </div>
  );
}

export default App;
