import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Document, Payslip } from '../types';
import { mockHcmService } from '../services/mockHcmService';
import { useAuth } from './AuthContext';

interface DocumentsState {
  payslips: Payslip[];
  certificates: Document[];
  contracts: Document[];
  isLoading: {
    payslips: boolean;
    certificates: boolean;
    contracts: boolean;
  };
  errors: {
    payslips: string | null;
    certificates: string | null;
    contracts: string | null;
  };
  filters: {
    instanceId: string | null;
    dateRange: {
      start: Date | null;
      end: Date | null;
    };
  };
}

const initialState: DocumentsState = {
  payslips: [],
  certificates: [],
  contracts: [],
  isLoading: {
    payslips: false,
    certificates: false,
    contracts: false
  },
  errors: {
    payslips: null,
    certificates: null,
    contracts: null
  },
  filters: {
    instanceId: null,
    dateRange: {
      start: null,
      end: null
    }
  }
};

type DocumentsAction =
  | { type: 'FETCH_PAYSLIPS_START' }
  | { type: 'FETCH_PAYSLIPS_SUCCESS'; payload: Payslip[] }
  | { type: 'FETCH_PAYSLIPS_ERROR'; payload: string }
  | { type: 'FETCH_CERTIFICATES_START' }
  | { type: 'FETCH_CERTIFICATES_SUCCESS'; payload: Document[] }
  | { type: 'FETCH_CERTIFICATES_ERROR'; payload: string }
  | { type: 'FETCH_CONTRACTS_START' }
  | { type: 'FETCH_CONTRACTS_SUCCESS'; payload: Document[] }
  | { type: 'FETCH_CONTRACTS_ERROR'; payload: string }
  | { type: 'SET_INSTANCE_FILTER'; payload: string | null }
  | { type: 'SET_DATE_RANGE'; payload: { start: Date | null; end: Date | null } }
  | { type: 'RESET_FILTERS' };

const documentsReducer = (state: DocumentsState, action: DocumentsAction): DocumentsState => {
  switch (action.type) {
    case 'FETCH_PAYSLIPS_START':
      return {
        ...state,
        isLoading: { ...state.isLoading, payslips: true },
        errors: { ...state.errors, payslips: null }
      };
    case 'FETCH_PAYSLIPS_SUCCESS':
      return {
        ...state,
        payslips: action.payload,
        isLoading: { ...state.isLoading, payslips: false }
      };
    case 'FETCH_PAYSLIPS_ERROR':
      return {
        ...state,
        isLoading: { ...state.isLoading, payslips: false },
        errors: { ...state.errors, payslips: action.payload }
      };
    case 'FETCH_CERTIFICATES_START':
      return {
        ...state,
        isLoading: { ...state.isLoading, certificates: true },
        errors: { ...state.errors, certificates: null }
      };
    case 'FETCH_CERTIFICATES_SUCCESS':
      return {
        ...state,
        certificates: action.payload,
        isLoading: { ...state.isLoading, certificates: false }
      };
    case 'FETCH_CERTIFICATES_ERROR':
      return {
        ...state,
        isLoading: { ...state.isLoading, certificates: false },
        errors: { ...state.errors, certificates: action.payload }
      };
    case 'FETCH_CONTRACTS_START':
      return {
        ...state,
        isLoading: { ...state.isLoading, contracts: true },
        errors: { ...state.errors, contracts: null }
      };
    case 'FETCH_CONTRACTS_SUCCESS':
      return {
        ...state,
        contracts: action.payload,
        isLoading: { ...state.isLoading, contracts: false }
      };
    case 'FETCH_CONTRACTS_ERROR':
      return {
        ...state,
        isLoading: { ...state.isLoading, contracts: false },
        errors: { ...state.errors, contracts: action.payload }
      };
    case 'SET_INSTANCE_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          instanceId: action.payload
        }
      };
    case 'SET_DATE_RANGE':
      return {
        ...state,
        filters: {
          ...state.filters,
          dateRange: action.payload
        }
      };
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: {
          instanceId: null,
          dateRange: {
            start: null,
            end: null
          }
        }
      };
    default:
      return state;
  }
};

interface DocumentsContextType {
  state: DocumentsState;
  fetchPayslips: () => Promise<void>;
  fetchCertificates: () => Promise<void>;
  fetchContracts: () => Promise<void>;
  fetchAllDocuments: () => Promise<void>;
  setInstanceFilter: (instanceId: string | null) => void;
  setDateRange: (start: Date | null, end: Date | null) => void;
  resetFilters: () => void;
  getFilteredDocuments: <T extends Document | Payslip>(documents: T[]) => T[];
}

const DocumentsContext = createContext<DocumentsContextType | undefined>(undefined);

export const DocumentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state: authState } = useAuth();
  const [state, dispatch] = useReducer(documentsReducer, initialState);

  const fetchPayslips = async () => {
    if (!authState.user) return;
    
    dispatch({ type: 'FETCH_PAYSLIPS_START' });
    
    try {
      let allPayslips: Payslip[] = [];
      
      if (state.filters.instanceId) {
        const payslips = await mockHcmService.getPayslips(
          authState.user.userId,
          state.filters.instanceId
        );
        allPayslips = payslips;
      } 
      else if (authState.user.instances.length > 0) {
        const payslipPromises = authState.user.instances.map(instanceId => 
          mockHcmService.getPayslips(authState.user!.userId, instanceId)
        );
        
        const payslipsArrays = await Promise.all(payslipPromises);
        allPayslips = payslipsArrays.flat();
      }
      
      dispatch({ type: 'FETCH_PAYSLIPS_SUCCESS', payload: allPayslips });
    } catch (error) {
      console.error('Failed to fetch payslips:', error);
      dispatch({ 
        type: 'FETCH_PAYSLIPS_ERROR', 
        payload: 'Failed to load payslips. Please try again.' 
      });
    }
  };

  const fetchCertificates = async () => {
    if (!authState.user) return;
    
    dispatch({ type: 'FETCH_CERTIFICATES_START' });
    
    try {
      let allCertificates: Document[] = [];
      
      if (state.filters.instanceId) {
        const certificates = await mockHcmService.getDocuments(
          authState.user.userId,
          state.filters.instanceId,
          'certificate'
        );
        allCertificates = certificates;
      } 
      else if (authState.user.instances.length > 0) {
        const certificatePromises = authState.user.instances.map(instanceId => 
          mockHcmService.getDocuments(authState.user!.userId, instanceId, 'certificate')
        );
        
        const certificatesArrays = await Promise.all(certificatePromises);
        allCertificates = certificatesArrays.flat();
      }
      
      dispatch({ type: 'FETCH_CERTIFICATES_SUCCESS', payload: allCertificates });
    } catch (error) {
      console.error('Failed to fetch certificates:', error);
      dispatch({ 
        type: 'FETCH_CERTIFICATES_ERROR', 
        payload: 'Failed to load certificates. Please try again.' 
      });
    }
  };

  const fetchContracts = async () => {
    if (!authState.user) return;
    
    dispatch({ type: 'FETCH_CONTRACTS_START' });
    
    try {
      let allContracts: Document[] = [];
      
      if (state.filters.instanceId) {
        const contracts = await mockHcmService.getDocuments(
          authState.user.userId,
          state.filters.instanceId,
          'contract'
        );
        allContracts = contracts;
      } 
      else if (authState.user.instances.length > 0) {
        const contractPromises = authState.user.instances.map(instanceId => 
          mockHcmService.getDocuments(authState.user!.userId, instanceId, 'contract')
        );
        
        const contractsArrays = await Promise.all(contractPromises);
        allContracts = contractsArrays.flat();
      }
      
      dispatch({ type: 'FETCH_CONTRACTS_SUCCESS', payload: allContracts });
    } catch (error) {
      console.error('Failed to fetch contracts:', error);
      dispatch({ 
        type: 'FETCH_CONTRACTS_ERROR', 
        payload: 'Failed to load contracts. Please try again.' 
      });
    }
  };

  const fetchAllDocuments = async () => {
    await Promise.all([
      fetchPayslips(),
      fetchCertificates(),
      fetchContracts()
    ]);
  };

  const setInstanceFilter = (instanceId: string | null) => {
    dispatch({ type: 'SET_INSTANCE_FILTER', payload: instanceId });
  };

  const setDateRange = (start: Date | null, end: Date | null) => {
    dispatch({ 
      type: 'SET_DATE_RANGE', 
      payload: { start, end } 
    });
  };

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  const getFilteredDocuments = <T extends Document | Payslip>(documents: T[]): T[] => {
    return documents.filter(doc => {
      if (state.filters.instanceId && doc.instanceId !== state.filters.instanceId) {
        return false;
      }
      
      if (state.filters.dateRange.start || state.filters.dateRange.end) {
        const docDate = new Date(doc.date);
        
        if (state.filters.dateRange.start && docDate < state.filters.dateRange.start) {
          return false;
        }
        
        if (state.filters.dateRange.end && docDate > state.filters.dateRange.end) {
          return false;
        }
      }
      
      return true;
    });
  };

  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      fetchAllDocuments();
    }
  }, [authState.user, authState.activeInstance]);

  return (
    <DocumentsContext.Provider
      value={{
        state,
        fetchPayslips,
        fetchCertificates,
        fetchContracts,
        fetchAllDocuments,
        setInstanceFilter,
        setDateRange,
        resetFilters,
        getFilteredDocuments
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};

export const useDocuments = () => {
  const context = useContext(DocumentsContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentsProvider');
  }
  return context;
};
