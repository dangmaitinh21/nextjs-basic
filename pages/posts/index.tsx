import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface PostListPageProps {
  posts: any[];
}

export default function PostListPage() {
  const [posts, setPosts] = React.useState([]);
  const router = useRouter();
  const page = router.query?.page;
  console.log(router.query);
  React.useEffect(() => {
    (async () => {
      if (!page) return;
      const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`);
      const data = await response.json();
      setPosts(data.data);
    })();
  }, [page]);
  const handleClickNext = () => {
    router.push(
      {
        pathname: '/posts',
        query: { page: Number(router.query?.page) + 1 },
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <button onClick={handleClickNext}>Next Page</button>
    </>
  );
}

// export const getStaticProps: GetStaticProps<PostListPageProps> = async (
//   context: GetStaticPropsContext
// ) => {
//   const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
//   const data = await response.json();
//   return {
//     props: {
//       posts: data.data.map((post: any) => ({
//         id: post.id,
//         title: post.title,
//         author: post.author,
//       })),
//     },
//   };
// };
