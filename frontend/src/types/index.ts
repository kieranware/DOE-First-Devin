export interface User {
  userId: string;
  name: string;
  email: string;
  instances: string[];
  roles: string[];
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  activeInstance: string | null;
}

export interface PersonalInfo {
  userId: string;
  fullName: string;
  staffId: string;
  schoolAssignment: string;
  contactDetails: ContactDetails;
  emergencyContact: EmergencyContact;
  bankDetails: BankDetails;
  civilStatus: string;
}

export interface ContactDetails {
  email: string;
  phone: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    county: string;
    eircode: string;
  };
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface BankDetails {
  accountName: string;
  iban: string;
  bic: string;
}

export interface Document {
  id: string;
  userId: string;
  instanceId: string;
  type: string;
  title: string;
  date: string;
  url: string;
}

export interface Payslip extends Document {
  month: string;
  year: string;
  grossPay: number;
  netPay: number;
}

export interface TimeFrame {
  startDate: string;
  endDate: string;
}

export interface ApiRequest {
  type: string;
  userId: string;
  data: any;
}

export interface ApiResponse {
  success: boolean;
  data: any;
  error?: string;
}

export interface InstanceAccess {
  instanceId: string;
  instanceName: string;
  hasAccess: boolean;
  isPrimary: boolean;
}

export interface SyncResult {
  success: boolean;
  instancesUpdated: string[];
  conflicts?: Conflict[];
}

export interface Conflict {
  id: string;
  instanceId: string;
  field: string;
  currentValue: any;
  newValue: any;
  resolution?: 'current' | 'new';
}

export interface ResolutionResult {
  success: boolean;
  resolvedConflicts: number;
  failedResolutions?: {
    instanceId: string;
    field: string;
    reason: string;
  }[];
}

export interface AppointmentInfo {
  title: string;
  location: string;
  status: 'Active' | 'Part Time' | 'Inactive';
}

export interface LeaveBalance {
  type: string;
  total: number;
  used: number;
  remaining: number;
}

export interface PriorityTask {
  id: string;
  type: string;
  title: string;
  description: string;
  dueDate?: string;
  status: 'New' | 'Action Needed' | 'In Progress' | 'Completed';
}

export interface UpdateResult {
  success: boolean;
  message: string;
  updatedFields?: string[];
  errors?: Record<string, string>;
}
