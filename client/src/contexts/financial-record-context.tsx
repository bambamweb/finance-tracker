import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

export interface FinancialRecord {
  _id?: string;
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

interface FinancialRecordsContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
  updateRecord: (id: string, newRecord: FinancialRecord) => void;
  deleteRecord: (id: string) => void;
  loading: boolean;
  error: string | null;
}

export const FinancialRecordsContext = createContext<
  FinancialRecordsContextType | undefined
>(undefined);

export const FinancialRecordsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  const fetchRecords = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/financial-records/getAllByUserID/${user.id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const records = await response.json();
      setRecords(records);
    } catch (err) {
      setError("Failed to fetch records");
      console.error("Error fetching records:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const addRecord = async (record: FinancialRecord) => {
    if (!user) {
      console.error('User is not defined');
      return;
    }
  
    try {
      const recordWithUserId = {
        ...record,
        userId: user.id,
      };
  
      console.log('Sending payload:', recordWithUserId); // Log the payload
  
      const response = await fetch('http://localhost:3000/financial-records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recordWithUserId),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json(); // Log the error response
        console.error('Error response:', errorResponse);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const newRecord = await response.json();
      setRecords((prev) => [...prev, newRecord]);
    } catch (err) {
      console.error('Error adding record:', err);
      if (err instanceof Error) {
        console.error('Error details:', err.message);
      }
    }
  };

  

  const updateRecord = async (id: string, newRecord: FinancialRecord) => {
    try {
      const response = await fetch(
        `http://localhost:3000/financial-records/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(newRecord),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedRecord = await response.json();
      setRecords((prev) =>
        prev.map((record) => (record._id === id ? updatedRecord : record))
      );
    } catch (err) {
      console.error("Error updating record:", err);
    }
  };

  const deleteRecord = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/financial-records/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const deletedRecord = await response.json();
      setRecords((prev) => prev.filter((record) => record._id !== deletedRecord._id));
    } catch (err) {
      console.error("Error deleting record:", err);
    }
  };

  return (
    <FinancialRecordsContext.Provider
      value={{ records, addRecord, updateRecord, deleteRecord, loading, error }}
    >
      {children}
    </FinancialRecordsContext.Provider>
  );
};

export const useFinancialRecords = () => {
  const context = useContext<FinancialRecordsContextType | undefined>(
    FinancialRecordsContext
  );

  if (!context) {
    throw new Error(
      "useFinancialRecords must be used within a FinancialRecordsProvider"
    );
  }

  return context;
};