'use client'

import { useEffect, useState } from "react";
import UserForm from "@/components/UserForm";
import UserTable from "@/components/UserTable";

export default function HomePage() {
  const [schema, setSchema] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [editData, setEditData] = useState<any>(null);
  const [editIndex, setEditIndex] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const response = await fetch("/schema.json");
        if (!response.ok) {
          throw new Error(`HTTP error! ${response.status}`)
        }
        const data = await response.json();
        setSchema(data);
      }
      catch (error) {
        console.error("Failed to load schema.json:", error);
      }

      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
    }

    fetchSchema();
  }, [])

  const saveUser = (data: any, index?: number) => {
    let updatedUsers = [...users];
    if (index !== undefined) {
      updatedUsers[index] = data;
    } else {
      updatedUsers.push(data);
    }
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setEditData(null);
    setEditIndex(undefined);
  };

  const editUser = (user: any, index: number) => {
    setEditData(user);
    setEditIndex(index);
  };

  const deleteUser = (index: number) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  if (!schema) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl text-center font-bold mb-4">{schema.title}</h1>
      <UserForm schema={schema} onSave={saveUser} editData={editData} editIndex={editIndex} />
      <UserTable users={users} schema={schema} onEdit={editUser} onDelete={deleteUser} />
    </div>
  );
}
