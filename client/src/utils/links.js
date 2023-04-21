import { BsFillGridFill } from "react-icons/bs";
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { MdSettings } from 'react-icons/md'
import { FiUploadCloud } from "react-icons/fi";

const links = [
  { id: 1, text: "dashboard", path: "/demo", icon: <BsFillGridFill /> },
  { id: 2, text: "statements", path: "statements", icon: <FaWpforms /> },
  { id: 3, text: "reports", path: "reports", icon: <MdQueryStats /> },
  { id: 4, text: "uploads", path: "uploads", icon: <FiUploadCloud /> },
  { id: 5, text: "settings", path: "settings", icon: <MdSettings /> },
];

export default links
