'use client';

import Accordion from '@/components/Accordion';
import NoData from '@/components/NoData';
import { useMessageStore } from '@/components/Providers/MessageStoreProvider';
import useImages from '@/hooks/useImages';
import { MessageOnSites } from '@/types/app';
import { Fragment, useMemo } from 'react';

const MailList = () => {
  const {
    images: { envelope },
  } = useImages();
  const messageOnSites: MessageOnSites[] = useMessageStore((state) => state.messageOnSites);

  const sortedMessages = useMemo(() => {
    return messageOnSites.toSorted((a, b) => {
      if (a.createTime && b.createTime) return a.createTime > b.createTime ? 1 : -1;
      return -1;
    });
  }, [messageOnSites]);

  if (sortedMessages.length === 0) return <NoData />;
  return (
    <Fragment>
      {sortedMessages.map((mail, index) => (
<<<<<<< HEAD
        <div key={mail.id} style={index > 0 ? { marginTop: '0.1rem' } : {}}>
=======
        <div key={index}>
>>>>>>> be1448d3cb8ed62ffcee73472526d6952fe80245
          <Accordion message={mail} delay={index} img={envelope} />
        </div>
      ))}
    </Fragment>
  );
};

export default MailList;
