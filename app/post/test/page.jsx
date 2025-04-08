'use client';
import DOMPurify from 'dompurify';
import React from 'react';

export default function page() {
  const testHTML = `<p dir="ltr"><span style="font-family: MaruBuri; white-space: pre-wrap;">동해물과 백두산이 마르고     </span><span style="white-space: pre-wrap;">    Lorem ipsum dolor sit amet consectetur adipisicin</span><span style="font-size: 22px; white-space: pre-wrap;">g elit. Est rerum adipisci minus aspernatur excepturi totam. Illum, veritatis nulla alias odio facere vitae nihil similique sunt rem hic </span><span style="font-family: &quot;Nanum Myeongjo&quot;; font-size: 22px; white-space: pre-wrap;">aspernatur eveniet sequi!</span></p><p dir="ltr"><span style="font-family: &quot;Nanum Myeongjo&quot;; white-space: pre-wrap;">        Voluptatum perspiciatis error itaque exercitationem modi reiciendis ex</span><span style="font-family: &quot;Nanum Myeongjo&quot;; font-size: 16px; white-space: pre-wrap;">, fugiat vero delectus totam dolores laboriosam, voluptas quia. Rerum doloremque veniam incidunt explicabo aliquid quod qu</span><span style="font-size: 16px; white-space: pre-wrap;">a</span><span style="font-family: NanumBarunGothic; font-weight: bold; font-style: italic; text-decoration: underline; color: rgb(253, 204, 50); font-size: 16px; white-space: pre-wrap;">si atque voluptas, commodi, vero veritatis natus?</span></p><p dir="ltr"><span style="font-family: NanumBarunGothic; font-weight: bold; font-style: italic; text-decoration: underline; color: rgb(253, 204, 50); font-size: 16px; white-space: pre-wrap;">        Magni, dolor! Quia placeat natu</span><span style="font-family: NanumBarunGothic; font-weight: bold; font-style: italic; text-decoration: underline; color: rgb(253, 204, 50); white-space: pre-wrap;">s nulla mollitia sit quaerat nesciunt assumenda, ipsam at veniam excepturi voluptatum tenetur </span><span style="white-space: pre-wrap;">totam veritatis voluptate suscipit obcaecati voluptatem impedit praesentium soluta pariatur! Omnis, non incidunt.</span></p><p dir="ltr"><span style="white-space: pre-wrap;">        Libero sapien</span><span style="background: rgb(255, 182, 193); white-space: pre-wrap;">te odio a ipsam veritatis hic dolorum harum tenetur id, quae illum expedita suscipit similique quibusdam reiciendis fugiat! Odio minus nobis cumque, sit perspiciatis eaque nemo voluptate</span><span style="white-space: pre-wrap;">m recusandae magni!</span></p><p dir="ltr"><span style="white-space: pre-wrap;">        Suscipit, ex o</span><span style="text-decoration: line-through; white-space: pre-wrap;">ptio voluptas sit exercitationem ab, vitae pos</span><span style="text-decoration: line-through; font-family: MaruBuri; white-space: pre-wrap;">simus quas tenetur nemo odio beatae sunt voluptatem, quis eum. Sunt cupiditate numquam doloribus sequi non exerc</span><span style="text-decoration: line-through; white-space: pre-wrap;">itatio</span><span style="white-space: pre-wrap;">nem et consequuntur minima! Blanditiis, alias.</span></p><img class="m-t-50 post-image" src="https://d2d5wqehjh5x7e.cloudfront.net/1383/Screenshot-2025-04-01-at-2.13.01 PM.png" alt="Screenshot-2025-04-01-at-2.13.01 PM.png"><img class="m-t-50 post-image" src="https://d2d5wqehjh5x7e.cloudfront.net/1384/19830715.png" alt="19830715.png">`;
  const SafeHtmlRenderer = ({ htmlString }) => {
    const sanitizedHtml = DOMPurify.sanitize(htmlString);

    return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
  };
  return (
    <div className="content-wrap">
      <div className="main">
        <div className="detail-content">
          <div className="post-title yellow">블로그 제목 </div>
          <div className="post-meta m-t-60">
            <span className="writer">맛거리</span>
            <span className="date">2025. 03. 19</span>
          </div>

          <div className="post-body m-y-60">
            <div
              className="post-text"
              dangerouslySetInnerHTML={{ __html: testHTML }}
            >
              {/* 안에 editor 결과물 넣기 */}
              {/* <SafeHtmlRenderer htmlString={testHTML} /> */}
            </div>
          </div>
          {/* buttons */}
          <div className="btn-container m-t-50">
            <div className="keyword-list">
              <div className="keyword-btn btn-03 radius-20">전국 카페</div>
              <div className="keyword-btn btn-03 radius-20">카페 추천</div>
              <div className="keyword-btn btn-03 radius-20">분좋카</div>
              <div className="keyword-btn btn-03 radius-20">맛집</div>
            </div>

            <div className="btn-box">
              <button className="like border-ef" type="button">
                <img
                  className="like-change iconW-24"
                  src="/img/detail/like-before.png"
                  alt="하트 아이콘"
                />
                <span className="like-total">14</span>
              </button>
              <button className="share border-ef" type="button">
                <img
                  className="iconW-24"
                  src="/img/detail/share.png"
                  alt="공유하기 아이콘"
                />
                <span className="share-total">14</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
