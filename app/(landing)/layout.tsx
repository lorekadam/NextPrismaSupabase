import React, { ReactNode } from 'react';
import { Box, Container } from '@mantine/core';
import { Navbar } from '@/lib/home/components';

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <Container fluid p={0}>
      <Box mb={20}>
        <Navbar />
      </Box>
      {children}
    </Container>
  );
}
