import React from 'react';

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null; // 모달이 열리지 않았으면 렌더링하지 않음

  return (
    <div className="modal">
      <div className="modal-content">
        {children}
        {/* <button type="button" className="close-btn" onClick={onClose}>
          닫기
        </button> */}
      </div>
    </div>
  );
}
