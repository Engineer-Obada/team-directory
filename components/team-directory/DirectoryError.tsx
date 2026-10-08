interface DirectoryErrorProps {
    message: string;
    onRetry: () => void;
    isRetrying?: boolean;
  }
  
  export default function DirectoryError({
    message,
    onRetry,
    isRetrying = false,
  }: DirectoryErrorProps) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 p-6 text-center"
      >
        <h2 className="font-semibold text-red-700">
          Failed to load users
        </h2>
  
        <p className="mt-2 text-sm text-red-600">
          {message}
        </p>
  
        <button
          type="button"
          onClick={onRetry}
          disabled={isRetrying}
          className="mt-4 cursor-pointer rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isRetrying ? "Retrying..." : "Retry"}
        </button>
      </div>
    );
  }