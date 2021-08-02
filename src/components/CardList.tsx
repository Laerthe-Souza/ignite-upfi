import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const disclosure = useDisclosure();

  const [imageUrl, setImageUrl] = useState('');

  function handleViewImage(url: string): void {
    setImageUrl(url);

    disclosure.onOpen();
  }

  return (
    <>
      <SimpleGrid minChildWidth="290px" gap="40px" columns={3}>
        {cards.map(card => (
          <Card
            key={card.id}
            data={card}
            viewImage={() => {
              handleViewImage(card.url);
            }}
          />
        ))}
      </SimpleGrid>

      <ModalViewImage
        imgUrl={imageUrl}
        isOpen={disclosure.isOpen}
        onClose={disclosure.onClose}
      />
    </>
  );
}
