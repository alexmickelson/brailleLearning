import toast, { ErrorIcon } from "react-hot-toast";
import { QueryCache, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (e) => createErrorToast(getMessageFromError(e)),
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
    mutations: {
      onError: (e) => createErrorToast(getMessageFromError(e)),
      retry: 0,
    },
  },
});

export const getQueryClient = () => {
  return queryClient;
};

function createErrorToast(message: string) {
  toast(
    (t) => (
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getMessageFromError(error: any) {
  if (error.response?.data.detail) {
    const responseDetail = error.response?.data.detail;
    const detailIsString =
      typeof responseDetail === "string" || responseDetail instanceof String;
    return detailIsString
      ? responseDetail.toString()
      : JSON.stringify(responseDetail);
  } else if (typeof error === "string") {
    return error;
  } else if (typeof error.message === "string") {
    return error.message;
  } else if (error.name === "AxiosError") {
    console.log(error);
    return error.response.data;
  } else {
    console.log("could not detect type of error", error);
    return JSON.stringify(error);
  }
}
