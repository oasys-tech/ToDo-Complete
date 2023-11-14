import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const useStoreToDoMutateTask = () => {
  const queryClient = useQueryClient();
  const storeToDoMutation = useMutation(
    (toDo) =>
      axios.post("/api/toDos", {
        title: null,
      }),
    {
      onSettled: () => {
        queryClient.invalidateQueries("toDoList");
      },
    }
  );
  return { storeToDoMutation };
};

export default useStoreToDoMutateTask;
