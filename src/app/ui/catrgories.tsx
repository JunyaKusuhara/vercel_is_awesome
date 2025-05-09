import {fetchCategories} from "../lib/data";

export default async function Categories() {
  const categories = await fetchCategories();
  const data = categories.map(cate => <div className="card" key={cate}><p>{cate}</p></div>);

  return (
    <div>{data}</ div>
  );
}
