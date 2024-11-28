"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface Choice {
  id: number
  choice_text: string
}

interface PollFormProps {
  initialData: {
    id: number
    question_text: string
    pub_date: string
    polls_choice: Choice[]
  }
  pollId: string
}

export function PollForm({ initialData, pollId }: PollFormProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedOption === null) return

    try {
      const res = await fetch(`http://127.0.0.1:8000/polls/${pollId}/vote/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ choice_id: selectedOption }),
      })

      if (res.ok) {
        router.push(`/polls/${pollId}/results`)
      }
    } catch (error) {
      console.error('Failed to submit vote:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{initialData.question_text}</h1>
        <p className="text-sm text-muted-foreground">Published on: {initialData.pub_date}</p>
        <RadioGroup
          value={selectedOption?.toString()}
          onValueChange={(value) => setSelectedOption(parseInt(value))}
          className="space-y-3"
        >
          {initialData.polls_choice.map((choice) => (
            <div key={choice.id} className="flex items-center space-x-2">
              <RadioGroupItem value={choice.id.toString()} id={`choice-${choice.id}`} />
              <Label htmlFor={`choice-${choice.id}`}>{choice.choice_text}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <Button type="submit" className="w-full" disabled={selectedOption === null}>
        투표하기
      </Button>
    </form>
  )
}

