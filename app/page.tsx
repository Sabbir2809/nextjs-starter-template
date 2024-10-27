"use client"
import { toast } from "react-toastify";

export default function HomePage() {
  return <div>Home Page

    <button onClick={() => toast.success("success")}>CLICK</button>
  </div>;
}
