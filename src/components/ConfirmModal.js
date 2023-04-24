const ConfirmModal = ({setModalActive, setDeleteConfirm}) => {

  const deleteHandler = () => {
    setDeleteConfirm(true);
    setModalActive(false);
  }

  return (
    <div>
      <p>이 문장을 삭제하시겠습니까?</p>
      <div>
        <button onClick={() => setModalActive(false)}>취소</button>
        <button onClick={deleteHandler}>삭제</button>
      </div>
    </div>
  )
}

export default ConfirmModal;