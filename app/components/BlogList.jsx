'use client';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

export default function BlogList({ type = 'trend', page = 0, onLastPage }) {
  const [listStack, setListStack] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  // const apiUrl = 'https://api.pastorjun.com/api';
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // 데이터 가져오기 함수
  const fetchData = async (page) => {
    try {
      const response = await fetch(`${apiUrl}/blog-${type}?page=${page}`);
      const result = await response.json();
      return result[type]?.data || [];
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  // 데이터 추가 함수
  const addList = (data) => {
    const newItems = data.map((post) => ({
      path: `/blogs/${post.id}`,
      title: post.title || 'no-title available',
      description:
        getDescription(post.description) || 'no-description available',
      image: getPostImage(post.blog_photo) || '/not-found.jpg',
      alt: post.alt || 'no alter data available',
      ogImage: post.blog_photo || '/not-found.jpg',
      date: dayjs(post.created_at).format('YYYY-MM-DD') || 'not-date-available',
    }));
    setListStack((prevList) => [...prevList, ...newItems]);
  };

  // 설명 텍스트 포맷 함수
  const getDescription = (description) => {
    return description?.replace(/\n/g, ' ') || '';
  };
  const getPostImage = (image) => {
    return image ?? '/img/fallback.png';
  };

  // 페이지 변경 시 데이터 가져오기
  useEffect(() => {
    if (isFetching) return;

    const fetchAndAddData = async () => {
      setIsFetching(true);
      const data = await fetchData(page);
      if (data.length > 0) {
        addList(data);
      } else if (onLastPage) {
        onLastPage();
      }
      setIsFetching(false);
    };

    fetchAndAddData();
  }, [page]); // 페이지가 변경될 때마다 실행

  return (
    <>
      {listStack.map((post, index) => (
        <div key={index} className="photo-box">
          <a href={post.path}>
            <img src={post.image} alt={post.alt} />
            <div className="text-box">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-date">{post.date}</p>
            </div>
          </a>
        </div>
      ))}
    </>
  );
}
