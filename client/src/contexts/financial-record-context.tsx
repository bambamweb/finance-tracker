/* eslint-disable @typescript-eslint/no-unused-vars */
import {  createContext, useContext, useEffect, useState } from "react";
import { useUser } from '@clerk/clerk-react';

 export interface FinancialRecord {
    _id?: string;
    userID: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    paymentMethod: string;
}

interface FinancialRecordsContextType {
    records: FinancialRecord[];
    addRecord: (record: FinancialRecord) => void;
    updateRecord: (id: string, newRecord: FinancialRecord)=> void;
    deleteRecord:(id: string) =>void;
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
    const { user } = useUser();

    const fetchRecords = async () => {
        if (!user) return;

        try {
            const response = await fetch(
                `http://localhost:3001/financial-records/getAllByUserID/${user.id}`
            );

            if (response.ok) {
                const records = await response.json();
                console.log("Fetched records:", records);
                setRecords(records);
            } else {
                console.error(`Failed to fetch records. Status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error fetching records:", error);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, [user]);

    const addRecord = async (record: FinancialRecord) => {
        try {
            const response = await fetch("http://localhost:3001/financial-records", {
                method: "POST",
                body: JSON.stringify(record),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const newRecord = await response.json();
                setRecords((prev) => [...prev, newRecord]);
            } else {
                console.error("Failed to add record:", response.statusText);
            }
        } catch (error) {
            console.error("Error adding record:", error);
        }
    };
    const updateRecord = async (id: string , newRecord: FinancialRecord) => {
        
            const response = await fetch(`http://localhost:3001/financial-records/${id}`, {
                method: "PUT",
                body: JSON.stringify(newRecord),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            try {

            if (response.ok) {
                const newRecord = await response.json();
                setRecords((prev) => prev.map((record) => {
                    if (record._id === id){
                        return newRecord;
                    }else {
                        return record;
                    }
                })
            );
            } 
            
        } catch (error) {}
    };
    const deleteRecord = async (id: string) => {
        
                const response = await fetch(
                    `http://localhost:3001/financial-records/${id}`, 
                    {
                    method: "DELETE",
                   
                    },

                );
                try{
    
                if (response.ok) {
                    const deleteRecord = await response.json();
                    setRecords((prev) => prev.filter((record) => record._id !== deleteRecord._id)
                );
                } 
            } catch (err) {}
            };
    return (
        <FinancialRecordsContext.Provider value={{ records, addRecord,updateRecord,deleteRecord }}>
            {children}
        </FinancialRecordsContext.Provider>
    );
};

export const useFinancialRecords = () => {
    const context = useContext<FinancialRecordsContextType | undefined>(FinancialRecordsContext);
    
    if (!context) {
        throw new Error("useFinancialRecords must be used within a FinancialRecordsProvider");
    }

    return context;
};
