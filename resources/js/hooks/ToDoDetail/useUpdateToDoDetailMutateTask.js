import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const useUpdateToDoDetailMutateTask = () => {
  const queryClient = useQueryClient();
  const updateToDoDetailMutation = useMutation(
    (toDoDetail) =>
      axios.put("/api/toDoDetails/" + toDoDetail.id, {
        name: toDoDetail.name,
        completed_flag: toDoDetail.completed_flag,
      }),
    {
      onMutate: async (toDoDetail) => {
        // 実行中の取得処理をキャンセル
        await queryClient.cancelQueries("toDoList");

        // 既存のToDoリストを取得する
        const previousToDoList = queryClient.getQueriesData("toDoList");

        // ToDoリストのキャッシュを更新する
        queryClient.setQueryData("toDoList", (oldToDoList) =>
          oldToDoList.map((oldToDo) => {
            if (oldToDo.id == toDoDetail.to_do_id) {
              let newToDoDetails = [];
              oldToDo.to_do_details.map((oldToDoDetail) => {
                if (oldToDoDetail.id == toDoDetail.id) {
                  newToDoDetails.push({
                    ...oldToDoDetail,
                    name: toDoDetail.name,
                    completed_flag: toDoDetail.completed_flag,
                  });
                } else {
                  newToDoDetails.push(oldToDoDetail);
                }
              });
              oldToDo.to_do_details = newToDoDetails;
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
  return { updateToDoDetailMutation };
};

export default useUpdateToDoDetailMutateTask;
