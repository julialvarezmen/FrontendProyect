// src/pages/Dashboard.tsx
import React, { useState } from "react";
import { useUserDashboard } from "../hooks/useUserDashboard";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import MetricsCards from "../components/dashboard/MetricsCards";
import UserInfoCard from "../components/dashboard/UserInfoCard";
import AccountsCard from "../components/dashboard/AccountsCard";
import TransactionsTable from "../components/dashboard/TransactionsTable";
import QuickActions from "../components/dashboard/QuickActions";
import DepositModal from "../components/dashboard/DepositModal";
import WithdrawModal from "../components/dashboard/WithdrawModal";
import TransferModal from "../components/dashboard/TransferModal";
import CreateAccountModal from "../components/dashboard/CreateAccountModal";
import AccountDetailsModal from "../components/dashboard/AccountDetailsModal";
import { Account } from "../types";

const Dashboard: React.FC = () => {
  const { user, accounts, transactions, loading, error, totalBalance, refetchData } = useUserDashboard();
  
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [showAccountDetailsModal, setShowAccountDetailsModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const handleAccountClick = (account: Account) => {
    setSelectedAccount(account);
    setShowAccountDetailsModal(true);
  };

  const handleCloseAccountDetails = () => {
    setShowAccountDetailsModal(false);
    setSelectedAccount(null);
  };

  const handleTransactionSuccess = () => {
    // Reload data after successful transaction
    refetchData();
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("userDni");
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="container mt-5">
        <ErrorMessage message={error || "Error al cargar los datos"} />
        <button className="btn btn-warning mt-3" onClick={handleLogout}>
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div
      className="container py-4"
      style={{
        backgroundColor: "#FAFAFA",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        color: "#1F2937",
      }}
    >
      <DashboardHeader user={user} onLogout={handleLogout} />

      <MetricsCards 
        totalBalance={totalBalance}
        accountCount={accounts.length}
        transactionCount={transactions.length}
      />

      <QuickActions 
        onDeposit={() => setShowDepositModal(true)}
        onWithdraw={() => setShowWithdrawModal(true)}
        onTransfer={() => setShowTransferModal(true)}
        onCreateAccount={() => setShowCreateAccountModal(true)}
        hasAccounts={accounts.length > 0}
      />

      <div className="row">
        <div className="col-md-4 mb-4">
          <UserInfoCard user={user} />
        </div>
        <div className="col-md-8 mb-4">
          <AccountsCard accounts={accounts} onAccountClick={handleAccountClick} />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <TransactionsTable transactions={transactions} accounts={accounts} />
        </div>
      </div>

      {/* Modals */}
      <DepositModal 
        show={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        accounts={accounts}
        onSuccess={handleTransactionSuccess}
      />
      
      <WithdrawModal 
        show={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        accounts={accounts}
        onSuccess={handleTransactionSuccess}
      />
      
      <TransferModal 
        show={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        accounts={accounts}
        onSuccess={handleTransactionSuccess}
      />
      
      <CreateAccountModal 
        show={showCreateAccountModal}
        onClose={() => setShowCreateAccountModal(false)}
        userId={user.id}
        onSuccess={handleTransactionSuccess}
      />
      
      <AccountDetailsModal 
        show={showAccountDetailsModal}
        onClose={handleCloseAccountDetails}
        account={selectedAccount}
        transactions={transactions}
      />
    </div>
  );
};

export default Dashboard;
