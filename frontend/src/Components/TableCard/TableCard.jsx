import "./TableCard.css";

function TableCard ( { headers = [], data = [] }) {

    return (
        <div className="table-card-container">
            <table>
                <thead>
                    <tr>
                        {headers.map((header, i) => (
                            <th
                                key={i}
                            >
                                { header }
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                        >
                            { headers.map((_, colIndex) => (
                                <td
                                    key={colIndex}
                                >
                                    {Array.isArray(row) ? row[colIndex] : Object.values(row)[colIndex]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableCard;