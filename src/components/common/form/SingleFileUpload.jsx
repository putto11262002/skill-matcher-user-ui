import {
  useTheme,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  useMediaQuery,
} from '@mui/material';

import React, { useEffect, useRef, useState } from 'react';
import { VALID_IMAGE_MIME } from '@/constants/image.constant';
import { USER_DEFAULT_AVATAR } from '@/constants/user.constant';

const SingleFileUpload = ({  imageUrl, onUpload, loading, error }) => {
  const inputRef = useRef(null);
  const [url, setUrl] = useState(USER_DEFAULT_AVATAR);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [selectedFile, setSelectedFile] = useState(undefined)

  const theme = useTheme();

  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

  const handleClickInput = (e) => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if(!file) return 
    if (!VALID_IMAGE_MIME.includes(file.type)) {
      setErrorMessage(
        `Invalid file type, only accept ${VALID_IMAGE_MIME.map((mime) => mime.split('/')[1]).join(
          ', ',
        )}`,
      );
      return;
    }
    setUrl(URL.createObjectURL(file));
    setSelectedFile(file)
  };

  const handleClick = () => {
    if(selectedFile){
      onUpload(selectedFile)
      setSelectedFile(undefined)
    }else{
      handleClickInput()
    }
  }

  useEffect(() => {
    if (imageUrl) setUrl(imageUrl);
  }, [imageUrl]);

  useEffect(() => {
    if(error){
      setErrorMessage(error?.message)
      setUrl(imageUrl || USER_DEFAULT_AVATAR)
    }

  }, [error])

  return (
    <Box>
      <Stack flex alignItems='center' justifyContent='center' spacing={3}>
        <input onChange={handleChange} type='file' ref={inputRef} hidden />
        <img
       
       
          src={url}
          style={{ objectFit: 'cover' }}
          width={isLargeScreen ? 180 : 100}
          height={isLargeScreen ? 180 : 100}
          alt='user avatar'
        />
        {errorMessage && <FormHelperText error={true}>{errorMessage}</FormHelperText>}
        <Box>
          <Button disabled={loading}  onClick={handleClick}  variant='contained'>
            {selectedFile ? 'Upload' : 'Select image'}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default SingleFileUpload;
