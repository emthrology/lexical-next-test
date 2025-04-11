const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export const getCsrfToken = async () => {

  const response = await fetch(`${BASE_URL}/sanctum/csrf-cookie`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch CSRF token');
  }
};

export const fetchData = async (endpoint, options = {}) => {

  // console.log(BASE_URL, 32323)
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: {
        ...options.headers,
      },
      ...options
    });
    // HTTP 상태 코드 확인
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch API Error:', error.message);
    throw error; // 에러를 호출한 곳으로 전달
  }
}