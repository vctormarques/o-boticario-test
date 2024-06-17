import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IconButton } from '@chakra-ui/react';
import { IoMdCloudUpload } from 'react-icons/io';
import { Upload } from 'antd';
const { Dragger } = Upload;

interface UploadComponentProps {
  onFileChange: (file: File | null) => void;
  resetComponent: boolean;

}

const UploadComponent: React.FC<UploadComponentProps> = ({ onFileChange, resetComponent  }) => {
  const [fileList, setFileList] = useState<any[]>([] || null);

  useEffect(() => {
    if (resetComponent) {
      setFileList([]);
    }
  }, [resetComponent]);
  
  const handleChange = (info: any) => {
    const newFileList = [...info.fileList].slice(-1); 
    setFileList(newFileList);
    if (newFileList.length > 0) {
      onFileChange(newFileList[0].originFileObj);
    } else {
      onFileChange(null);
    }
  };


  const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    vertical-align: middle;
    margin: 0 auto;
  `;
  
  return (
    <Container>
      <Dragger
        beforeUpload={() => false}
        onChange={handleChange}
        fileList={fileList}
        showUploadList={true}
        
      >
        <IconButton
          variant="outline"
          colorScheme="green"
          aria-label="Upload"
          size="md"
          icon={<IoMdCloudUpload />}
        />
        <p className="ant-upload-text">Clique aqui ou arraste um arquivo</p>
      </Dragger>
    </Container>
  );
};

export default UploadComponent;
