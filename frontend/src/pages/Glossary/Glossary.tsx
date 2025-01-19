import useFetchGlossaryTerms from "../../api/useFetchGlossaryTerms.ts";

import "./Glossary.css";

export default function Glossary() {
  const { data, isLoading, isError } = useFetchGlossaryTerms();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !data) {
    return <p>Error</p>;
  }

  return (
    <div className="p-4 grid grid-cols-glossary gap-4">
      {data.map((d) => (
        <div className="card bg-base-100 drop-shadow-md" key={d.id}>
          <div className="card-body">
            <h2 className="card-title">{d.title}</h2>
            <p>{d.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
