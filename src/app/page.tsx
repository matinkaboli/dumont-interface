import { Button, Icon } from '@/components';

export default function Home() {
  return (
    <main className="">
      Main Page{' '}
      <Button variant="neutral" leftSection={<Icon name="arrow-left" />} rightSection={<span>left</span>}>
        button hello
      </Button>

      <Icon name="line-chart" color="blue" />
    </main>
  );
}
