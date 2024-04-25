export interface TasksItem {
  id: string,
  title: string,
  description: string,
  completed: boolean
}

const tasks: TasksItem[] = [
  {
    id: "1",
    title: "Buy Milk",
    description: "Buy Milk from the grocery store",
    completed: false
  },
  {
    id: "2",
    title: "Finish Report",
    description: "Complete the quarterly report for the team meeting",
    completed: true
  },
  {
    id: "3",
    title: "Call Mom",
    description: "Give Mom a call and check in on her",
    completed: false
  },
  {
    id: "4",
    title: "Go for a Run",
    description: "Get some exercise by going for a jog in the park",
    completed: false
  },
  {
    id: "5",
    title: "Read a Book",
    description: "Start reading the new novel you bought last week",
    completed: false
  }
]

export default tasks;