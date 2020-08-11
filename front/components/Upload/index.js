import React, { useCallback, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Button, Row, Switch } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import Slick from 'react-slick';

import useInput from '../../hooks/useInput';
import { UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE, ADD_POST_REQUEST, REMOVE_IMAGE_ALL } from '../../reducers/post';
import { backUrl } from '../../config/config';
import { Global, Title, Content, ImgWrapper } from './style';
import { Left, Center, Right } from '../AppLayout/style';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const Upload = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const [content, onChangeContent, setContent] = useInput('');
  const [commentAllow, setCommentAllow] = useState(false);
  const [current, setCurrent] = useState(0);
  const imageInput = useRef();

  useEffect(() => {
    if (addPostDone) {
      alert('게시물이 등록되었습니다.');

      setVisible(false);
      setContent('');
      setCommentAllow(false);
      setCurrent(0);

      // 이미지 삭제
      dispatch({
        type: REMOVE_IMAGE_ALL,
      });
      if (imageInput.current) {
        imageInput.current.value = null;
      }
    }
  }, [addPostDone]);

  const onCommentAllow = useCallback((checked) => {
    setCommentAllow(checked);
  });
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  });
  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index,
    });
  });
  const onSubmit = useCallback(() => {
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', content);
    formData.append('commentAllow', commentAllow);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [content, imagePaths, commentAllow]);
  const onCancel = useCallback(() => {
    setVisible(false);
    setContent('');
    setCommentAllow(false);
    setCurrent(0);

    // 이미지 삭제
    dispatch({
      type: REMOVE_IMAGE_ALL,
    });
    if (imageInput.current) {
      imageInput.current.value = null;
    }
  }, []);
  const onNext = useCallback(() => {
    setCurrent(current + 1);
  }, [current]);
  const onPrev = useCallback(() => {
    setCurrent(current - 1);
  }, [current]);
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      closable={false}
    >
      <Form encType="multipart/form-data" onFinish={onSubmit}>
        <Title>
          <Row>
            <Left xs={8}>
              {current > 0 && (
                <Button onClick={onPrev}>이전</Button>
              )}
              {current === 0 && (
                <Button onClick={onCancel}>닫기</Button>
              )}
            </Left>
            <Center xs={8}>
              {current === 0 && (
                <span className="title">Image</span>
              )}
              {current === 1 && (
                <span className="title">Content</span>
              )}
            </Center>
            <Right xs={8}>
              {current < 1 && (
                <Button type="primary" onClick={onNext} disabled={imagePaths.length === 0}>다음</Button>
              )}
              {current === 1 && (
                <Button type="primary" htmlType="submit">공유</Button>
              )}
            </Right>
          </Row>
        </Title>
        <Content>
          {current === 0 && (
            <>
              <div>
                <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
              </div>
              <div>
                <Global />
                <Slick {...settings}>
                  {
                    imagePaths.map((v, i) => (
                      <ImgWrapper key={v}>
                        <div className="remove">
                          <Button shape="circle" icon={<DeleteFilled />} size="small" onClick={onRemoveImage(i)} />
                        </div>
                        <img
                          src={`${backUrl}/${v}`}
                          style={{ width: '100%' }}
                          alt={v}
                        />
                      </ImgWrapper>
                    ))
                  }
                </Slick>
              </div>
            </>
          )}
          {current === 1 && (
            <>
              <Input.TextArea
                value={content}
                onChange={onChangeContent}
                maxLength={500}
                rows={5}
                placeholder="문구 입력.."
              />
              <div>
                댓글 기능 해제
                <Switch onChange={onCommentAllow} />
              </div>
            </>
          )}
        </Content>
      </Form>
    </Modal>
  );
};

Upload.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default Upload;
