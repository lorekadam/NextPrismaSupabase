import { Box, Flex } from '@mantine/core';
import React, { ReactNode } from 'react';
import classes from './Shell.module.css';
import { Sidebar } from '@/lib/dashboard/components';

type ShellProps = {
  children: ReactNode;
};

export const Shell = ({ children }: ShellProps) => (
  <Flex className={classes.wrapper}>
    <Sidebar />
    <main>
      <Box p={16}>{children}</Box>
    </main>
  </Flex>
);
