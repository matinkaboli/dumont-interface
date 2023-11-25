import Button from '@/components/core/Button';

export default function Home() {
  return <main>Main Page <Button leftSection={<span>right</span>}
                                 rightSection={<span>left</span>}>button hello</Button></main>;
}
