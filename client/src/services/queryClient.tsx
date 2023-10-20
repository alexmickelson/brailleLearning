import toast, { ErrorIcon } from "react-hot-toast";
import { QueryCache, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: addErrorAsToast,
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
    mutations: {
      onError: addErrorAsToast,
      retry: 0,
    },
  },
});

export const getQueryClient = () => {
  return queryClient;
};

function createErrorToast(message: string) {
  toast(
    (t: any) => (
      <div className="flex">
        <div className="my-auto">
          <ErrorIcon />
        </div>
        <div className="text-center m-3 p-1">{message}</div>
        <button onClick={() => toast.dismiss(t.id)} className="my-auto">
          X
        </button>
      </div>
    ),
    {
      duration: Infinity,
      style: {
        maxWidth: "75em",
      },
    }
  );
}

function addErrorAsToast(error: any) {
  console.log(error);
  const responseDetail = error.response?.data.detail;
  const message = responseDetail
    ? responseDetail
      ? typeof responseDetail === "string" || responseDetail instanceof String
        ? responseDetail.toString()
        : JSON.stringify(responseDetail)
      : `Error With Request`
    : typeof error === "string"
    ? error
    : JSON.stringify(error);

  createErrorToast(message);
}
