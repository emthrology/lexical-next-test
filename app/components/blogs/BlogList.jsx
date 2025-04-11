'use client';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogList({ type = 'trend' }) {
  const [list, setlist] = useState([]);
  const [isFetched, setIsFetched] = useState(false); // 상태 추가
  // const apiUrl = 'https://api.pastorjun.com/api';
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // 설명 텍스트 포맷 함수
  const getDescription = (description) => {
    return description?.replace(/\n/g, ' ') || '';
  };
  const getPostImage = (image) => {
    return image ?? '/img/fallback.png';
  };

  useEffect(() => {
    if (isFetched) return; // 이미 데이터를 가져왔으면 실행하지 않음
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/blog-${type}?page=1`);
        const result = await response.json();
        const data = result[type]?.data.reverse() || [];
        const newItems = data
          .map((post) => ({
            path: `/blogs/${post.id}`,
            title: post.title || 'no-title available',
            description:
              getDescription(post.description) || 'no-description available',
            image: getPostImage(post.blog_photo) || '/not-found.jpg',
            alt: post.alt || 'no alter data available',
            ogImage: post.blog_photo || '/not-found.jpg',
            date:
              dayjs(post.created_at).format('YYYY-MM-DD') ||
              'not-date-available',
          }))
          .slice(0, type == 'trend' ? 3 : 5);
        setlist([...newItems]);
        setIsFetched(true); // 상태 업데이트
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {list.map((post, index) => (
        // <div key={index} className="photo-box">
        //   <a href={post.path}>
        //     <img src={post.image} alt={post.alt} />
        //     <div className="text-box">
        //       <h3 className="post-title">{post.title}</h3>
        //       <p className="post-date">{post.date}</p>
        //     </div>
        //   </a>
        // </div>
        <Link href={post.path} key={index} className="best-item">
          <div className="thumbnail" style={{ width: '140px', height: '95px' }}>
            <Image
              src={post.image}
              alt={post.alt}
              sizes="(max-width: 140px) 100vw, (max-width: 95px) 50vw, 33vw"
              priority={false}
              fill
            />
            {type == 'trend' && <span className="rank">{index + 1}</span>}
          </div>
          <div className="info">
            <p className="title">{post.title}</p>
            <p className="date">{post.date}</p>
          </div>
        </Link>
      ))}
    </>
  );
}
