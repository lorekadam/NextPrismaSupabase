import { Button } from '@mantine/core';
import { signOut } from '../../actions';

export const SignOut = () => (
  <form action={signOut}>
    <Button type="submit" color="dark">
      sign out
    </Button>
  </form>
);
