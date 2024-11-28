'use client'
import useSWR from 'swr';
import Link from "next/link"
import { Button } from "@/components/ui/button"

const fetcher = (url: string) => fetch(url, { cache: "no-store" }).then(res => res.json());

export default function ResultsPage({ params }: { params: { id: string } }) {
  const { data: results, error } = useSWR(`http://127.0.0.1:8000/polls/${params.id}/results`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!results) return <div>Loading...</div>;

  return (
    <div className="container max-w-lg mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">{results.question_text}</h1>
      <p className="text-sm text-muted-foreground">Published on: {results.pub_date}</p>
      <ul className="space-y-4">
        {results.polls_choice.map((choice: { id: number; choice_text: string; votes: number }) => (
          <li key={choice.id} className="flex justify-between items-center">
            <span>{choice.choice_text}</span>
            <span className="text-muted-foreground">-- {choice.votes} votes</span>
          </li>
        ))}
      </ul>
      <Button asChild className="w-full">
        <Link href={`/polls/${params.id}`}>다시 투표하기</Link>
      </Button>
    </div>
  )
}

