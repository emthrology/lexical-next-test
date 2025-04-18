'use client';
import RichTextEditor from '@/app/components/blogs/edit/RichTextEditor';
import React, { use, useState, useEffect } from 'react';
export default function page({ searchParams }) {
  const [blogData, setBlogData] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { blogId } = use(searchParams);
  useEffect(() => {
    const fetchData = async () => {
      if (blogId) {
        try {
          const response = await fetch(`${apiUrl}/blogs/${blogId}`);
          if (response.ok) {
            const data = await response.json();
            setBlogData(data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchData();
  }, []);
  return (
    <div className="content-wrap">
      <RichTextEditor editData={blogData?.data || null} />
    </div>
  );
}
