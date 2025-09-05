'use client'

interface UserTableProps {
  users: any[];
  schema: any;
  onEdit: (user: any, index: number) => void;
  onDelete: (index: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, schema, onEdit, onDelete }) => {
  const tableFields = schema.fields.filter((f: any) => f.table);

  if (users.length === 0) {
    return <p className="mt-6 text-gray-600">No users found. Add a new one!</p>;
  }

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border text-black border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white">
        <thead className="bg-gray-100">
          <tr>
            {tableFields.map((f: any) => (
              <th key={f.name} className="border p-3 text-left font-semibold text-gray-700">
                {f.label}
              </th>
            ))}
            <th className="border p-3 text-center font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={i} className="hover:bg-gray-50 transition">
              {tableFields.map((f: any) => (
                <td key={f.name} className="border p-3">
                  {user[f.name]}
                </td>
              ))}
              <td className="border p-3 text-center space-x-2">
                <button
                  onClick={() => onEdit(user, i)}
                  className="bg-yellow-400 cursor-pointer hover:bg-yellow-500 text-black px-3 py-1 rounded text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(i)}
                  className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
