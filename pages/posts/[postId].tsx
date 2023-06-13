import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface PostPageProps {
  post: {
    title: string;
    author: string;
    description: string;
  };
}

export default function PostPage({ post }: PostPageProps) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Post Detail Page</h1>
      <h3>{post.title}</h3>
      <p>Author: {post.author}</p>
      <p>Description: {post.description}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
  const data = await response.json();
  return {
    paths: data.data.map((post: any) => ({ params: { postId: post.id } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  // console.log('Check context object >>> ', context.params);
  const response = await fetch(
    `https://js-post-api.herokuapp.com/api/posts/${context.params?.postId}`
  );
  const data = await response.json();
  if (!data) return { notFound: true };
  return {
    props: {
      post: data,
    },
    revalidate: 10,
  };
};
