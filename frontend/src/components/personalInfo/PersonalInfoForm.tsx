import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { mockHcmService } from '../../services/mockHcmService';
import { mockSyncService } from '../../services/mockSyncService';
import { PersonalInfo, Conflict } from '../../types';
import ContactDetails from './ContactDetails';
import EmergencyContact from './EmergencyContact';
import BankDetails from './BankDetails';
import CivilStatus from './CivilStatus';
import ConflictResolution from './ConflictResolution';
import Button from '../common/Button';
import { AlertCircle, Save, X, RefreshCw } from 'lucide-react';

const PersonalInfoForm: React.FC = () => {
  const { t } = useTranslation();
  const { state } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [formData, setFormData] = useState<PersonalInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [conflicts, setConflicts] = useState<Conflict[] | null>(null);
  const [syncingToInstances, setSyncingToInstances] = useState(false);

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      if (!state.user || !state.activeInstance) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await mockHcmService.getPersonalInfo(
          state.user.userId,
          state.activeInstance
        );
        setPersonalInfo(data);
        setFormData(data);
      } catch (err) {
        setError(t('errors.failedToLoadPersonalInfo'));
        console.error('Failed to load personal info:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPersonalInfo();
  }, [state.user, state.activeInstance, t]);

  const handleInputChange = (section: string, field: string, value: any) => {
    if (!formData) return;
    
    const updatedFormData = { ...formData };
    
    if (section === 'contactDetails') {
      updatedFormData.contactDetails = {
        ...updatedFormData.contactDetails,
        [field]: value
      };
    } else if (section === 'emergencyContact') {
      updatedFormData.emergencyContact = {
        ...updatedFormData.emergencyContact,
        [field]: value
      };
    } else if (section === 'bankDetails') {
      updatedFormData.bankDetails = {
        ...updatedFormData.bankDetails,
        [field]: value
      };
    }
    
    setFormData(updatedFormData);
    
    if (success) setSuccess(null);
  };

  const handleAddressChange = (field: string, value: string) => {
    if (!formData) return;
    
    setFormData({
      ...formData,
      contactDetails: {
        ...formData.contactDetails,
        address: {
          ...formData.contactDetails.address,
          [field]: value
        }
      }
    });
    
    if (success) setSuccess(null);
  };

  const handleDirectFieldChange = (field: string, value: any) => {
    if (!formData) return;
    
    setFormData({
      ...formData,
      [field]: value
    });
    
    if (success) setSuccess(null);
  };

  const handleSave = async () => {
    if (!state.user || !state.activeInstance || !formData) return;
    
    setSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      const result = await mockHcmService.updatePersonalInfo(
        state.user.userId,
        state.activeInstance,
        formData
      );
      
      if (result.success) {
        setSuccess(t('personalInfo.savedSuccessfully'));
        setPersonalInfo(formData);
      } else {
        setError(t('errors.failedToSavePersonalInfo'));
      }
    } catch (err) {
      setError(t('errors.failedToSavePersonalInfo'));
      console.error('Failed to save personal info:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleSyncToAllInstances = async () => {
    if (!state.user || !formData) return;
    
    setSyncingToInstances(true);
    setError(null);
    setSuccess(null);
    setConflicts(null);
    
    try {
      const result = await mockSyncService.syncToAllInstances(
        state.user.userId,
        'personalInfo',
        formData
      );
      
      if (result.success) {
        setSuccess(t('personalInfo.syncedSuccessfully', { 
          count: result.instancesUpdated.length 
        }));
      } else if (result.conflicts && result.conflicts.length > 0) {
        setConflicts(result.conflicts);
      } else {
        setError(t('errors.failedToSyncPersonalInfo'));
      }
    } catch (err) {
      setError(t('errors.failedToSyncPersonalInfo'));
      console.error('Failed to sync personal info:', err);
    } finally {
      setSyncingToInstances(false);
    }
  };

  const handleResolveConflicts = async (resolutions: Conflict[]) => {
    if (!state.user) return;
    
    setSaving(true);
    setError(null);
    
    try {
      const result = await mockSyncService.resolveConflicts(
        state.user.userId,
        'personalInfo',
        resolutions
      );
      
      if (result.success) {
        setSuccess(t('personalInfo.conflictsResolvedSuccessfully', { 
          count: result.resolvedConflicts 
        }));
        setConflicts(null);
        
        if (state.activeInstance) {
          const data = await mockHcmService.getPersonalInfo(
            state.user.userId,
            state.activeInstance
          );
          setPersonalInfo(data);
          setFormData(data);
        }
      } else {
        setError(t('errors.failedToResolveConflicts'));
      }
    } catch (err) {
      setError(t('errors.failedToResolveConflicts'));
      console.error('Failed to resolve conflicts:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(personalInfo);
    setError(null);
    setSuccess(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2">{t('common.loading')}</span>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
          <span>{t('errors.noPersonalInfoAvailable')}</span>
        </div>
      </div>
    );
  }

  const hasChanges = JSON.stringify(personalInfo) !== JSON.stringify(formData);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          {t('personalInfo.title')}
        </h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={!hasChanges || saving}
          >
            <X size={16} className="mr-1" />
            {t('common.cancel')}
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!hasChanges || saving}
          >
            {saving ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {t('common.saving')}
              </div>
            ) : (
              <>
                <Save size={16} className="mr-1" />
                {t('common.save')}
              </>
            )}
          </Button>
          <Button
            variant="secondary"
            onClick={handleSyncToAllInstances}
            disabled={saving || syncingToInstances}
          >
            {syncingToInstances ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {t('common.syncing')}
              </div>
            ) : (
              <>
                <RefreshCw size={16} className="mr-1" />
                {t('personalInfo.syncToAllInstances')}
              </>
            )}
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
          <div className="flex">
            <div className="h-5 w-5 text-green-400 mr-2">✓</div>
            <span>{success}</span>
          </div>
        </div>
      )}

      {conflicts && conflicts.length > 0 && (
        <ConflictResolution 
          conflicts={conflicts} 
          onResolve={handleResolveConflicts} 
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContactDetails 
          contactDetails={formData.contactDetails} 
          onChange={handleInputChange}
          onAddressChange={handleAddressChange}
        />
        
        <EmergencyContact 
          emergencyContact={formData.emergencyContact} 
          onChange={handleInputChange}
        />
        
        <BankDetails 
          bankDetails={formData.bankDetails} 
          onChange={handleInputChange}
        />
        
        <CivilStatus 
          civilStatus={formData.civilStatus} 
          onChange={handleDirectFieldChange}
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
