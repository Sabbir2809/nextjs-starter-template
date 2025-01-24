"use client";
import { useEffect } from "react";

interface IErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: IErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      {/* Attempt to recover by trying to re-render the segment */}
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
