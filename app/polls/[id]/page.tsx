import { PollForm } from "@/components/poll-form"

async function getPoll(id: string) {
  // const res = await fetch(`/api/polls/${id}`)
  const res = await fetch(`http://127.0.0.1:8000/polls/${id}`)
  if (!res.ok) throw new Error('Failed to fetch poll')
  return res.json()
}

export default async function PollPage({ params }: { params: { id: string } }) {
  const poll = await getPoll(params.id)
  
  return (
    <div className="container max-w-lg mx-auto p-4">
      <PollForm initialData={poll} pollId={params.id} />
    </div>
  )
}

