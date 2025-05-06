import React, { createContext, useContext, useReducer } from 'react';
import { PersonalInfo, Conflict } from '../types';
import { mockHcmService } from '../services/mockHcmService';
import { mockSyncService } from '../services/mockSyncService';
import { useAuth } from './AuthContext';

interface PersonalInfoState {
  personalInfo: PersonalInfo | null;
  isLoading: boolean;
  isEditing: boolean;
  isSaving: boolean;
  isSyncing: boolean;
  hasChanges: boolean;
  errors: Record<string, string>;
  conflicts: Conflict[];
  showConflicts: boolean;
}

const initialState: PersonalInfoState = {
  personalInfo: null,
  isLoading: false,
  isEditing: false,
  isSaving: false,
  isSyncing: false,
  hasChanges: false,
  errors: {},
  conflicts: [],
  showConflicts: false
};

type PersonalInfoAction =
  | { type: 'FETCH_INFO_START' }
  | { type: 'FETCH_INFO_SUCCESS'; payload: PersonalInfo }
  | { type: 'FETCH_INFO_ERROR'; payload: string }
  | { type: 'SET_EDITING'; payload: boolean }
  | { type: 'UPDATE_FIELD'; payload: { field: string; value: any } }
  | { type: 'SAVE_START' }
  | { type: 'SAVE_SUCCESS'; payload: PersonalInfo }
  | { type: 'SAVE_ERROR'; payload: Record<string, string> }
  | { type: 'SYNC_START' }
  | { type: 'SYNC_SUCCESS' }
  | { type: 'SYNC_ERROR'; payload: string }
  | { type: 'SET_CONFLICTS'; payload: Conflict[] }
  | { type: 'SHOW_CONFLICTS'; payload: boolean }
  | { type: 'RESOLVE_CONFLICT'; payload: { conflictId: string; resolution: 'current' | 'new' } }
  | { type: 'RESET_FORM' };

const personalInfoReducer = (state: PersonalInfoState, action: PersonalInfoAction): PersonalInfoState => {
  switch (action.type) {
    case 'FETCH_INFO_START':
      return {
        ...state,
        isLoading: true
      };
    case 'FETCH_INFO_SUCCESS':
      return {
        ...state,
        personalInfo: action.payload,
        isLoading: false,
        hasChanges: false
      };
    case 'FETCH_INFO_ERROR':
      return {
        ...state,
        isLoading: false,
        errors: { global: action.payload }
      };
    case 'SET_EDITING':
      return {
        ...state,
        isEditing: action.payload,
        hasChanges: action.payload ? state.hasChanges : false
      };
    case 'UPDATE_FIELD':
      if (!state.personalInfo) return state;
      
      const updatedInfo = {
        ...state.personalInfo,
        [action.payload.field]: action.payload.value
      };
      
      return {
        ...state,
        personalInfo: updatedInfo,
        hasChanges: true,
        errors: {
          ...state.errors,
          [action.payload.field]: '' // Clear field-specific error
        }
      };
    case 'SAVE_START':
      return {
        ...state,
        isSaving: true,
        errors: {}
      };
    case 'SAVE_SUCCESS':
      return {
        ...state,
        personalInfo: action.payload,
        isSaving: false,
        hasChanges: false,
        isEditing: false
      };
    case 'SAVE_ERROR':
      return {
        ...state,
        isSaving: false,
        errors: action.payload
      };
    case 'SYNC_START':
      return {
        ...state,
        isSyncing: true
      };
    case 'SYNC_SUCCESS':
      return {
        ...state,
        isSyncing: false,
        showConflicts: false
      };
    case 'SYNC_ERROR':
      return {
        ...state,
        isSyncing: false,
        errors: { ...state.errors, sync: action.payload }
      };
    case 'SET_CONFLICTS':
      return {
        ...state,
        conflicts: action.payload,
        showConflicts: action.payload.length > 0
      };
    case 'SHOW_CONFLICTS':
      return {
        ...state,
        showConflicts: action.payload
      };
    case 'RESOLVE_CONFLICT':
      const updatedConflicts = state.conflicts.map(conflict => {
        if (conflict.id === action.payload.conflictId) {
          return {
            ...conflict,
            resolution: action.payload.resolution
          };
        }
        return conflict;
      });
      
      return {
        ...state,
        conflicts: updatedConflicts
      };
    case 'RESET_FORM':
      return {
        ...initialState,
        personalInfo: state.personalInfo
      };
    default:
      return state;
  }
};

interface PersonalInfoContextType {
  state: PersonalInfoState;
  fetchPersonalInfo: () => Promise<void>;
  updateField: (field: string, value: any) => void;
  setEditing: (isEditing: boolean) => void;
  savePersonalInfo: () => Promise<void>;
  syncToAllInstances: () => Promise<void>;
  resolveConflict: (conflictId: string, resolution: 'current' | 'new') => void;
  resolveAllConflicts: () => Promise<void>;
  resetForm: () => void;
}

const PersonalInfoContext = createContext<PersonalInfoContextType | undefined>(undefined);

export const PersonalInfoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state: authState } = useAuth();
  const [state, dispatch] = useReducer(personalInfoReducer, initialState);

  const fetchPersonalInfo = async () => {
    if (!authState.user || !authState.activeInstance) return;
    
    dispatch({ type: 'FETCH_INFO_START' });
    
    try {
      const personalInfo = await mockHcmService.getPersonalInfo(
        authState.user.userId,
        authState.activeInstance
      );
      
      dispatch({ type: 'FETCH_INFO_SUCCESS', payload: personalInfo });
    } catch (error) {
      console.error('Failed to fetch personal info:', error);
      dispatch({ 
        type: 'FETCH_INFO_ERROR', 
        payload: 'Failed to load personal information. Please try again.' 
      });
    }
  };

  const updateField = (field: string, value: any) => {
    dispatch({ type: 'UPDATE_FIELD', payload: { field, value } });
  };

  const setEditing = (isEditing: boolean) => {
    dispatch({ type: 'SET_EDITING', payload: isEditing });
  };

  const savePersonalInfo = async () => {
    if (!authState.user || !authState.activeInstance || !state.personalInfo) return;
    
    dispatch({ type: 'SAVE_START' });
    
    try {
      const result = await mockHcmService.updatePersonalInfo(
        authState.user.userId,
        authState.activeInstance,
        state.personalInfo
      );
      
      if (result.success) {
        dispatch({ type: 'SAVE_SUCCESS', payload: state.personalInfo });
      } else {
        dispatch({ type: 'SAVE_ERROR', payload: result.errors || { global: 'Failed to save changes' } });
      }
    } catch (error) {
      console.error('Failed to save personal info:', error);
      dispatch({ 
        type: 'SAVE_ERROR', 
        payload: { global: 'An unexpected error occurred. Please try again.' } 
      });
    }
  };

  const syncToAllInstances = async () => {
    if (!authState.user || !state.personalInfo) return;
    
    dispatch({ type: 'SYNC_START' });
    
    try {
      const result = await mockSyncService.syncToAllInstances(
        authState.user.userId,
        'personalInfo',
        state.personalInfo
      );
      
      if (result.success) {
        dispatch({ type: 'SYNC_SUCCESS' });
      } else if (result.conflicts && result.conflicts.length > 0) {
        dispatch({ type: 'SET_CONFLICTS', payload: result.conflicts });
      } else {
        dispatch({ 
          type: 'SYNC_ERROR', 
          payload: 'Failed to sync information to all instances.' 
        });
      }
    } catch (error) {
      console.error('Failed to sync to all instances:', error);
      dispatch({ 
        type: 'SYNC_ERROR', 
        payload: 'An unexpected error occurred during synchronization.' 
      });
    }
  };

  const resolveConflict = (conflictId: string, resolution: 'current' | 'new') => {
    dispatch({ 
      type: 'RESOLVE_CONFLICT', 
      payload: { conflictId, resolution } 
    });
  };

  const resolveAllConflicts = async () => {
    if (!authState.user || !state.conflicts.length) return;
    
    dispatch({ type: 'SYNC_START' });
    
    try {
      const result = await mockSyncService.resolveConflicts(
        authState.user.userId,
        'personalInfo',
        state.conflicts
      );
      
      if (result.success) {
        dispatch({ type: 'SYNC_SUCCESS' });
      } else {
        dispatch({ 
          type: 'SYNC_ERROR', 
          payload: 'Failed to resolve conflicts.' 
        });
      }
    } catch (error) {
      console.error('Failed to resolve conflicts:', error);
      dispatch({ 
        type: 'SYNC_ERROR', 
        payload: 'An unexpected error occurred while resolving conflicts.' 
      });
    }
  };

  const resetForm = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  return (
    <PersonalInfoContext.Provider
      value={{
        state,
        fetchPersonalInfo,
        updateField,
        setEditing,
        savePersonalInfo,
        syncToAllInstances,
        resolveConflict,
        resolveAllConflicts,
        resetForm
      }}
    >
      {children}
    </PersonalInfoContext.Provider>
  );
};

export const usePersonalInfo = () => {
  const context = useContext(PersonalInfoContext);
  if (context === undefined) {
    throw new Error('usePersonalInfo must be used within a PersonalInfoProvider');
  }
  return context;
};
