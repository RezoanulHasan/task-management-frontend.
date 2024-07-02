import { useEffect } from "react";

const useTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title}-Tasks Hub`;
  }, [title]);
};

export default useTitle;
