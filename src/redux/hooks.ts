import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store"; // Path to your store file

export const useAppDispatch: () => AppDispatch = useDispatch;