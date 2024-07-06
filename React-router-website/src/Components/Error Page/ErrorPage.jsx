import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
        <div id="error-page" className="text-2xl">
        <h1><b>Oops!</b></h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
            <i>{error.statusText || error.message}</i>
        </p>
        </div>
    </div>
  );
}