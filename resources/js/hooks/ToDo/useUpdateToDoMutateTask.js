import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const useUpdateToDoMutateTask = () => {
  const queryClient = useQueryClient();
  const updateToDoMutation = useMutation(
    (toDo) => axios.put("/api/toDos/" + toDo.id, { title: toDo.title }),
    {
      onMutate: async (toDo) => {
        // 実行中の取得処理をキャンセル
        await queryClient.cancelQueries("toDoList");

        // 既存のToDoリストを取得する
        const previousToDoList = queryClient.getQueriesData("toDoList");

        // ToDoリストのキャッシュを更新する
        queryClient.setQueryData("toDoList", (oldToDoList) =>
          oldToDoList.map((oldToDo) => {
            if (oldToDo.id == toDo.id) {
              return {
                ...oldToDo,
                title: toDo.title,
              };
            }
            return oldToDo;
          })
        );

        // 更新に失敗した場合、既存のToDoリストを返却する
        return { previousToDoList };
      },
      onSettled: () => {
        queryClient.invalidateQueries("toDoList");
      },
    }
  );
  return { updateToDoMutation };
};

export default useUpdateToDoMutateTask;
