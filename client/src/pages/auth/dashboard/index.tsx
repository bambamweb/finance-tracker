import {FinancialRecordForm} from "./financial-record-form";
import {FinancialRecordList} from "./financial-record-list";
import {useUser} from "@clerk/clerk-react";
export const Dashboard = () => {
    const {user} = useUser();
    return (
    <div className="dashboard-container">
         <h1> Welcome {user?.firstName}! Here Are Your Finances</h1>
         <FinancialRecordForm/>
         <FinancialRecordList/>
         </div>
    );    
};