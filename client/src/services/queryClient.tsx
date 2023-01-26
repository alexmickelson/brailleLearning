import toast, { ErrorIcon } from "react-hot-toast";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      onError: addErrorAsToast,
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
        <ErrorIcon />
        <div> {message}</div>
        <button onClick={() => toast.dismiss(t.id)} className="">
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
