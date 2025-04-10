import React, { useEffect, useState } from 'react';
import DotbtnModals from './DotbtnModals';
import useUserStore from '@/store/userStore';
export default function Reply({
  props,
  children,
  isReplies,
  onReport,
  onDelete,
}) {
  const { user } = useUserStore();
  const [isAuthor, setIsAuthor] = useState(false);
  useEffect(() => {
    if (user) {
      setIsAuthor(user.id == props.userId);
    }
  }, [user]);
  const [toggleReplyEditor, setToggleReplyEditor] = useState(false);
  const [toggleDotMenu, setToggleDotMenu] = useState(false);

  const [toggleReport, setToggleReport] = useState(null);
  const [toggleDelete, setToggleDelete] = useState(null);

  const handleOnReport = (commentId) => {
    onReport(commentId);
    setToggleDotMenu(false);
  };
  const handleOnDelete = (commentId) => {
    onDelete(commentId);
    setToggleDotMenu(false);
  };
  return (
    <>
      <div className="comment-box">
        <img
          src={props.profile_image}
          alt="프로필 이미지"
          className="user-img"
        />
        <div className="comment-content">
          <span className="user-name">{props.author}</span>
          <div className="comment-meta">{props.created_at}</div>
          <span className="comment comment-text">{props.comment}</span>
          <div className="btn-bottom">
            <button className="f-14-b read-more">자세히 보기</button>
            {!isReplies && (
              <button
                className="f-14-b reply"
                onClick={() => setToggleReplyEditor(!toggleReplyEditor)}
              >
                답글 달기
              </button>
            )}
          </div>
          <div
            className={`
          reply-input-box ${toggleReplyEditor ? '' : 'hidden'}
          `}
          >
            <textarea
              className="reply-input border-ef"
              placeholder="답글을 입력해 주세요."
            ></textarea>
            <div className="btn-bottom">
              <button className="reply-submit btn-02">등록</button>
              <button className="reply-cancel btn-02">취소</button>
            </div>
          </div>
          {props.replies &&
            props.replies.map((reply) => (
              <Reply
                key={reply.id}
                props={reply}
                isReplies={true}
                onReport={(commentId) => setToggleReport(commentId)}
                onDelete={(commentId) => setToggleDelete(commentId)}
              >
                <DotbtnModals
                  commentId={reply.id}
                  toggleReport={toggleReport}
                  toggleDelete={toggleDelete}
                />
              </Reply>
            ))}
        </div>
        {/*  점점점 버튼 */}
        <button
          className="more border-ef"
          onClick={() => setToggleDotMenu(!toggleDotMenu)}
        >
          <img
            src="/img/detail/more.png"
            alt="더보기 아이콘"
            className="more-icon iconW-24"
          />
        </button>
        <div className={`more-menu ${toggleDotMenu ? 'visible' : ''}`}>
          <button className="report" onClick={() => handleOnReport(props.id)}>
            신고하기
          </button>
          {/* TODO 본인이 쓴 글만 삭제 가능? */}
          {isAuthor && (
            <button className="del" onClick={() => handleOnDelete(props.id)}>
              삭제하기
            </button>
          )}
        </div>
      </div>
      {children}
    </>
  );
}
