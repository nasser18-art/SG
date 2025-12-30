'use client';

import React, { useEffect, useState } from 'react';

interface User {
  id?: string;
  email: string;
  username?: string;
  fullName?: string;
}

interface DashboardProps {
  user: User;
  handleLogout: () => void;
}

interface Operation {
  id: string;
  date: string;
  type: string;
  amount: number;
  direction: 'debit' | 'credit';
}

export default function Dashboard({ user, handleLogout }: DashboardProps) {
  const [hideBalance, setHideBalance] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [operations, setOperations] = useState<Operation[]>([]);
  const [showActionModal, setShowActionModal] = useState(false);

  useEffect(() => {
    setOperations([
      { id: '1', date: '15/03/2022', type: 'Cinéma - Pathé Dôme', amount: 28.5, direction: 'debit' },
      { id: '2', date: '22/11/2022', type: 'Virement reçu - Employeur', amount: 3200, direction: 'credit' },
      { id: '3', date: '10/05/2019', type: 'Paiement fournisseur', amount: 850, direction: 'debit' },
      { id: '4', date: '03/12/2019', type: 'Virement SEPA', amount: 1500, direction: 'debit' }
    ]);
  }, []);

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(amount);

  const handleActionClick = () => {
    setShowActionModal(true);
  };

  const styles: Record<string, React.CSSProperties> = {
    container: { fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '0 8px' },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      background: 'linear-gradient(135deg, #00965e 0%, #007a4a 100%)',
      color: '#fff',
      flexWrap: 'wrap'
    },
    headerLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
    headerLogo: { height: '36px', width: 'auto' },
    headerTitle: { fontSize: '16px', fontWeight: 700 },
    headerRight: { display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' },
    userInfo: { textAlign: 'right' },
    userName: { fontSize: '13px', fontWeight: 600 },
    userEmail: { fontSize: '11px', opacity: 0.8 },
    logoutBtn: { background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '12px' },
    alertBanner: { backgroundColor: '#c91f16', color: '#fff', padding: '12px', textAlign: 'center', fontWeight: 700, fontSize: '12px', marginTop: '8px' },
    mainContent: { maxWidth: '1000px', margin: '16px auto', padding: '0 8px' },
    sectionTitle: { fontSize: '18px', fontWeight: 700, color: '#1a1a1a', marginBottom: '16px', borderBottom: '2px solid #00965e', display: 'inline-block', paddingBottom: '6px' },
    balanceCard: { background: 'linear-gradient(135deg, #00965e 0%, #006b45 100%)', color: 'white', padding: '24px 16px', borderRadius: '12px', marginBottom: '24px', boxShadow: '0 6px 24px rgba(0,150,94,0.22)' },
    balanceLabel: { fontSize: '12px', opacity: 0.9, marginBottom: '8px', fontWeight: 500 },
    balanceAmount: { fontSize: '36px', fontWeight: 700, marginBottom: '16px' },
    balanceFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', opacity: 0.85 },
    hideBtn: { background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 },
    accountsGrid: { display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '24px' },
    accountCard: { background: '#fff', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
    accountHeader: { padding: '12px 16px', background: '#fafafa', borderBottom: '1px solid #e8e8e8', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    accountName: { fontSize: '14px', fontWeight: 600, marginBottom: '4px' },
    accountIban: { fontSize: '11px', color: '#999', fontFamily: 'Courier New', letterSpacing: '0.5px' },
    accountBalance: { fontSize: '16px', fontWeight: 700, color: '#00965e', textAlign: 'right' },
    cardDisplay: { padding: '16px', minHeight: '200px', background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', color: 'white', borderRadius: '8px', margin: '12px 0' },
    cardLabel: { fontSize: '10px', opacity: 0.7, marginBottom: '12px', letterSpacing: '1px', fontWeight: 600, textTransform: 'uppercase' },
    cardNumber: { fontSize: '20px', letterSpacing: '3px', fontWeight: 700 },
    cardHolderName: { fontSize: '12px', fontWeight: 600 },
    cardExpiryValue: { fontSize: '12px', fontWeight: 700 },
    cardInfo: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding: '12px', background: '#f9f9f9' },
    cardInfoItem: { padding: '8px', background: '#fff', border: '1px solid #e8e8e8', borderRadius: '6px', fontSize: '11px' },
    cardInfoLabel: { color: '#999', marginBottom: '4px', fontWeight: 500 },
    cardInfoValue: { fontSize: '12px', fontWeight: 700, color: '#00965e' },
    transactionsTable: { background: '#fff', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', marginBottom: '24px', fontSize: '12px', overflowX: 'auto' },
    transactionsHeader: { padding: '12px 16px', borderBottom: '1px solid #e8e8e8' },
    transactionsTitle: { fontSize: '14px', fontWeight: 700, color: '#1a1a1a' },
    transactionTable: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' },
    transactionTh: { padding: '12px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#666', background: '#f5f5f5', borderBottom: '1px solid #e0e0e0' },
    transactionTd: { padding: '12px', borderBottom: '1px solid #e8e8e8', fontSize: '12px' },
    transactionDebit: { color: '#c91f16' },
    transactionCredit: { color: '#00965e' },
    actionButtons: { display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '24px' },
    actionBtn: { background: 'linear-gradient(135deg, #00965e 0%, #006b45 100%)', color: '#fff', padding: '12px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 700, textAlign: 'center' },
    modal: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: showActionModal ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
    modalContent: { background: '#fff', padding: '20px 16px', borderRadius: '12px', maxWidth: '400px', width: '90vw', maxHeight: '85vh', overflowY: 'auto' },
    modalTitle: { fontSize: '12px', fontWeight: 700, color: '#c91f16', marginBottom: '8px' },
    modalText: { fontSize: '12px', marginBottom: '8px' },
    modalAmount: { fontSize: '14px', fontWeight: 700, color: '#c91f16', marginBottom: '8px' },
    modalButtons: { display: 'flex', justifyContent: 'space-between', marginTop: '16px', gap: '8px' },
    modalBtnPrimary: { flex: 1, background: '#00965e', color: '#fff', padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' },
    modalBtnSecondary: { flex: 1, background: '#ccc', color: '#333', padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <img src="/bnp-Logo.png" alt="BNP" style={styles.headerLogo} />
          <div style={styles.headerTitle}>La banque d'un monde qui change</div>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.userInfo}>
            <div style={styles.userName}>{user.fullName || 'Client'}</div>
            <div style={styles.userEmail}>{user.email || 'Email'}</div>
          </div>
          <button style={styles.logoutBtn} onClick={handleLogout}>Déconnexion</button>
        </div>
      </div>

      {/* Alert Banner */}
      <div style={styles.alertBanner}>⚠️ COMPTE BLOQUÉ</div>

      {/* Main */}
      <div style={styles.mainContent}>
        <h2 style={styles.sectionTitle}>Bienvenue sur votre espace personnel</h2>
        <div style={styles.balanceCard}>
          <div style={styles.balanceLabel}>Solde Compte Courant</div>
          <div style={styles.balanceAmount}>{hideBalance ? '••••••••' : '920 011,01 €'}</div>
          <div style={styles.balanceFooter}>
            <span>Mis à jour en temps réel</span>
            <button style={styles.hideBtn} onClick={() => setHideBalance(!hideBalance)}>
              {hideBalance ? 'Afficher' : 'Masquer'}
            </button>
          </div>
        </div>

        {/* Accounts */}
        <h2 style={styles.sectionTitle}>Mes Comptes et Cartes</h2>
        <div style={styles.accountsGrid}>
          <div style={styles.accountCard}>
            <div style={styles.accountHeader} onClick={() => setExpandedCard(expandedCard === 'cc' ? null : 'cc')}>
              <div>
                <div style={styles.accountName}>Compte Courant Professionnel</div>
                <div style={styles.accountIban}>FR76 3000 0001 2345 6789 *** 456</div>
              </div>
              <div style={styles.accountBalance}>{hideBalance ? '••••••' : '920 011,01 €'}</div>
            </div>

            {expandedCard === 'cc' && (
              <>
                <div style={styles.cardDisplay}>
                  <div style={styles.cardLabel}>CARTE BANCAIRE</div>
                  <div style={styles.cardNumber}>•••• •••• •••• {String(Math.floor(Math.random() * 10000)).padStart(4,'0')}</div>
                  <div style={styles.cardHolderName}>{user.fullName || 'CLIENT'}</div>
                  <div style={styles.cardExpiryValue}>12/27</div>
                </div>
                <div style={styles.cardInfo}>
                  <div style={styles.cardInfoItem}>
                    <div style={styles.cardInfoLabel}>Limite crédit</div>
                    <div style={styles.cardInfoValue}>50 000,00 €</div>
                  </div>
                  <div style={styles.cardInfoItem}>
                    <div style={styles.cardInfoLabel}>Utilisé</div>
                    <div style={styles.cardInfoValue}>8 750,25 €</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Transactions */}
        <h2 style={styles.sectionTitle}>Dernières Opérations</h2>
        <div style={styles.transactionsTable}>
          <div style={styles.transactionsHeader}><div style={styles.transactionsTitle}>Historique des Transactions</div></div>
          <table style={styles.transactionTable}>
            <thead>
              <tr>
                <th style={styles.transactionTh}>Date</th>
                <th style={styles.transactionTh}>Type d'opération</th>
                <th style={styles.transactionTh}>Montant</th>
              </tr>
            </thead>
            <tbody>
              {operations.map(op => (
                <tr key={op.id}>
                  <td style={{...styles.transactionTd, ...(op.direction==='debit'?styles.transactionDebit:styles.transactionCredit)}}>{op.date}</td>
                  <td style={styles.transactionTd}>{op.type}</td>
                  <td style={{...styles.transactionTd, textAlign:'right', ...(op.direction==='debit'?styles.transactionDebit:styles.transactionCredit)}}>{op.direction==='debit'?'−': '+'}{formatAmount(op.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Actions */}
        <h2 style={styles.sectionTitle}>Actions Rapides</h2>
        <div style={styles.actionButtons}>
          <button style={styles.actionBtn} onClick={handleActionClick}>Faire un virement</button>
          <button style={styles.actionBtn} onClick={handleActionClick}>Consulter mes épargnes</button>
          <button style={styles.actionBtn} onClick={handleActionClick}>Gérer mes tiers</button>
          <button style={styles.actionBtn} onClick={handleActionClick}>Contacter support</button>
        </div>
      </div>

      {/* Action Modal */}
      <div style={styles.modal} onClick={() => setShowActionModal(false)}>
        <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
          <div style={styles.modalTitle}>⚠️ ACTION IMPOSSIBLE</div>
          <p style={styles.modalText}>Votre compte fait l'objet d'une suspension temporaire des opérations sortantes (virements, paiements et retraits).</p>
          <p style={styles.modalText}>En application de la réglementation bancaire en vigueur, une régularisation est nécessaire pour rétablir l'accès total à vos services.</p>
          <div style={styles.modalAmount}>Montant à régler : 34 011,21 €</div>
          <p style={styles.modalText}>Détails :</p>
          <ul style={{ fontSize: '12px', marginLeft: '16px', marginBottom: '8px' }}>
            <li>Frais de mise en conformité internationale</li>
            <li>Droits de mainlevée sur fonds restreints</li>
            <li>Taxe de régularisation de compte dormant</li>
          </ul>
          <div style={styles.modalButtons}>
            <button style={styles.modalBtnPrimary} onClick={() => alert('Paiement initié !')}>Régler maintenant</button>
            <button style={styles.modalBtnSecondary} onClick={() => setShowActionModal(false)}>Fermer</button>
          </div>
        </div>
      </div>
    </div>
  );
}
