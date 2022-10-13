import { useLocation } from "react-router-dom";

export default function useCurrentPath() {
  const location = useLocation();
  if (location.state) {
    return [location.state.id, location.state.title];
  }
  return "";
}
