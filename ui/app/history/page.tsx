'use client'
import { useEffect, useState, useContext, FormEvent } from "react";
import {HeaderContext} from "@/app/context/header-context";

export interface Expression {
  id: number;
  expression: string;
  created: string; // returned as ISO string
}

export default function History() {
  const {setTitle, setDescription} = useContext(HeaderContext);

  // Trigger on component mount
  useEffect(() => {
    setTitle('History');
    setDescription('Latest facial expressions from db');
  }, []);

  const [expressions, setExpressions] = useState<Expression[]>([]);
  const [expressionInput, setExpressionInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch expressions
  const fetchExpressions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/expressions");
      const data: Expression[] = await res.json();
      setExpressions(data);
    } catch (err) {
      console.error("Failed to fetch expressions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpressions();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {expressions.map((exp) => (
            <li key={exp.id}>
              {exp.expression} - {new Date(exp.created).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}