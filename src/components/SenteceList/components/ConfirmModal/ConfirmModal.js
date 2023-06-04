import * as Styled from './ConfirmModal.styles';

const ConfirmModal = ({ setModalActive, setDeleteConfirm }) => {
  const deleteHandler = () => {
    setDeleteConfirm(true);
    setModalActive(false);
  };

  return (
    <Styled.ModalOutside>
      <Styled.ModalWrapper elevation={3}>
        <span>이 문장을 삭제하시겠습니까?</span>
        <Styled.ButtonArea>
          <Styled.CancelBtn onClick={() => setModalActive(false)}>취소</Styled.CancelBtn>
          <Styled.DeleteBtn onClick={deleteHandler}>삭제</Styled.DeleteBtn>
        </Styled.ButtonArea>
      </Styled.ModalWrapper>
    </Styled.ModalOutside>
  );
};

export default ConfirmModal;
