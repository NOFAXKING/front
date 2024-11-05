
export default function Home() {
  return (
    <>
      <h1 className="flex justify-center font-medium text-3xl mb-10">Well come back UserName</h1>
      <div className="flex justify-center min-h-screen py-2">
        <div>
          <form className="mb-10">
            <label htmlFor="todo-note" className="font-medium text-2xl">Add a Task</label>
            <input type="text" id="todo-note" className="border-2 border-black p-1" />
            <input type="submit" value="Add" className="border-2 border-black p-1" />
          </form>
          <div>
            <h1 className="font-extrabold">List of Tasks</h1>
            <ul>
              <li>
                First task
              </li>
              <li>
                Second task
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
