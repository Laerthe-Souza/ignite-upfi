import { Button, Box, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { AxiosResponse } from 'axios';
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Image = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
};

export default function Home(): JSX.Element {
  const loadMore = async ({ pageParam = null }): Promise<AxiosResponse> => {
    const response = await api.get('/api/images', {
      params: {
        after: pageParam,
      },
    });

    console.log(response.data);

    return response.data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', loadMore, {
    getNextPageParam: (lastPage: any, pages) => lastPage.after,
  });

  const formattedData = useMemo<Image[]>(() => {
    return data?.pages.map(image => image.data).flat();
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {hasNextPage && (
          <Button
            type="button"
            display="flex"
            mx="auto"
            mt="16"
            onClick={() => {
              fetchNextPage();
            }}
            disabled={!hasNextPage}
            isLoading={isFetchingNextPage}
          >
            Carregar mais
          </Button>
        )}
      </Box>
    </>
  );
}
