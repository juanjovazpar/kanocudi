import React from 'react';

function Matrix() {
  const columns: any[] = [];
  const rows: {
    values: (
      | string
      | number
      | boolean
      | React.ReactPortal
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | null
      | undefined
    )[];
  }[] = [];

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col"></th>
          {columns.map((item, index) => (
            <th scope="col" key={index}>
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(
          (
            item: {
              values: (
                | string
                | number
                | boolean
                | React.ReactPortal
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | null
                | undefined
              )[];
            },
            index: React.Key | null | undefined
          ) => (
            <th key={index}>
              {item.values.map(
                (
                  value:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined,
                  index: React.Key | null | undefined
                ) => (
                  <td key={index}>{value}</td>
                )
              )}
            </th>
          )
        )}
      </tbody>
    </table>
  );
}

export default Matrix;
