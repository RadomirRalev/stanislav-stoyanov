import {useMemo} from "react";
import {useLocation} from "react-router-dom";

const previewSecret = import.meta.env.VITE_PREVIEW_SECRET;

export function usePreviewMode() {
  const {search} = useLocation();

  return useMemo(() => {
    if (!previewSecret) return false;
    const params = new URLSearchParams(search || "");
    return params.get("preview") === previewSecret;
  }, [search]);
}
