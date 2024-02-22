"use server";
import Task from "@/types/task";
import { MongoClient, ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function GetAllTasks() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  try {
    const database = client.db("local");
    const movies = database.collection("tasks");
    const tasks = (await (movies.find({}).toArray() as unknown)) as Array<Task>;
    return tasks.map((el) => ({ ...el, _id: el._id.toString() }));
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

export async function deleteTaskById(taskId: string) {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  console.log("taskId: ", taskId);

  try {
    await client.connect();
    const database = client.db("local");
    const tasksCollection = database.collection("tasks");

    const result = await tasksCollection.deleteOne({
      _id: new ObjectId(taskId),
    });
    revalidatePath("/");

    if (result.deletedCount === 0) {
      return {
        error: true,
        message: `Task not found with id ${taskId}`,
      };
    }

    return {
      error: false,
      message: "Task deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting task:", error);
    return {
      error: true,
      message: "Error deleting task",
    };
  } finally {
    await client.close();
  }
}

export async function createUserTask(user: string, form: FormData) {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  let task = form.get("task");
  let command = form.get("command");

  try {
    const database = client.db("local");
    const movies = database.collection("tasks");
    // Query for a movie that has the title 'Back to the Future'
    const tasks = (await (movies.find({}).toArray() as unknown)) as Array<Task>;
    const filterTask = tasks.find((el) => el.task == task);
    if (filterTask) {
      return {
        error: true,
        message: `Task with ${task} is exsist`,
      };
    } else {
      const query = { task, command };
      const movie = await movies.insertOne(query);
      revalidatePath("/");
      console.log(movie);
      return {
        error: false,
        message: "Inserted",
      };
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
