import { PersonalInfo, Document, Payslip, TimeFrame, UpdateResult } from '../types';

const mockPersonalData: Record<string, Record<string, PersonalInfo>> = {
  'user-123': {
    'primary': {
      userId: 'user-123',
      fullName: 'Sarah O\'Connor',
      staffId: 'EDU-2023-74891',
      schoolAssignment: 'St. Patrick\'s Secondary School',
      contactDetails: {
        email: 'sarah.oconnor@education.ie',
        phone: '087-123-4567',
        address: {
          line1: '15 Oak Avenue',
          line2: 'Blackrock',
          city: 'Dublin',
          county: 'Dublin',
          eircode: 'A94 D2P7'
        }
      },
      emergencyContact: {
        name: 'John O\'Connor',
        relationship: 'Spouse',
        phone: '087-765-4321'
      },
      bankDetails: {
        accountName: 'Sarah O\'Connor',
        iban: 'IE29AIBK93115212345678',
        bic: 'AIBKIE2D'
      },
      civilStatus: 'Married'
    },
    'post-primary': {
      userId: 'user-123',
      fullName: 'Sarah O\'Connor',
      staffId: 'EDU-2023-74891',
      schoolAssignment: 'St. Patrick\'s Secondary School',
      contactDetails: {
        email: 'sarah.oconnor@education.ie',
        phone: '087-123-4567',
        address: {
          line1: '15 Oak Avenue',
          line2: 'Blackrock',
          city: 'Dublin',
          county: 'Dublin',
          eircode: 'A94 D2P7'
        }
      },
      emergencyContact: {
        name: 'John O\'Connor',
        relationship: 'Spouse',
        phone: '087-765-4321'
      },
      bankDetails: {
        accountName: 'Sarah O\'Connor',
        iban: 'IE29AIBK93115212345678',
        bic: 'AIBKIE2D'
      },
      civilStatus: 'Married'
    }
  },
  'user-456': {
    'non-teaching': {
      userId: 'user-456',
      fullName: 'Michael Murphy',
      staffId: 'EDU-2023-85642',
      schoolAssignment: 'Regional Education Center',
      contactDetails: {
        email: 'michael.murphy@education.ie',
        phone: '086-555-7890',
        address: {
          line1: '42 Willow Road',
          city: 'Galway',
          county: 'Galway',
          eircode: 'H91 FT72'
        }
      },
      emergencyContact: {
        name: 'Emma Murphy',
        relationship: 'Daughter',
        phone: '086-555-7891'
      },
      bankDetails: {
        accountName: 'Michael Murphy',
        iban: 'IE29BOFI93115287654321',
        bic: 'BOFIIE2D'
      },
      civilStatus: 'Widowed'
    }
  },
  'user-789': {
    'pensioners': {
      userId: 'user-789',
      fullName: 'Mary Kelly',
      staffId: 'EDU-2010-12345',
      schoolAssignment: 'Retired',
      contactDetails: {
        email: 'mary.kelly@retired.education.ie',
        phone: '085-999-1234',
        address: {
          line1: '8 Maple Court',
          city: 'Cork',
          county: 'Cork',
          eircode: 'T12 XY45'
        }
      },
      emergencyContact: {
        name: 'Patrick Kelly',
        relationship: 'Son',
        phone: '085-999-5678'
      },
      bankDetails: {
        accountName: 'Mary Kelly',
        iban: 'IE29AIBK93115298765432',
        bic: 'AIBKIE2D'
      },
      civilStatus: 'Widowed'
    }
  }
};

const mockDocuments: Record<string, Record<string, Document[]>> = {
  'user-123': {
    'primary': [
      {
        id: 'doc-001',
        userId: 'user-123',
        instanceId: 'primary',
        type: 'certificate',
        title: 'Teaching Qualification Certificate',
        date: '2023-01-15',
        url: '/mock-documents/certificate-001.pdf'
      },
      {
        id: 'doc-002',
        userId: 'user-123',
        instanceId: 'primary',
        type: 'contract',
        title: 'Employment Contract',
        date: '2023-02-01',
        url: '/mock-documents/contract-001.pdf'
      }
    ],
    'post-primary': [
      {
        id: 'doc-003',
        userId: 'user-123',
        instanceId: 'post-primary',
        type: 'certificate',
        title: 'Subject Specialization Certificate',
        date: '2023-03-10',
        url: '/mock-documents/certificate-002.pdf'
      }
    ]
  }
};

const mockPayslips: Record<string, Record<string, Payslip[]>> = {
  'user-123': {
    'primary': [
      {
        id: 'pay-001',
        userId: 'user-123',
        instanceId: 'primary',
        type: 'payslip',
        title: 'April 2025 Payslip',
        date: '2025-05-01',
        url: '/mock-documents/payslip-apr-2025.pdf',
        month: 'April',
        year: '2025',
        grossPay: 3500.00,
        netPay: 2650.00
      },
      {
        id: 'pay-002',
        userId: 'user-123',
        instanceId: 'primary',
        type: 'payslip',
        title: 'March 2025 Payslip',
        date: '2025-04-01',
        url: '/mock-documents/payslip-mar-2025.pdf',
        month: 'March',
        year: '2025',
        grossPay: 3500.00,
        netPay: 2650.00
      }
    ],
    'post-primary': [
      {
        id: 'pay-003',
        userId: 'user-123',
        instanceId: 'post-primary',
        type: 'payslip',
        title: 'April 2025 Payslip',
        date: '2025-05-01',
        url: '/mock-documents/payslip-apr-2025-pp.pdf',
        month: 'April',
        year: '2025',
        grossPay: 1200.00,
        netPay: 950.00
      }
    ]
  }
};


class MockHcmService {
  async getPersonalInfo(userId: string, instanceId: string): Promise<PersonalInfo> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!mockPersonalData[userId] || !mockPersonalData[userId][instanceId]) {
      throw new Error(`No personal information found for user ${userId} in instance ${instanceId}`);
    }
    
    return mockPersonalData[userId][instanceId];
  }

  async updatePersonalInfo(userId: string, instanceId: string, data: Partial<PersonalInfo>): Promise<UpdateResult> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (!mockPersonalData[userId] || !mockPersonalData[userId][instanceId]) {
      throw new Error(`No personal information found for user ${userId} in instance ${instanceId}`);
    }
    
    mockPersonalData[userId][instanceId] = {
      ...mockPersonalData[userId][instanceId],
      ...data
    };
    
    return {
      success: true,
      message: 'Personal information updated successfully',
      updatedFields: Object.keys(data)
    };
  }

  async getDocuments(userId: string, instanceId: string, type?: string): Promise<Document[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    if (!mockDocuments[userId] || !mockDocuments[userId][instanceId]) {
      return [];
    }
    
    const documents = mockDocuments[userId][instanceId];
    
    if (type) {
      return documents.filter(doc => doc.type === type);
    }
    
    return documents;
  }

  async getPayslips(userId: string, instanceId: string, timeframe?: TimeFrame): Promise<Payslip[]> {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    if (!mockPayslips[userId] || !mockPayslips[userId][instanceId]) {
      return [];
    }
    
    let payslips = mockPayslips[userId][instanceId];
    
    if (timeframe) {
      const startDate = new Date(timeframe.startDate);
      const endDate = new Date(timeframe.endDate);
      
      payslips = payslips.filter(payslip => {
        const payslipDate = new Date(payslip.date);
        return payslipDate >= startDate && payslipDate <= endDate;
      });
    }
    
    return payslips;
  }
}

export const mockHcmService = new MockHcmService();
