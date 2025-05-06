import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { mockApiRouter } from '../services/mockApiRouter';

interface InstanceState {
  currentInstanceId: string | null;
  isMultiInstance: boolean;
}

type InstanceAction = 
  | { type: 'SET_CURRENT_INSTANCE'; payload: string }
  | { type: 'SYNC_WITH_AUTH_INSTANCE'; payload: string | null }
  | { type: 'UPDATE_MULTI_INSTANCE_STATUS'; payload: boolean };

const instanceReducer = (state: InstanceState, action: InstanceAction): InstanceState => {
  switch (action.type) {
    case 'SET_CURRENT_INSTANCE':
      return {
        ...state,
        currentInstanceId: action.payload
      };
    case 'SYNC_WITH_AUTH_INSTANCE':
      return {
        ...state,
        currentInstanceId: action.payload
      };
    case 'UPDATE_MULTI_INSTANCE_STATUS':
      return {
        ...state,
        isMultiInstance: action.payload
      };
    default:
      return state;
  }
};

interface InstanceContextType {
  state: InstanceState;
  setCurrentInstanceId: (instanceId: string) => void;
  getInstanceForRequest: (requestType: string) => Promise<string>;
}

const InstanceContext = createContext<InstanceContextType | undefined>(undefined);

interface InstanceProviderProps {
  children: React.ReactNode;
  initialInstance?: string;
}

export const InstanceProvider: React.FC<InstanceProviderProps> = ({ children, initialInstance }) => {
  const { state: authState, setActiveInstance } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const initialState: InstanceState = {
    currentInstanceId: initialInstance || null,
    isMultiInstance: (authState.user?.instances && authState.user.instances.length > 1) || false
  };
  
  const [state, dispatch] = useReducer(instanceReducer, initialState);
  
  useEffect(() => {
    const isMulti = (authState.user?.instances && authState.user.instances.length > 1) || false;
    dispatch({ type: 'UPDATE_MULTI_INSTANCE_STATUS', payload: isMulti });
  }, [authState.user]);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const instanceParam = params.get('instance');
    
    if (instanceParam && authState.user?.instances?.includes(instanceParam)) {
      if (instanceParam !== state.currentInstanceId) {
        dispatch({ type: 'SET_CURRENT_INSTANCE', payload: instanceParam });
      }
      
      if (instanceParam !== authState.activeInstance) {
        setActiveInstance(instanceParam);
      }
    } else if (authState.activeInstance && authState.activeInstance !== state.currentInstanceId) {
      dispatch({ type: 'SYNC_WITH_AUTH_INSTANCE', payload: authState.activeInstance });
    }
  }, [location.search, authState.user]);
  
  useEffect(() => {
    if (state.currentInstanceId && !location.search.includes(`instance=${state.currentInstanceId}`)) {
      const params = new URLSearchParams(location.search);
      params.set('instance', state.currentInstanceId);
      
      const newUrl = `${location.pathname}?${params.toString()}`;
      navigate(newUrl, { replace: true });
    }
  }, [state.currentInstanceId, location.pathname, location.search, navigate]);
  
  const setCurrentInstanceId = (instanceId: string) => {
    dispatch({ type: 'SET_CURRENT_INSTANCE', payload: instanceId });
  };
  
  const getInstanceForRequest = async (requestType: string): Promise<string> => {
    if (!authState.user) return '';
    
    try {
      const instanceId = await mockApiRouter.getInstanceForRequest(requestType, authState.user.userId);
      return instanceId;
    } catch (error) {
      console.error('Failed to get instance for request:', error);
      return '';
    }
  };
  
  return (
    <InstanceContext.Provider 
      value={{ 
        state, 
        setCurrentInstanceId, 
        getInstanceForRequest
      }}
    >
      {children}
    </InstanceContext.Provider>
  );
};

export const useInstance = () => {
  const context = useContext(InstanceContext);
  if (context === undefined) {
    throw new Error('useInstance must be used within an InstanceProvider');
  }
  return context;
};

export default useInstance;
