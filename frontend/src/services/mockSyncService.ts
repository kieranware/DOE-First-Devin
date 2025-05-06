import { SyncResult, Conflict, ResolutionResult } from '../types';

const mockConflicts: Record<string, Record<string, Conflict[]>> = {
  'user-123': {
    'personalInfo': [
      {
        id: 'conflict-1',
        instanceId: 'primary',
        field: 'contactDetails.phone',
        currentValue: '087-123-4567',
        newValue: '087-123-9999'
      },
      {
        id: 'conflict-2',
        instanceId: 'post-primary',
        field: 'contactDetails.email',
        currentValue: 'sarah.oconnor@education.ie',
        newValue: 'sarah.oconnor@gmail.com'
      }
    ]
  }
};

class MockSyncService {
  async syncToAllInstances(userId: string, dataType: string, data: any): Promise<SyncResult> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`Syncing ${dataType} data for user ${userId}:`, data);
    
    const conflicts = this.getConflictsForUser(userId, dataType);
    
    if (conflicts && conflicts.length > 0) {
      return {
        success: false,
        instancesUpdated: [],
        conflicts
      };
    }
    
    return {
      success: true,
      instancesUpdated: ['primary', 'post-primary', 'non-teaching', 'pensioners'].filter(instance => 
        (userId === 'user-123' && (instance === 'primary' || instance === 'post-primary')) ||
        (userId === 'user-456' && instance === 'non-teaching') ||
        (userId === 'user-789' && instance === 'pensioners')
      )
    };
  }

  async resolveConflicts(userId: string, dataType: string, resolutions: Conflict[]): Promise<ResolutionResult> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    console.log(`Resolving conflicts for ${dataType} data for user ${userId}:`, resolutions);
    
    const conflicts = this.getConflictsForUser(userId, dataType);
    
    if (!conflicts || conflicts.length === 0) {
      return {
        success: false,
        resolvedConflicts: 0,
        failedResolutions: [{
          instanceId: 'unknown',
          field: 'unknown',
          reason: 'No conflicts found to resolve'
        }]
      };
    }
    
    
    if (mockConflicts[userId] && mockConflicts[userId][dataType]) {
      delete mockConflicts[userId][dataType];
    }
    
    return {
      success: true,
      resolvedConflicts: conflicts.length
    };
  }

  private getConflictsForUser(userId: string, dataType: string): Conflict[] | undefined {
    if (mockConflicts[userId] && mockConflicts[userId][dataType]) {
      return mockConflicts[userId][dataType];
    }
    
    return undefined;
  }
}

export const mockSyncService = new MockSyncService();
