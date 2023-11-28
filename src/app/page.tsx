import { Button } from '@/components/core';
import Icon from '@/components/core/Icon';

export default function Home() {
  return (
    <main className="">
      Main Page{' '}
      <Button variant="neutral" leftSection={<Icon name="home-fill" />} rightSection={<span>left</span>}>
        button hello
      </Button>

      <Icon name="line-chart" />
    </main>
  );
}
