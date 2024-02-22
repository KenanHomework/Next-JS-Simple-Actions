import { GetAllTasks } from "@/actions/home";
import Tasks from "@/app/components/Tasks";

async function getAll() {
  const tasks = await GetAllTasks();
  return tasks || [];
}

export default async function Home() {
  const tasks = await getAll();

  return (
    <main className={""}>
      <Tasks tasks={tasks} />
    </main>
  );
}
