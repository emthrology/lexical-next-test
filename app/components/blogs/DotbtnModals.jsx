import React, { useEffect, useState } from 'react';
import Modal from '../Modal';

export default function DotbtnModals({
  commentId,
  toggleReport,
  toggleDelete,
}) {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalType) => setActiveModal(modalType);
  const closeModal = () => setActiveModal(null);
  useEffect(() => {
    if (commentId == toggleReport) {
      openModal('report');
    }
  }, [toggleReport]);
  useEffect(() => {
    if (commentId == toggleDelete) {
      openModal('delete');
    }
  }, [toggleDelete]);
  return (
    <>
      {/* 신고 모달 */}
      <Modal isOpen={activeModal === 'report'} onClose={closeModal}>
        <p className="text">
          <b>정말로 신고하시겠습니까?</b>
        </p>
        <div className="m-t-40">
          <button
            type="button"
            className="confirm btn-01 w-125"
            onClick={() => {
              // TODO 신고하기
              closeModal();
              openModal('reportSuccess'); // 신고 성공 모달 열기
            }}
          >
            예
          </button>
          <button
            type="button"
            className="cancel btn-01 w-125"
            onClick={closeModal}
          >
            아니요
          </button>
        </div>
      </Modal>

      {/* 신고 접수 완료 모달 */}
      <Modal isOpen={activeModal === 'reportSuccess'} onClose={closeModal}>
        <p className="text">
          <b>신고가 접수되었습니다.</b>
        </p>
        <button
          type="button"
          className="close m-t-40 btn-01 w-125"
          onClick={closeModal}
        >
          확인
        </button>
      </Modal>

      {/* 삭제 모달 */}
      <Modal isOpen={activeModal === 'delete'} onClose={closeModal}>
        <p className="text">
          <b>정말로 삭제하시겠습니까?</b>
        </p>
        <div className="m-t-40">
          <button
            type="button"
            className="confirm btn-01 w-125"
            onClick={() => {
              // TODO 삭제하게
              closeModal();
            }}
          >
            예
          </button>
          <button
            type="button"
            className="cancel btn-01 w-125"
            onClick={closeModal}
          >
            아니요
          </button>
        </div>
      </Modal>
    </>
  );
}
