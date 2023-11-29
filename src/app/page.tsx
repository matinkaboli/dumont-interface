import { Button, Icon, Input } from '@/components';

export default function Home() {
  return (
    <main>
      <Button
        variant="neutral"
        leftSection={<Icon name="arrow-left" />}
        rightSection={<span>left</span>}
      >
        button
      </Button>

      <Input
        size="sm"
        placeholder="input"
        leftSection={<Icon name="home" />}
        rightSection={<Icon name="home" className="cursor-pointer" />}
        rightSectionPointerEvents="auto"
      />
    </main>
  );
}
