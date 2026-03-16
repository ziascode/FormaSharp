import dynamic from "next/dynamic";

const templates = {
  page: {
    default: dynamic(() => import("./page")),
  },
  single: {
    default: dynamic(() => import("./single")),
  },
};

export default templates;

