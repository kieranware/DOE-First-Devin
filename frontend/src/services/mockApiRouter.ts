import { ApiRequest, ApiResponse, InstanceAccess } from '../types';

const mockInstanceAccess: Record<string, InstanceAccess[]> = {
  'user-123': [
    {
      instanceId: 'primary',
      instanceName: 'Primary',
      hasAccess: true,
      isPrimary: false
    },
    {
      instanceId: 'post-primary',
      instanceName: 'Post Primary',
      hasAccess: true,
      isPrimary: true
    },
    {
      instanceId: 'non-teaching',
      instanceName: 'Non Teaching Staff',
      hasAccess: false,
      isPrimary: false
    },
    {
      instanceId: 'pensioners',
      instanceName: 'Pensioners',
      hasAccess: false,
      isPrimary: false
    }
  ],
  'user-456': [
    {
      instanceId: 'primary',
      instanceName: 'Primary',
      hasAccess: false,
      isPrimary: false
    },
    {
      instanceId: 'post-primary',
      instanceName: 'Post Primary',
      hasAccess: false,
      isPrimary: false
    },
    {
      instanceId: 'non-teaching',
      instanceName: 'Non Teaching Staff',
      hasAccess: true,
      isPrimary: true
    },
    {
      instanceId: 'pensioners',
      instanceName: 'Pensioners',
      hasAccess: false,
      isPrimary: false
    }
  ],
  'user-789': [
    {
      instanceId: 'primary',
      instanceName: 'Primary',
      hasAccess: false,
      isPrimary: false
    },
    {
      instanceId: 'post-primary',
      instanceName: 'Post Primary',
      hasAccess: false,
      isPrimary: false
    },
    {
      instanceId: 'non-teaching',
      instanceName: 'Non Teaching Staff',
      hasAccess: false,
      isPrimary: false
    },
    {
      instanceId: 'pensioners',
      instanceName: 'Pensioners',
      hasAccess: true,
      isPrimary: true
    }
  ]
};

const routingRules: Record<string, (userId: string) => string> = {
  'getPersonalInfo': (userId: string) => {
    const instances = mockInstanceAccess[userId] || [];
    const primaryInstance = instances.find(instance => instance.isPrimary && instance.hasAccess);
    return primaryInstance ? primaryInstance.instanceId : '';
  },
  'updatePersonalInfo': (userId: string) => {
    const instances = mockInstanceAccess[userId] || [];
    const primaryInstance = instances.find(instance => instance.isPrimary && instance.hasAccess);
    return primaryInstance ? primaryInstance.instanceId : '';
  },
  'getDocuments': (userId: string) => {
    const instances = mockInstanceAccess[userId] || [];
    const primaryInstance = instances.find(instance => instance.isPrimary && instance.hasAccess);
    return primaryInstance ? primaryInstance.instanceId : '';
  },
  'getPayslips': (userId: string) => {
    const instances = mockInstanceAccess[userId] || [];
    const primaryInstance = instances.find(instance => instance.isPrimary && instance.hasAccess);
    return primaryInstance ? primaryInstance.instanceId : '';
  }
};

class MockApiRouter {
  async routeRequest(request: ApiRequest): Promise<ApiResponse> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const { type, userId, data } = request;
    
    const instanceId = await this.getInstanceForRequest(type, userId);
    
    if (!instanceId) {
      return {
        success: false,
        data: null,
        error: 'No suitable instance found for this request'
      };
    }
    
    return {
      success: true,
      data: {
        instanceId,
        requestType: type,
        timestamp: new Date().toISOString(),
        ...data
      }
    };
  }

  async getInstanceForRequest(requestType: string, userId: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const routingRule = routingRules[requestType];
    
    if (!routingRule) {
      return '';
    }
    
    return routingRule(userId);
  }

  async getMultiInstanceStatus(userId: string): Promise<InstanceAccess[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return mockInstanceAccess[userId] || [];
  }
}

export const mockApiRouter = new MockApiRouter();
